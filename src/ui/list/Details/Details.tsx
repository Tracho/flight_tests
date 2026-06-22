import ArrowTop from '@/assets/icons/arrow-top.svg?react'
import './Details.scss'
import { useState } from 'react'

type props = {
  title: string
  description?: string
  arr: string[]
  symbolLi?: string
}

function Details ({ title, arr, description, symbolLi = '' }: props) {
  const [active, setActive] = useState(false)

  return (
    <div className={`details-container ${active ? 'is-active' : ''}`}>
      <button
        className='details-trigger gap-3'
        type='button'
        onClick={() => setActive(prev => !prev)}
      >
        <div className='flex justify-between items-center w-full'>
          <span className='details-title'>{title}</span>
          <ArrowTop className='details-arrow' width={32} />
        </div>
        {description && <p>{description}</p>}
      </button>

      {/* Обертка для плавной анимации высоты */}
      <div className='details-content-wrapper'>
        <ul className='details-list'>
          {arr.map((item, index) => (
            <li key={index} className='details-item'>
              {symbolLi && <span className='details-symbol'>{symbolLi}</span>}
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Details
