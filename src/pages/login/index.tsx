import { AuthForm } from '@/features/auth'
import { Card, Page, Subtitle, Title } from './styles'

export const LoginPage = () => (
  <Page>
    <Card>
      <Title>GREEN-API Telegram</Title>
      <Subtitle>Вход: apiUrl, idInstance, apiTokenInstance</Subtitle>
      <AuthForm />
    </Card>
  </Page>
)
