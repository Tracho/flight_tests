import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

 
function Stats() {
  return <h1>Статистика</h1>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/stats" element={<Stats />} /> 
      
    </Routes>
  )
}