import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Root } from './styles'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

export const Button = ({
  children,
  type = 'button',
  className,
  ...rest
}: Props) => (
  <Root type={type} className={className} {...rest}>
    {children}
  </Root>
)
