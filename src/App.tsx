// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomePageTest from "./pages/HomePageTest";
import Navbar from "./ui/navbar/Navbar";
import QuizPage from "./pages/QuizPage";

function Stats() { return <h1>Статистика</h1>; }

export default function App() { 
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/TestUi" element={<HomePageTest />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </>
  );
}
