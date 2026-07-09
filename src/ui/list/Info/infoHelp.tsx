import SVGHelpInfo from '@/assets/icons/help-info.svg?react'
import { amberBorderDark, amberBorderLight, amberFillDark, amberFillLight, amberTextDark, amberTextLight } from '@/data/desingStyle';
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
          <SVGHelpInfo width={32}   className={`${amberTextLight} ${amberTextDark} ${amberFillLight} ${amberFillDark} min-w-8`}/>
          <h3 className='text-lg'><b>{header}</b></h3>
        </div>
        <div className={`border-l-4 ${amberBorderLight} ${amberBorderDark} pl-4 ml-[14px] text-base`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default InfoHelp
