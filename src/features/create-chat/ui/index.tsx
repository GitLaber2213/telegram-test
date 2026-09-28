import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/app/store'
import {
  createChat,
  setChatAvatar,
  useGetAvatarMutation,
} from '@/features/chat'
import {
  formatChatTitle,
  formatPhoneLabel,
  getErrorMessage,
  normalizePhone,
} from '@/shared'
import { useCheckAccountMutation } from '../api'
import type { CheckAccountArgs } from '../api'
import { Form, PhoneInput, SubmitButton } from './styles'

type FormValues = { contact: string }

const buildCheckArgs = (contact: string): CheckAccountArgs | null => {
  const value = contact.trim()
  if (value.startsWith('@')) return { username: value }

  const digits = normalizePhone(value)
  if (digits.length < 10) return null
  return { phoneNumber: Number(digits) }
}

export const CreateChatForm = () => {
  const dispatch = useAppDispatch()
  const [checkAccount, { isLoading }] = useCheckAccountMutation()
  const [getAvatar] = useGetAvatarMutation()
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { contact: '' },
  })

  const onSubmit = handleSubmit(async ({ contact }) => {
    const args = buildCheckArgs(contact)
    if (!args) {
      alert('Введите номер 79991234567 или @username')
      return
    }

    try {
      const result = await checkAccount(args).unwrap()

      if (result.status === false) {
        alert(result.reason || 'Инстанс не авторизован')
        return
      }

      if (!result.exist || !result.chatId) {
        alert('Аккаунт Telegram не найден')
        return
      }

      const chatId = String(result.chatId)
      const phone = formatPhoneLabel(
        result.phoneNumber ??
          ('phoneNumber' in args ? args.phoneNumber : undefined),
      )

      dispatch(
        createChat({
          id: chatId,
          phone,
          title: formatChatTitle(result.username, phone || chatId),
        }),
      )
      reset()

      void getAvatar({ chatId })
        .unwrap()
        .then((avatar) => {
          const url = avatar.urlAvatar?.trim()
          if (url) dispatch(setChatAvatar({ id: chatId, avatarUrl: url }))
        })
        .catch(() => undefined)
    } catch (error) {
      alert(getErrorMessage(error, 'Не удалось создать чат'))
    }
  })

  return (
    <Form onSubmit={onSubmit} noValidate>
      <PhoneInput
        {...register('contact', { required: true })}
        placeholder="79991234567 или @username"
        autoComplete="off"
        disabled={isLoading}
      />
      <SubmitButton disabled={isLoading}>
        {isLoading ? 'Проверка…' : 'Создать чат'}
      </SubmitButton>
    </Form>
  )
}
