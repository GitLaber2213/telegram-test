import styled from 'styled-components'

export const Page = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.color.bg};
`

export const Card = styled.div`
  display: flex;
  width: 100%;
  max-width: 440px;
  flex-direction: column;
  gap: 12px;
  padding: 32px 28px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.bgPanel};
`

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
`

export const Subtitle = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.textSecondary};
  text-align: center;
`
