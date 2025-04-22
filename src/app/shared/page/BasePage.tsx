import { FC, PropsWithChildren } from 'react'

const BasePage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="p-10 w-full h-full">
      <div>{children}</div>
    </main>
  )
}

export default BasePage
