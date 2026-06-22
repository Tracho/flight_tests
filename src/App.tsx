import DBTest1 from '@/data/Test1.json' with { type: 'json' }
import DBTest2 from '@/data/Test2.json' with { type: 'json' }

import { Routes, Route } from 'react-router-dom'
import HomePageTest from './pages/HomePageTest'
import HomePage from './pages/HomePage'
import Navbar from './ui/navbar/Navbar'
import { useState } from 'react'

function Stats () {
  return <h1>Статистика</h1>
}
 
export default function App () {
  const DB = [
    {
      json:DBTest1,
      title:'Медицинские тесты #1',
      description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sapiente repellat nobis quisquam non illo esse magni fugiat maxime? Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?'
    },
    {
      json:DBTest2,
      title:'Медицинские тесты #2',
      description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sapiente repellat nobis quisquam non illo esse magni fugiat maxime? Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?'
    },
  ]
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/TestUi' element={<HomePageTest></HomePageTest>} />
        <Route path='/' element={<HomePage DB={DB}></HomePage>} />
        <Route path='/stats' element={<Stats />} />
      </Routes>
    </>
  )
}
