import { baseApi } from '@/shared'

export type GetAvatarResponse = {
  urlAvatar?: string
}

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvatar: builder.mutation<GetAvatarResponse, { chatId: string }>({
      query: (body) => ({
        method: 'getAvatar',
        httpMethod: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetAvatarMutation } = chatApi
