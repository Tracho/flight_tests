import SVGcorrect from '@/assets/icons/correct.svg?react'
import type { ReactNode } from 'react'

type props = {
  header:string;
  children:ReactNode;
}
function InfoCorrect ({children,header}:props) {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <SVGcorrect width={32} className='text-green-400 min-w-8'/>
          <h3 className='text-lg'>{header}</h3>
        </div>
        <div className='border-l-4 border-green-400 pl-4 ml-[14px] text-base'>
          {children}
        </div>
      </div>
    </>
  )
}

export default InfoCorrect
