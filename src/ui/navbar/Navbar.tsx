import { NavLink, useNavigate } from "react-router-dom"; // Добавили useNavigate
import { ThemeToggle } from "../button/ThemeToggle";
import { bgdark, bglight, bglightgray, neonLight, neonPurple } from "@/data/desingStyle";
import { useGame } from "@/store/useOpenGameQuiz";
import { memo } from "react";

function Navbar() {
  const navigate = useNavigate(); // Инициализируем навигацию
  const game = useGame();
  
  let LinkActiveClass = `underline drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`;

  const ObjLink = [
    { url: "/TestUi", title: "Test Ui" },
    { url: "/quiz", title: "Тесты" },
    { url: "/stats", title: "Статистика" },
    { url: "/search", title: "Поиск" },
  ];

  // Передаем событие и целевой URL
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault(); // Блокируем стандартное поведение ссылки
    game.setGame({ started: false }); // Сбрасываем стейт игры
    navigate(url); // Плавно переходим на нужную страницу
  };

  return (
    <div className="flex justify-center">
      <div className={`container flex flex-col px-4 py-7 gap-4 ${bglightgray} ${bgdark} rounded-bl-3xl rounded-br-3xl border-b-4 shadow-lg ${neonLight} ${neonPurple}`}>
        <div className="flex justify-center items-center">
          <NavLink to="/" className="text-4xl font-bold uppercase"> FLIGHT TEST </NavLink>
          <ThemeToggle />
        </div>
        <div className="flex justify-center items-center gap-3">
          {ObjLink.map((item) => (
            <NavLink
              key={item.url} // Обязательно добавьте key для списков в React!
              to={item.url}
              className={({ isActive }) => (isActive ? LinkActiveClass : "")}
              onClick={(e) => handleLinkClick(e, item.url)} // Передаем URL
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Navbar);
