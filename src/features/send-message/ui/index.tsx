import { useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { addMessage, selectActiveChatId } from '@/features/chat'
import { getErrorMessage } from '@/shared'
import { useSendMessageMutation } from '../api'
import { Form, SubmitButton, TextInput, Wrap } from './styles'

export const MessageInput = () => {
  const dispatch = useAppDispatch()
  const activeChatId = useAppSelector(selectActiveChatId)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [sendMessage] = useSendMessageMutation()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!activeChatId || sending) return

    const message = text.trim()
    if (!message) return

    setText('')
    setSending(true)

    dispatch(
      addMessage({
        id: `local-${crypto.randomUUID()}`,
        chatId: activeChatId,
        text: message,
        direction: 'outgoing',
      }),
    )

    try {
      await sendMessage({
        chatId: String(activeChatId),
        message,
      }).unwrap()
    } catch (error) {
      alert(getErrorMessage(error, 'Не удалось отправить'))
    } finally {
      setSending(false)
    }
  }

  return (
    <Wrap>
      <Form onSubmit={onSubmit} noValidate>
        <TextInput
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={
            activeChatId ? 'Введите сообщение' : 'Сначала создайте чат'
          }
          autoComplete="off"
          disabled={!activeChatId}
        />
        <SubmitButton type="submit" disabled={!activeChatId || sending}>
          {sending ? '…' : 'Отправить'}
        </SubmitButton>
      </Form>
    </Wrap>
  )
}
