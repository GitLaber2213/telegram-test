import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  selectChats,
  setChatAvatar,
  useGetAvatarMutation,
} from '@/features/chat'
import { useReceiveMessages } from '@/features/receive-message'
import { ChatSidebar } from '@/widgets/chat-sidebar'
import { ChatWindow } from '@/widgets/chat-window'
import { Page } from './styles'

export const ChatPage = () => {
  useReceiveMessages()

  const dispatch = useAppDispatch()
  const chats = useAppSelector(selectChats)
  const [getAvatar] = useGetAvatarMutation()
  const attempted = useRef(new Set<string>())

  useEffect(() => {
    for (const chat of chats) {
      if (chat.avatarUrl || attempted.current.has(chat.id)) continue
      attempted.current.add(chat.id)

      void getAvatar({ chatId: chat.id })
        .unwrap()
        .then((result) => {
          const url = result.urlAvatar?.trim()
          if (url) dispatch(setChatAvatar({ id: chat.id, avatarUrl: url }))
        })
        .catch(() => undefined)
    }
  }, [chats, dispatch, getAvatar])

  return (
    <Page>
      <ChatSidebar />
      <ChatWindow />
    </Page>
  )
}
