import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { addMessage, ensureChat } from '@/features/chat'
import { APP_CONFIG, formatPhoneLabel, phoneFromChatId } from '@/shared'
import { startReceiveLoop } from '../lib/receive-loop'

const getText = (body: {
  typeWebhook: string
  messageData?: {
    typeMessage?: string
    textMessageData?: { textMessage?: string }
    extendedTextMessageData?: { text?: string }
  }
}) => {
  if (body.typeWebhook !== 'incomingMessageReceived') return null
  if (body.messageData?.typeMessage === 'textMessage') {
    return body.messageData.textMessageData?.textMessage?.trim() || null
  }
  if (body.messageData?.typeMessage === 'extendedTextMessage') {
    return body.messageData.extendedTextMessageData?.text?.trim() || null
  }
  return null
}

export const useReceiveMessages = () => {
  const dispatch = useAppDispatch()
  const idInstance = useAppSelector((s) => s.session.credentials?.idInstance)
  const apiTokenInstance = useAppSelector(
    (s) => s.session.credentials?.apiTokenInstance,
  )
  const apiUrl = useAppSelector((s) => s.session.credentials?.apiUrl)

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) return

    return startReceiveLoop({
      credentials: {
        idInstance,
        apiTokenInstance,
        apiUrl: apiUrl || APP_CONFIG.apiBaseUrl,
      },
      onNotification: (notification) => {
        const text = getText(notification.body)
        const chatId = notification.body.senderData?.chatId
        if (!text || !chatId) return

        dispatch(
          ensureChat({
            id: chatId,
            phone: formatPhoneLabel(phoneFromChatId(chatId)),
            title:
              notification.body.senderData?.chatName ||
              notification.body.senderData?.senderName ||
              chatId,
          }),
        )

        dispatch(
          addMessage({
            id: notification.body.idMessage ?? String(notification.receiptId),
            chatId,
            text,
            direction: 'incoming',
            timestamp: notification.body.timestamp
              ? notification.body.timestamp * 1000
              : undefined,
          }),
        )
      },
    })
  }, [idInstance, apiTokenInstance, apiUrl, dispatch])
}
