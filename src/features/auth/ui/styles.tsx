import styled from 'styled-components'
import { Button } from '@/shared'

export const Form = styled.form`
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  gap: 16px;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Label = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.color.textSecondary};
`

export const SubmitButton = styled(Button).attrs({ type: 'submit' })`
  width: 100%;
  margin-top: 8px;
`
