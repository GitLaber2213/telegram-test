import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { APP_CONFIG } from '@/shared/config'
import { formatPhoneLabel } from '@/shared/lib'

export type Message = {
  id: string
  chatId: string
  text: string
  direction: 'incoming' | 'outgoing'
  timestamp: number
}

export type Chat = {
  id: string
  phone: string
  title: string
  avatarUrl?: string
}

type ChatState = {
  chats: Chat[]
  activeChatId: string | null
  messagesByChatId: Record<string, Message[]>
}

const emptyState: ChatState = {
  chats: [],
  activeChatId: null,
  messagesByChatId: {},
}

const chatStorageKey = (idInstance: string) =>
  `${APP_CONFIG.chatsKeyPrefix}:${idInstance}`

const readIdInstance = (): string | null => {
  try {
    const raw = localStorage.getItem(APP_CONFIG.sessionKey)
    if (!raw) return null
    const data = JSON.parse(raw) as { idInstance?: string }
    return data.idInstance || null
  } catch {
    return null
  }
}

const loadChatState = (): ChatState => {
  const idInstance = readIdInstance()
  if (!idInstance) return emptyState

  try {
    const raw = localStorage.getItem(chatStorageKey(idInstance))
    if (!raw) return emptyState
    const data = JSON.parse(raw) as Partial<ChatState>
    const chats = Array.isArray(data.chats)
      ? data.chats.map((chat) => ({
          ...chat,
          id: String(chat.id),
          phone: formatPhoneLabel(chat.phone),
        }))
      : []
    const messagesByChatId: Record<string, Message[]> = {}
    if (data.messagesByChatId && typeof data.messagesByChatId === 'object') {
      for (const [chatId, list] of Object.entries(data.messagesByChatId)) {
        messagesByChatId[String(chatId)] = Array.isArray(list)
          ? list.map((msg) => ({
              ...msg,
              id: String(msg.id),
              chatId: String(msg.chatId),
            }))
          : []
      }
    }
    return {
      chats,
      activeChatId:
        data.activeChatId != null ? String(data.activeChatId) : null,
      messagesByChatId,
    }
  } catch {
    return emptyState
  }
}

export const persistChatState = (state: ChatState, idInstance: string) => {
  localStorage.setItem(chatStorageKey(idInstance), JSON.stringify(state))
}

export const clearPersistedChats = (idInstance: string) => {
  localStorage.removeItem(chatStorageKey(idInstance))
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: loadChatState(),
  reducers: {
    createChat: (state, action: PayloadAction<Chat>) => {
      const chat = { ...action.payload, id: String(action.payload.id) }
      const existing = state.chats.find((item) => item.id === chat.id)
      if (existing) {
        existing.title = chat.title || existing.title
        existing.phone = chat.phone || existing.phone
        if (chat.avatarUrl) existing.avatarUrl = chat.avatarUrl
      } else {
        state.chats.unshift(chat)
      }
      state.activeChatId = chat.id
    },
    ensureChat: (state, action: PayloadAction<Chat>) => {
      const id = String(action.payload.id)
      const existing = state.chats.find((chat) => chat.id === id)
      if (existing) {
        if (!existing.title && action.payload.title) {
          existing.title = action.payload.title
        }
        if (!existing.phone && action.payload.phone) {
          existing.phone = action.payload.phone
        }
        return
      }
      state.chats.unshift({ ...action.payload, id })
    },
    setChatAvatar: (
      state,
      action: PayloadAction<{ id: string; avatarUrl: string }>,
    ) => {
      const chat = state.chats.find(
        (item) => item.id === String(action.payload.id),
      )
      if (chat) chat.avatarUrl = action.payload.avatarUrl
    },
    selectChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = String(action.payload)
    },
    addMessage: (
      state,
      action: PayloadAction<Omit<Message, 'timestamp'> & { timestamp?: number }>,
    ) => {
      const message: Message = {
        ...action.payload,
        id: String(action.payload.id),
        chatId: String(action.payload.chatId),
        timestamp: action.payload.timestamp ?? Date.now(),
      }
      const list = state.messagesByChatId[message.chatId] ?? []
      if (list.some((item) => item.id === message.id)) return
      state.messagesByChatId[message.chatId] = [...list, message]
    },
    clearChats: () => emptyState,
  },
})

export const {
  createChat,
  ensureChat,
  setChatAvatar,
  selectChat,
  addMessage,
  clearChats,
} = chatSlice.actions
export const chatReducer = chatSlice.reducer

export const selectChats = (state: { chat: ChatState }) => state.chat.chats
export const selectActiveChatId = (state: { chat: ChatState }) =>
  state.chat.activeChatId
export const selectActiveChat = (state: { chat: ChatState }) =>
  state.chat.chats.find((chat) => chat.id === state.chat.activeChatId) ?? null
export const selectMessages = (state: { chat: ChatState }) => {
  const id = state.chat.activeChatId
  return id ? (state.chat.messagesByChatId[id] ?? []) : []
}
