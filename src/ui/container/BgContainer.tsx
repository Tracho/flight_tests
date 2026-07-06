import { bgdark, bgdarkNeutral, bglight, bglightgray, borderDark, borderLign, neonLight } from '@/data/desingStyle'
import type { ComponentProps, ReactNode } from 'react'

type props = {
  children: ReactNode
  myClass?: string
  className?: string
} & ComponentProps<'div'>
function BgContainer ({ children, myClass = '', className=`${bglightgray} ${bgdarkNeutral} ${borderLign} ${borderDark}`, ...props }: props) {
  return (
    <>
      <div {...props} className={`${myClass} ${className} p-4 rounded border`}> 
        {children}
      </div>
    </>
  )
}

export default BgContainer
