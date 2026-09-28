import { baseApi } from '@/shared'

export const sendMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      { idMessage: string },
      { chatId: string; message: string }
    >({
      query: (body) => ({
        method: 'sendMessage',
        httpMethod: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSendMessageMutation } = sendMessageApi
