import styled from 'styled-components'

export const Item = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme, $active }) =>
    $active ? theme.color.bgHover : 'transparent'};
  color: ${({ theme }) => theme.color.text};
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.color.bgHover};
  }
`

export const Avatar = styled.span<{ $url?: string }>`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.bgInput};
  background-image: ${({ $url }) => ($url ? `url(${$url})` : 'none')};
  background-size: cover;
  background-position: center;
`

export const Meta = styled.span`
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

export const Phone = styled.span`
  overflow: hidden;
  font-size: 13px;
  color: ${({ theme }) => theme.color.textSecondary};
  text-overflow: ellipsis;
  white-space: nowrap;
`
