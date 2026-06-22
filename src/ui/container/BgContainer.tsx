import type { ComponentProps, ReactNode } from 'react'

type props = {
  children: ReactNode
  myClass?: string
  className?: string
} & ComponentProps<'div'>
function BgContainer ({ children, myClass = '', className='', ...props }: props) {
  return (
    <>
      <div {...props} className={`bg-neutral-900 ${myClass} ${className} p-4 rounded border border-gray-600`}>
        {children}
      </div>
    </>
  )
}

export default BgContainer
