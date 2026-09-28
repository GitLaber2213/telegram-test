import styled from 'styled-components'
import { Button, Input } from '@/shared'

export const Form = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`

export const PhoneInput = styled(Input)`
  flex: 1;
`

export const SubmitButton = styled(Button).attrs({ type: 'submit' })`
  flex-shrink: 0;
`
