import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { sessionReducer } from '@/features/auth/model/session-slice'
import {
  chatReducer,
  persistChatState,
} from '@/features/chat/model/chat-slice'
import { baseApi } from '@/shared/base-api'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    chat: chatReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

let lastPersisted = ''
store.subscribe(() => {
  const state = store.getState()
  const idInstance = state.session.credentials?.idInstance
  if (!idInstance) return

  const payload = JSON.stringify({
    chats: state.chat.chats,
    activeChatId: state.chat.activeChatId,
    messagesByChatId: state.chat.messagesByChatId,
  })
  if (payload === lastPersisted) return
  lastPersisted = payload
  persistChatState(state.chat, idInstance)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
