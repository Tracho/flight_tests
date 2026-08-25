import SVGHelpInfo from '@/assets/icons/help-info.svg?react'
import SVGBookOutline from '@/assets/icons/book-outline.svg?react'
import SVGBookCircle from '@/assets/icons/book-circle.svg?react'
import { amberBorderDark, amberBorderLight,amberBorderBlack,amberBorderWhite, amberFillDark, amberFillLight,amberTextBlack,amberTextWhite, amberTextDark, amberTextLight, amberFillWhite,amberStrokeDark,amberStrokeLight ,amberFillBlack} from '@/data/desingStyle';
import type { ReactNode } from 'react'
type props = {
  header:string;
  children:ReactNode;
}
function QuestionAsked({children,header}:props) {
  return ( <>
   <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <SVGHelpInfo width={32} height={32}  className={`${amberTextBlack} ${amberTextWhite} ${amberFillWhite} ${amberFillBlack}   min-w-8`}/>
          <h3 className='text-lg'><b>{header}</b></h3>
        </div>
        <div className={`border-l-4 ${amberBorderBlack} ${amberBorderWhite} pl-4 ml-[14px] text-base`}>
          {children}
        </div>
      </div>
  </> );
}

export default QuestionAsked;