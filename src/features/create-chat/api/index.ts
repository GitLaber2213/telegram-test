import { baseApi } from '@/shared'

export type CheckAccountResponse = {
  exist: boolean
  chatId: string
  username?: string
  phoneNumber?: number
  fromCache?: boolean
  status?: boolean
  reason?: string
}

export type CheckAccountArgs =
  | { phoneNumber: number; username?: never }
  | { username: string; phoneNumber?: never }

export const createChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAccount: builder.mutation<CheckAccountResponse, CheckAccountArgs>({
      query: (body) => ({
        method: 'checkAccount',
        httpMethod: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCheckAccountMutation } = createChatApi
