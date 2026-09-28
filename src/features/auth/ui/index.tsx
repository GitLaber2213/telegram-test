import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/app/store'
import {
  APP_CONFIG,
  Input,
  getErrorMessage,
  normalizeApiUrl,
  type Credentials,
} from '@/shared'
import { useSetSettingsMutation } from '../api'
import { login } from '../model/session-slice'
import { Field, Form, Label, SubmitButton } from './styles'

type AuthFormValues = {
  idInstance: string
  apiTokenInstance: string
  apiUrl: string
}

export const AuthForm = () => {
  const dispatch = useAppDispatch()
  const [setSettings, { isLoading }] = useSetSettingsMutation()
  const { register, handleSubmit } = useForm<AuthFormValues>({
    defaultValues: {
      idInstance: '',
      apiTokenInstance: '',
      apiUrl: APP_CONFIG.apiBaseUrl,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!values.idInstance.trim() || !values.apiTokenInstance.trim()) {
      alert('Заполните idInstance и apiTokenInstance')
      return
    }

    let apiUrl: string
    try {
      apiUrl = normalizeApiUrl(values.apiUrl)
    } catch (error) {
      alert(getErrorMessage(error, 'Некорректный apiUrl'))
      return
    }

    const credentials: Credentials = {
      idInstance: values.idInstance.trim(),
      apiTokenInstance: values.apiTokenInstance.trim(),
      apiUrl,
    }

    try {
      await setSettings({ credentials }).unwrap()
      dispatch(login(credentials))
    } catch (error) {
      alert(getErrorMessage(error, 'Не удалось войти'))
    }
  })

  return (
    <Form onSubmit={onSubmit} noValidate>
      <Field>
        <Label>apiUrl (из кабинета)</Label>
        <Input
          {...register('apiUrl', { required: true })}
          placeholder="https://XXXX.api.green-api.com"
          autoComplete="off"
          disabled={isLoading}
        />
      </Field>

      <Field>
        <Label>idInstance</Label>
        <Input
          {...register('idInstance', { required: true })}
          placeholder="idInstance"
          autoComplete="off"
          disabled={isLoading}
        />
      </Field>

      <Field>
        <Label>apiTokenInstance</Label>
        <Input
          {...register('apiTokenInstance', { required: true })}
          placeholder="apiTokenInstance"
          autoComplete="off"
          disabled={isLoading}
        />
      </Field>

      <SubmitButton disabled={isLoading}>
        {isLoading ? 'Вход…' : 'Войти'}
      </SubmitButton>
    </Form>
  )
}
