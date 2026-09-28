import styled from 'styled-components'

export const Root = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.accent};
  color: #111;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.color.accentHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
