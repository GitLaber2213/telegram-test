import { APP_CONFIG } from '@/shared/config'

export const normalizePhone = (phone: string): string => {
  let digits = phone.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`
  }
  return digits
}

export const phoneFromChatId = (chatId: string) => chatId.replace(/\D/g, '')

export const formatPhoneLabel = (phone?: string | number | null): string => {
  if (phone == null) return ''
  const digits = String(phone).replace(/\D/g, '')
  if (!digits || digits === '0') return ''
  return digits
}

export const formatChatTitle = (
  username?: string | null,
  fallback?: string | null,
): string => {
  const name = username?.trim()
  if (name) return name.startsWith('@') ? name : `@${name}`
  return fallback?.trim() || ''
}

export const normalizeApiUrl = (value?: string): string => {
  let raw = (value || APP_CONFIG.apiBaseUrl).trim()
  if (!raw) raw = APP_CONFIG.apiBaseUrl
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`

  try {
    return new URL(raw).origin
  } catch {
    throw new Error('Некорректный apiUrl. Скопируй из кабинета GREEN-API')
  }
}

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === 'object' && error && 'data' in error) {
    const data = String((error as { data: unknown }).data)
    if (data) return data
  }
  if (error instanceof Error && error.message) return error.message
  return fallback
}
