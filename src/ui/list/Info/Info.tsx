import SVGinfo from '@/assets/icons/info.svg?react'
import { skyBorderDark, skyBorderLight, skyTextDark, skyTextLight } from '@/data/desingStyle';
import type { ReactNode } from 'react'

type props = {
  header:string;
  children:ReactNode;
}
function Info ({children,header}:props) {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <SVGinfo width={32} className={`${skyTextLight} ${skyTextDark} min-w-8`}/>
          <h3 className='text-lg'><b>{header}</b></h3>
        </div>
        <div className={`border-l-4 ${skyBorderLight} ${skyBorderDark} pl-4 ml-[14px] text-base`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Info
