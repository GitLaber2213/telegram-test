import styled from 'styled-components'

export const Bubble = styled.div<{ $direction: 'incoming' | 'outgoing' }>`
  max-width: 65%;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.lg};
  word-break: break-word;
  align-self: ${({ $direction }) =>
    $direction === 'incoming' ? 'flex-start' : 'flex-end'};
  background: ${({ theme, $direction }) =>
    $direction === 'incoming'
      ? theme.color.bgIncoming
      : theme.color.bgOutgoing};
  ${({ $direction }) =>
    $direction === 'incoming'
      ? 'border-bottom-left-radius: 4px;'
      : 'border-bottom-right-radius: 4px;'}
`

export const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ theme }) => theme.color.text};
`
