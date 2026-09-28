import { Bubble, Text } from './styles'

type Props = {
  text?: string
  direction?: 'incoming' | 'outgoing'
}

export const MessageBubble = ({ text = '', direction = 'outgoing' }: Props) => (
  <Bubble $direction={direction}>
    <Text>{text}</Text>
  </Bubble>
)
