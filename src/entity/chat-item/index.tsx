import { Avatar, Item, Meta, Phone, Title } from './styles'

type Props = {
  title?: string
  phone?: string
  avatarUrl?: string
  active?: boolean
  onClick?: () => void
}

export const ChatListItem = ({
  title = '',
  phone = '',
  avatarUrl,
  active = false,
  onClick,
}: Props) => (
  <Item type="button" $active={active} onClick={onClick}>
    <Avatar aria-hidden $url={avatarUrl} />
    <Meta>
      <Title>{title || phone}</Title>
      {phone ? <Phone>{phone}</Phone> : null}
    </Meta>
  </Item>
)
