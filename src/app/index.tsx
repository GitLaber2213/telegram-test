import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ChatPage, LoginPage } from '@/pages'
import { GlobalStyles, theme } from '@/shared'
import { store, useAppSelector } from './store'

const Router = () => {
  const credentials = useAppSelector((state) => state.session.credentials)
  return credentials ? <ChatPage /> : <LoginPage />
}

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  </Provider>
)
