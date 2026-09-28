import styled from 'styled-components'

export const Window = styled.section`
  display: flex;
  min-width: 0;
  height: 100%;
  flex: 1;
  flex-direction: column;
  background: ${({ theme }) => theme.color.bgChat};
`

export const Empty = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.textSecondary};
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: ${({ theme }) => theme.size.headerHeight};
  padding: 0 16px;
  background: ${({ theme }) => theme.color.bgPanel};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`

export const Avatar = styled.div<{ $url?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.bgInput};
  background-image: ${({ $url }) => ($url ? `url(${$url})` : 'none')};
  background-size: cover;
  background-position: center;
`

export const Meta = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
`

export const Title = styled.span`
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Subtitle = styled.span`
  overflow: hidden;
  font-size: 13px;
  color: ${({ theme }) => theme.color.textSecondary};
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Messages = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  overflow-y: auto;
`
