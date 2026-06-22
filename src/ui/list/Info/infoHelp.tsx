import SVGHelpInfo from '@/assets/icons/help-info.svg?react'
import type { ReactNode } from 'react'
type props = {
  header:string;
  children:ReactNode;
}
function InfoHelp ({children,header}:props) {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <SVGHelpInfo width={32} fill='#f59e0b' className='text-amber-500 min-w-8'/>
          <h3 className='text-lg'>{header}</h3>
        </div>
        <div className='border-l-4 border-amber-500 pl-4 ml-[14px] text-base'>
          {children}
        </div>
      </div>
    </>
  )
}

export default InfoHelp
