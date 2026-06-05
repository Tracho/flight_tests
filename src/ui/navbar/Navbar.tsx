import { NavLink } from 'react-router-dom'

function Navbar () {
  let LinkActiveClass = `underline  drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`
  return (
    <div className='flex justify-center'>
      <div className='container flex flex-col px-4 py-7 gap-4 bg-neutral-900 rounded-bl-3xl rounded-br-3xl border-b-4 border-violet-800 shadow-lg shadow-violet-500/30'>
        <div className='flex justify-center items-center'>
          <NavLink to='/' className='text-4xl font-bold uppercase'>
            FLIGHT TEST
          </NavLink>
        </div>

        <div className='flex justify-center items-center gap-3'>
          <NavLink
            to='/tests'
            className={({ isActive }) => (isActive ? LinkActiveClass : '')}
          >
            Тесты
          </NavLink>

          <NavLink
            to='/stats'
            className={({ isActive }) => (isActive ? LinkActiveClass : '')}
          >
            Статистика
          </NavLink>

          <NavLink
            to='/search'
            className={({ isActive }) => (isActive ? LinkActiveClass : '')}
          >
            Поиск
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
