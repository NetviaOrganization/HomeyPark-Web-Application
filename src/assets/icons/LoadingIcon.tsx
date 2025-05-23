import { FC } from 'react'
import { IconProps } from './types'

const LoadingIcon: FC<IconProps> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M2 8a6 6 0 1 1 6 6a.5.5 0 0 0 0 1a7 7 0 1 0-7-7a.5.5 0 0 0 1 0"
      />
    </svg>
  )
}

export default LoadingIcon
