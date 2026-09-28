import styled from 'styled-components'
import { Button } from '@/shared'

export const Sidebar = styled.aside`
  display: flex;
  width: ${({ theme }) => theme.size.sidebarWidth};
  min-width: ${({ theme }) => theme.size.sidebarWidth};
  height: 100%;
  flex-direction: column;
  background: ${({ theme }) => theme.color.bgPanel};
  border-right: 1px solid ${({ theme }) => theme.color.border};
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: ${({ theme }) => theme.size.headerHeight};
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`

export const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`

export const LogoutButton = styled(Button)`
  min-height: 32px;
  padding: 0 12px;
  font-size: 13px;
`

export const List = styled.div`
  flex: 1;
  overflow-y: auto;
`
