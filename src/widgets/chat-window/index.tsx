import { useEffect, useRef } from 'react'
import { useAppSelector } from '@/app/store'
import { MessageBubble } from '@/entity/message'
import {
  selectActiveChat,
  selectActiveChatId,
  selectMessages,
} from '@/features/chat'
import { MessageInput } from '@/features/send-message'
import {
  Avatar,
  Empty,
  Header,
  Messages,
  Meta,
  Subtitle,
  Title,
  Window,
} from './styles'

export const ChatWindow = () => {
  const activeChat = useAppSelector(selectActiveChat)
  const activeChatId = useAppSelector(selectActiveChatId)
  const messages = useAppSelector(selectMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, activeChatId])

  if (!activeChat) {
    return (
      <Window>
        <Empty>Выберите или создайте чат</Empty>
      </Window>
    )
  }

  return (
    <Window>
      <Header>
        <Avatar aria-hidden $url={activeChat.avatarUrl} />
        <Meta>
          <Title>{activeChat.title}</Title>
          {activeChat.phone ? <Subtitle>{activeChat.phone}</Subtitle> : null}
        </Meta>
      </Header>

      <Messages>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            text={message.text}
            direction={message.direction}
          />
        ))}
        <div ref={bottomRef} />
      </Messages>

      <MessageInput />
    </Window>
  )
}
