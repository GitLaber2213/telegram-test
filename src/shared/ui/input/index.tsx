import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Root } from './styles'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <Root ref={ref} {...props} />
))
