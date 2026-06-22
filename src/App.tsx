import DBTest1 from "@/data/Test1.json" with { type: "json" };
import DBTest2 from "@/data/Test2.json" with { type: "json" };

import { Routes, Route } from "react-router-dom";
import HomePageTest from "./pages/HomePageTest";
import HomePage from "./pages/HomePage";
import Navbar from "./ui/navbar/Navbar";
// import { useState } from "react";

function Stats() {
  return <h1>Статистика</h1>;
}

export default function App() {
  // const [data, setData] = useState([
  //   {
  //     category: "Медицина",
  //     description: "Категория Медицинских тестов",
  //     arr: [
  //       {
  //         json: DBTest1,
  //         storage_q_passed: [2,5,6,1,8],
  //         storage_q_not_passed: [1,4,22,9,20,21],
  //         storage_q_saved: [1,2,4,7,95],
  //         title: "Медицинские тесты #1",
  //         description:
  //           "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sapiente repellat nobis quisquam non illo esse magni fugiat maxime? Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?",
  //       },
  //       {
  //         json: DBTest2,
  //         storage_q_passed: [],
  //         storage_q_not_passed: [],
  //         storage_q_saved: [],
  //         title: "Медицинские тесты #2",
  //         description:
  //           "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sapiente repellat nobis quisquam non illo esse magni fugiat maxime? Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?",
  //       },
  //     ],
  //   },
  // ]);
  const data = [
    {
      category: "Медицина",
      description: "Категория Медицинских тестов",
      arr: [
        {
          json: DBTest1,
          storage_q_passed: [2,5,6,1,8],
          storage_q_not_passed: [1,4,22,9,20,21],
          storage_q_saved: [1,2,4,7,95],
          title: "Медицинские тесты #1",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sapiente repellat nobis quisquam non illo esse magni fugiat maxime? Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?",
        },
        {
          json: DBTest2,
          storage_q_passed: [],
          storage_q_not_passed: [],
          storage_q_saved: [],
          title: "Медицинские тесты #2",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sapiente repellat nobis quisquam non illo esse magni fugiat maxime? Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?",
        },
      ],
    },
  ]
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/TestUi" element={<HomePageTest></HomePageTest>} />
        <Route path="/" element={<HomePage data={data}></HomePage>} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  );
}
