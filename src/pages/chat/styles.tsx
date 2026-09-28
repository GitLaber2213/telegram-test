import styled from 'styled-components'

export const Page = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100svh;
  overflow: hidden;
  background: ${({ theme }) => theme.color.bg};
`
