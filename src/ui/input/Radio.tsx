import { bgdark, bgdarkNeutral, bglightgray, bglightgray460, bglightgray70 } from '@/data/desingStyle'
import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type ColorStyle = 'green' | 'cyan' | 'danger' | 'warning' | 'blue'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  mstyle?: ColorStyle
  labelClassName?: string
  radioClassName?: string
  children?: ReactNode
  isCorrect?: boolean // ОДИН аргумент: true = зелёный, false = красный, не передан = нейтральный
}

export function Radio ({
  mstyle = 'green',
  labelClassName = `${bglightgray70} ${bgdarkNeutral}`,
  radioClassName = '',
  children,
  id,
  disabled,
  isCorrect, // Извлекаем из пропсов
  ...props
}: Props) {
  const generatedId = id || useId()

 
// Рассчитываем нижний бордер и нижнюю мягкую тень на основе одного аргумента isCorrect
let validationBorder = 'border-b-2 border-transparent transition-all duration-200' 
if (isCorrect === true) { 
  validationBorder = 'border-b-2 border-green-500 shadow-[0_4px_12px_-4px_rgba(34,197,94,0.5)]'
} else if (isCorrect === false) {
  validationBorder = 'border-b-2 border-red-500 shadow-[0_4px_12px_-4px_rgba(239,68,68,0.5)]'
}


  // Контейнер с увеличенной зоной клика
  const wrapperClass = `flex items-center gap-3 py-1.5 px-1.5 rounded transition-all duration-200 ${validationBorder} ${
    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  } ${labelClassName}`

  const inputClass = 'sr-only peer'

  const circleBase =
    'w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 bg-white'

  // Круговые тени-нимбы [0_0_8px_0_...] вокруг объекта
  const circleStyles: Record<ColorStyle, string> = {
    green:
      'border-slate-300 peer-checked:border-2 peer-checked:border-green-600 peer-checked:shadow-[0_0_8px_0_theme(colors.green.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-green-500/100 peer-checked:[&>div]:scale-100',

    cyan: 'border-slate-300 peer-checked:border-2 peer-checked:border-cyan-500 peer-checked:shadow-[0_0_8px_0_theme(colors.cyan.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500/100 peer-checked:[&>div]:scale-100',

    danger:
      'border-slate-300 peer-checked:border-2 peer-checked:border-red-600 peer-checked:shadow-[0_0_8px_0_theme(colors.red.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-red-500/100 peer-checked:[&>div]:scale-100',

    warning:
      'border-slate-300 peer-checked:border-2 peer-checked:border-amber-500 peer-checked:shadow-[0_0_8px_0_theme(colors.amber.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500/100 peer-checked:[&>div]:scale-100',

    blue: 'border-slate-300 peer-checked:border-2 peer-checked:border-blue-600 peer-checked:shadow-[0_0_8px_0_theme(colors.blue.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/100 peer-checked:[&>div]:scale-100'
  }

  const dotStyles: Record<ColorStyle, string> = {
    green: 'bg-green-600',
    cyan: 'bg-cyan-500',
    danger: 'bg-red-600',
    warning: 'bg-amber-500',
    blue: 'bg-blue-600'
  }

  const dotBase =
    'w-2 h-2 rounded-full scale-0 transition-transform duration-200 shrink-0'

    
  const computedCircleClass = `${circleBase} ${circleStyles[mstyle]} ${radioClassName}`
  const computedDotClass = `${dotBase} ${dotStyles[mstyle]}`

  return (
    <label htmlFor={generatedId} className={wrapperClass}>
      <input
        type='radio'
        id={generatedId}
        className={inputClass}
        disabled={disabled}
        {...props}
      />
      <div className={computedCircleClass}>
        <div className={computedDotClass}></div>
      </div>
      {children && (
        <span className='font-medium leading-none contents'>
          {children}
        </span>
      )}
    </label>
  )
}

export default Radio
