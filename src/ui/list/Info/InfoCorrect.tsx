import SVGcorrect from '@/assets/icons/correct.svg?react'
import { greenBorderDark, greenBorderLight, greenTextDark, greenTextLight } from '@/data/desingStyle';
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
          <SVGcorrect width={32} className={`${greenTextLight} ${greenTextDark} min-w-8`}/>
          <h3 className='text-lg'>{header}</h3>
        </div>
        <div className={`border-l-4 ${greenBorderLight} ${greenBorderDark} pl-4 ml-[14px] text-base`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default InfoCorrect
