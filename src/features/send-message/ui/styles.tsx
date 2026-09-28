import styled from 'styled-components'
import { Button, Input } from '@/shared'

export const Wrap = styled.div`
  background: ${({ theme }) => theme.color.bgPanel};
  border-top: 1px solid ${({ theme }) => theme.color.border};
`

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: ${({ theme }) => theme.size.headerHeight};
  padding: 10px 16px;
`

export const TextInput = styled(Input)`
  flex: 1;
  border-radius: 24px;
`

export const SubmitButton = styled(Button).attrs({ type: 'submit' })`
  flex-shrink: 0;
  border-radius: 24px;
`
