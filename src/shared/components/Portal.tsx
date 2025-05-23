import React from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  container?: HTMLElement
}

const Portal: React.FC<PortalProps> = ({ children, container = document.body }) => {
  return ReactDOM.createPortal(children, container)
}

export default Portal
