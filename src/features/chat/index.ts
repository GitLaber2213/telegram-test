export {
  createChat,
  ensureChat,
  setChatAvatar,
  selectChat,
  addMessage,
  clearChats,
  clearPersistedChats,
  persistChatState,
  selectChats,
  selectActiveChatId,
  selectActiveChat,
  selectMessages,
} from './model/chat-slice'
export type { Chat, Message } from './model/chat-slice'
export { useGetAvatarMutation } from './api'
