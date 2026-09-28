import styled from 'styled-components'

export const Root = styled.input`
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.bgInput};
  color: ${({ theme }) => theme.color.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.accent};
  }
`
