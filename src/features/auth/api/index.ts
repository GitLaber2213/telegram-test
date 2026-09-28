import { baseApi, type Credentials } from '@/shared'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setSettings: builder.mutation<
      { saveSettings: boolean },
      { credentials: Credentials }
    >({
      query: ({ credentials }) => ({
        method: 'setSettings',
        httpMethod: 'POST',
        credentials,
        body: {
          webhookUrl: '',
          incomingWebhook: 'yes',
          outgoingWebhook: 'yes',
          stateWebhook: 'yes',
        },
      }),
    }),
  }),
})

export const { useSetSettingsMutation } = authApi
