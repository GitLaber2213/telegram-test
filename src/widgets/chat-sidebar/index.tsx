import { useAppDispatch, useAppSelector } from '@/app/store'
import { ChatListItem } from '@/entity/chat-item'
import { logout } from '@/features/auth'
import {
  clearChats,
  clearPersistedChats,
  selectActiveChatId,
  selectChats,
  selectChat,
} from '@/features/chat'
import { CreateChatForm } from '@/features/create-chat'
import { baseApi } from '@/shared'
import { Header, List, LogoutButton, Sidebar, Title } from './styles'

export const ChatSidebar = () => {
  const dispatch = useAppDispatch()
  const chats = useAppSelector(selectChats)
  const activeChatId = useAppSelector(selectActiveChatId)
  const idInstance = useAppSelector((s) => s.session.credentials?.idInstance)

  const handleLogout = () => {
    if (idInstance) clearPersistedChats(idInstance)
    dispatch(clearChats())
    dispatch(baseApi.util.resetApiState())
    dispatch(logout())
  }

  return (
    <Sidebar>
      <Header>
        <Title>Чаты</Title>
        <LogoutButton type="button" onClick={handleLogout}>
          Выйти
        </LogoutButton>
      </Header>

      <CreateChatForm />

      <List>
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            title={chat.title}
            phone={chat.phone}
            avatarUrl={chat.avatarUrl}
            active={chat.id === activeChatId}
            onClick={() => dispatch(selectChat(chat.id))}
          />
        ))}
      </List>
    </Sidebar>
  )
}
