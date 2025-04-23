import React, { FC, PropsWithChildren } from 'react'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const Title: FC<PropsWithChildren<Props>> = ({
  level = 'h1',
  className = '',
  children,
}) => {
  const headingClassName = {
    h1: 'text-3xl',
    h2: 'text-2xl',
    h3: 'text-xl',
    h4: 'text-lg',
    h5: 'text-sm',
    h6: 'text-xs',
  }

  return React.createElement(
    level,
    {
      className: `font-semibold text-gray-700 ${headingClassName[level]} ${className}`,
    },
    children
  )
}

interface Props {
  level?: HeadingLevel
  className?: string
}

export default Title
