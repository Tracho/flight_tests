// 1. Добавляем хук useId из библиотеки react
import { useId  } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type ColorStyle = 'green' | 'greenOutline' | 'cyan' | 'danger' | 'warning' | 'light' | 'yellow' | 'info' | 'blue'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  inpStyle?: ColorStyle
  btnStyle?: ColorStyle
  inpClassName?: string
  btnClassName?: string
  children: ReactNode 
  value:string;
  onChange:(value:string) => void;
  onSubmit: () => void;
}

function InputEnter({
  inpStyle = 'light',
  inpClassName = '',
  btnStyle = 'light',
  btnClassName = '',
  children,
  type = 'text',
  placeholder = 'text...',
  id, // Извлекаем id и name из пропсов, чтобы не дублировать их в ...props
  name, 
  value="",
  onChange,
  onSubmit,
  ...props
}: Props) {
  
  // 2. Генерируем уникальный ID для инпута. 
  // Если id передан снаружи, используем его, иначе — автогенерация.
  const generatedId = id || useId()
  // Если имя не передано, используем сгенерированный ID в качестве имени
  const generatedName = name || generatedId

  const inpBase = 'w-ful px-3 py-2 rounded-l border border-r-0 outline-none transition-all duration-300 peer'
  
  const inpStyles: Record<ColorStyle, string> = {
    green: 'border-green-600 focus:border-green-500 focus:shadow-lg focus:shadow-green-500/10',
    greenOutline: 'border-green-600 bg-transparent focus:border-green-500 focus:shadow-lg focus:shadow-green-500/10',
    cyan: 'border-cyan-600 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-600/10',
    danger: 'border-red-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-600/10',
    warning: 'border-amber-600 focus:border-amber-500 focus:shadow-lg focus:shadow-amber-600/10',
    light: 'border-slate-300 focus:border-slate-300 focus:shadow-lg focus:shadow-slate-300/10',
    yellow: 'border-yellow-500 focus:border-yellow-400 focus:shadow-lg focus:shadow-yellow-500/10',
    info: 'border-sky-500 focus:border-sky-400 focus:shadow-lg focus:shadow-sky-500/10',
    blue: 'border-blue-600 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-600/10',
  }

  const btnBase = 'px-4 py-2 font-medium transition-all duration-300 border rounded-r'
  
  const btnStyles: Record<ColorStyle, string> = {
    green: 'bg-green-600 border-green-600 hover:bg-green-700 peer-focus:border-green-500 peer-focus:shadow-lg peer-focus:shadow-green-500/10',
    greenOutline: 'bg-transparent border-green-600 text-green-600 hover:bg-green-500 peer-focus:border-green-500 peer-focus:shadow-lg peer-focus:shadow-green-500/10',
    cyan: 'bg-cyan-500 border-cyan-500 hover:bg-cyan-600 peer-focus:border-cyan-400 peer-focus:shadow-lg peer-focus:shadow-cyan-600/10',
    danger: 'bg-red-600 border-red-600 hover:bg-red-700 peer-focus:border-red-500 peer-focus:shadow-lg peer-focus:shadow-red-600/10',
    warning: 'bg-amber-500 border-amber-500 hover:bg-amber-600 font-bold peer-focus:border-amber-400 peer-focus:shadow-lg peer-focus:shadow-amber-600/10',
    light: 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-800 peer-focus:border-slate-400 peer-focus:shadow-lg peer-focus:shadow-slate-300/10',
    yellow: 'bg-yellow-400 border-yellow-400 font-bold hover:bg-yellow-500 peer-focus:border-yellow-300 peer-focus:shadow-lg peer-focus:shadow-yellow-500/10',
    info: 'bg-sky-500 border-sky-500 hover:bg-sky-600 peer-focus:border-sky-400 peer-focus:shadow-lg peer-focus:shadow-sky-500/10',
    blue: 'bg-blue-600 border-blue-600 hover:bg-blue-700 peer-focus:border-blue-500 peer-focus:shadow-lg peer-focus:shadow-blue-600/10',
  }

  const computedInpClass = `${inpBase} ${inpStyles[inpStyle]} ${inpClassName}`
  const computedBtnClass = `${btnBase} ${btnStyles[btnStyle]} ${btnClassName}`
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Предотвращаем отправку дефолтных HTML-форм, если они есть
      onSubmit?.();       // Вызываем функцию поиска
    }
  };
 
  return (
    <div className='flex items-stretch gap-0'>
      <div className="w-full max-w-full sm:max-w-xs" dir="ltr"> 
        <input
          id={generatedId}
          name={generatedName}
          className={computedInpClass}
          type={type}
          placeholder={placeholder}
          {...props}
          value={value}
          onChange={(e) => onChange?.(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className='flex' dir='rtl'>
        <button
          type='button'
          className={computedBtnClass} 
          onClick={onSubmit}
        >
          {children}
        </button>
      </div>
    </div>
  )
}

export default InputEnter
