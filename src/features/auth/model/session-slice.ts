import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { APP_CONFIG } from '@/shared/config'
import { normalizeApiUrl } from '@/shared/lib'
import type { Credentials } from '@/shared/base-api'

type SessionState = {
  credentials: Credentials | null
}

const normalizeCredentials = (
  data: Partial<Credentials>,
): Credentials | null => {
  if (!data.idInstance || !data.apiTokenInstance) return null

  try {
    return {
      idInstance: data.idInstance.trim(),
      apiTokenInstance: data.apiTokenInstance.trim(),
      apiUrl: normalizeApiUrl(data.apiUrl || APP_CONFIG.apiBaseUrl),
    }
  } catch {
    return null
  }
}

const loadSession = (): Credentials | null => {
  try {
    const raw = localStorage.getItem(APP_CONFIG.sessionKey)
    if (!raw) return null
    return normalizeCredentials(JSON.parse(raw) as Credentials)
  } catch {
    return null
  }
}

const sessionSlice = createSlice({
  name: 'session',
  initialState: { credentials: loadSession() } as SessionState,
  reducers: {
    login: (state, action: PayloadAction<Credentials>) => {
      const credentials = normalizeCredentials(action.payload)
      if (!credentials) return
      localStorage.setItem(APP_CONFIG.sessionKey, JSON.stringify(credentials))
      state.credentials = credentials
    },
    logout: (state) => {
      localStorage.removeItem(APP_CONFIG.sessionKey)
      state.credentials = null
    },
  },
})

export const { login, logout } = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
