import { bgdark, bgdarkNeutral, bglight, bglightgray, borderDark, borderLign, neonLight } from '@/data/desingStyle'
import type { ComponentProps, ReactNode } from 'react'

type props = {
  children: ReactNode
  myClass?: string
  className?: string
} & ComponentProps<'div'>
function BgContainer ({ children, myClass = '', className='', ...props }: props) {
  return (
    <>
      <div {...props} className={`${bglightgray} ${bgdarkNeutral} ${myClass} ${className} p-4 rounded border ${borderLign} ${borderDark}`}> 
        {children}
      </div>
    </>
  )
}

export default BgContainer
