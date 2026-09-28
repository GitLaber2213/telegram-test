import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { APP_CONFIG } from '@/shared/config'

export type Credentials = {
  idInstance: string
  apiTokenInstance: string
  apiUrl: string
}

type Args = {
  method: string
  httpMethod?: 'GET' | 'POST' | 'DELETE'
  body?: unknown
  suffix?: string
  params?: Record<string, string | number>
  credentials?: Credentials
}

type ApiError = { status: number; data: unknown }

type State = {
  session: { credentials: Credentials | null }
}

const parseBody = (text: string) => {
  if (!text.trim()) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const baseQuery: BaseQueryFn<Args, unknown, ApiError> = async (args, api) => {
  const state = api.getState() as State
  const credentials = args.credentials ?? state.session.credentials

  if (!credentials) {
    return { error: { status: 401, data: 'Нет авторизации' } }
  }

  const root = (credentials.apiUrl || APP_CONFIG.apiBaseUrl).replace(/\/$/, '')

  let url: string
  try {
    url = new URL(
      `/waInstance${credentials.idInstance}/${args.method}/${credentials.apiTokenInstance}${args.suffix ?? ''}`,
      `${root}/`,
    ).toString()
  } catch {
    return {
      error: {
        status: 400,
        data: 'Некорректный apiUrl. Скопируй из кабинета GREEN-API',
      },
    }
  }

  if (args.params) {
    const qs = new URLSearchParams()
    Object.entries(args.params).forEach(([k, v]) => qs.set(k, String(v)))
    url += `?${qs}`
  }

  try {
    const response = await fetch(url, {
      method: args.httpMethod ?? 'GET',
      signal: args.httpMethod === 'GET' ? api.signal : undefined,
      headers: args.body ? { 'Content-Type': 'application/json' } : undefined,
      body: args.body ? JSON.stringify(args.body) : undefined,
    })

    const data = parseBody(await response.text())

    if (!response.ok) {
      return {
        error: {
          status: response.status,
          data:
            typeof data === 'string'
              ? data
              : (data as { message?: string } | null)?.message ??
                `HTTP ${response.status}`,
        },
      }
    }

    return { data }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }

    const message = error instanceof Error ? error.message : 'Network error'
    return {
      error: {
        status: 500,
        data:
          message.includes('Failed to fetch') || message.includes('NetworkError')
            ? `Сеть/DNS: не резолвится apiUrl (${root})`
            : message,
      },
    }
  }
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
})
