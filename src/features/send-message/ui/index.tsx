import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { addMessage, selectActiveChatId } from '@/features/chat'
import { getErrorMessage } from '@/shared'
import { useSendMessageMutation } from '../api'
import { Form, SubmitButton, TextInput, Wrap } from './styles'

type FormValues = { message: string }

export const MessageInput = () => {
  const dispatch = useAppDispatch()
  const activeChatId = useAppSelector(selectActiveChatId)
  const [sendMessage, { isLoading }] = useSendMessageMutation()
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { message: '' },
  })

  const onSubmit = handleSubmit(async ({ message }) => {
    if (!activeChatId || isLoading) return
    const text = message.trim()
    if (!text) return

    reset({ message: '' })
    dispatch(
      addMessage({
        id: `local-${crypto.randomUUID()}`,
        chatId: activeChatId,
        text,
        direction: 'outgoing',
      }),
    )

    try {
      await sendMessage({
        chatId: String(activeChatId),
        message: text,
      }).unwrap()
    } catch (error) {
      alert(getErrorMessage(error, 'Не удалось отправить'))
    }
  })

  return (
    <Wrap>
      <Form onSubmit={onSubmit} noValidate>
        <TextInput
          {...register('message', { required: true })}
          placeholder={
            activeChatId ? 'Введите сообщение' : 'Сначала создайте чат'
          }
          autoComplete="off"
          disabled={!activeChatId || isLoading}
        />
        <SubmitButton type="submit" disabled={!activeChatId || isLoading}>
          Отправить
        </SubmitButton>
      </Form>
    </Wrap>
  )
}
