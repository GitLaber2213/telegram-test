import { APP_CONFIG, getErrorMessage, type Credentials } from '@/shared'

export type Notification = {
  receiptId: number
  body: {
    typeWebhook: string
    timestamp?: number
    idMessage?: string
    senderData?: {
      chatId?: string
      chatName?: string
      senderName?: string
    }
    messageData?: {
      typeMessage?: string
      textMessageData?: { textMessage?: string }
      extendedTextMessageData?: { text?: string }
    }
  }
}

const buildUrl = (
  credentials: Credentials,
  method: string,
  suffix = '',
  params?: Record<string, string | number>,
) => {
  const root = (credentials.apiUrl || APP_CONFIG.apiBaseUrl).replace(/\/$/, '')
  const url = new URL(
    `/waInstance${credentials.idInstance}/${method}/${credentials.apiTokenInstance}${suffix}`,
    `${root}/`,
  )

  if (params) {
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.set(k, String(v)),
    )
  }

  return url.toString()
}

const parseJson = async (response: Response) => {
  const text = await response.text()
  if (!text.trim()) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

const fetchReceiveNotification = async (
  credentials: Credentials,
  signal: AbortSignal,
): Promise<Notification | null> => {
  const response = await fetch(
    buildUrl(credentials, 'receiveNotification', '', {
      receiveTimeout: APP_CONFIG.receiveTimeout,
    }),
    { method: 'GET', signal },
  )

  if (!response.ok) {
    throw new Error(`receiveNotification HTTP ${response.status}`)
  }

  return (await parseJson(response)) as Notification | null
}

const fetchDeleteNotification = async (
  credentials: Credentials,
  receiptId: number,
  signal: AbortSignal,
) => {
  const response = await fetch(
    buildUrl(credentials, 'deleteNotification', `/${receiptId}`),
    { method: 'DELETE', signal },
  )

  if (!response.ok) {
    throw new Error(`deleteNotification HTTP ${response.status}`)
  }
}

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    if (signal.aborted || ms <= 0) {
      resolve()
      return
    }

    const timer = setTimeout(resolve, ms)
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timer)
        resolve()
      },
      { once: true },
    )
  })

type LoopHandlers = {
  credentials: Credentials
  onNotification: (notification: Notification) => void | Promise<void>
}

let activeController: AbortController | null = null

export const startReceiveLoop = ({
  credentials,
  onNotification,
}: LoopHandlers) => {
  activeController?.abort()

  const controller = new AbortController()
  activeController = controller
  const { signal } = controller
  const timeoutMs = APP_CONFIG.receiveTimeout * 1000
  let alerted = false

  const run = async () => {
    while (!signal.aborted) {
      const startedAt = Date.now()

      try {
        const notification = await fetchReceiveNotification(credentials, signal)
        if (signal.aborted) break
        alerted = false

        if (notification) {
          await onNotification(notification)
          if (signal.aborted) break
          await fetchDeleteNotification(
            credentials,
            notification.receiptId,
            signal,
          )
          continue
        }

        const remain = timeoutMs - (Date.now() - startedAt)
        await wait(remain, signal)
      } catch (error) {
        if (signal.aborted) break
        if (!alerted) {
          alerted = true
          alert(getErrorMessage(error, 'Ошибка приёма сообщений'))
        }
        await wait(Math.max(timeoutMs, 10_000), signal)
      }
    }

    if (activeController === controller) {
      activeController = null
    }
  }

  void run()

  return () => {
    controller.abort()
    if (activeController === controller) {
      activeController = null
    }
  }
}
