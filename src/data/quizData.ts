// Импорты ваших JSON данных
import DBTest1 from "@/data/testing/Test1.json" with { type: "json" };
import DBTest2 from "@/data/testing/Test2.json" with { type: "json" };
import DBTesting from "@/data/testing/Testing.json" with { type: "json" };
import DBRuToEngTest1 from "@/data/Eng/RuToEngTest1.json" with { type: "json" };
import DBEngToRuTest1 from "@/data/Eng/EngToRuTest1.json" with { type: "json" };

import type { QuizCategory } from "@/types/quiz";
 
export const quizData: QuizCategory[] = [
  {
    category: "Медицина",
    description: "Категория Медицинских тестов",
    visible: true,
    selected: false,
    arr: [
      {
        visible: true,
        selected: false,
        json: DBTest1,
        storage_q_passed: [2, 5, 6, 1, 8],
        storage_q_not_passed: [1, 4, 22, 9, 20, 21],
        storage_q_saved: [1, 2, 4, 7, 95],
        title: "Медицинские тесты #1",
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sapiente repellat nobis quisquam non illo esse magni fugiat maxime? Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?",
      },
      {
        visible: true,
        selected: false,
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
  {
    category: "Testing",
    description: "Dev Testing",
    visible: true,
    selected: false,
    arr: [
      {
        visible: true,
        selected: false,
        json: DBTesting,
        storage_q_passed: [0, 2],
        storage_q_not_passed: [1,1,1, 3],
        storage_q_saved: [0, 1, 2, 3],
        title: "My Data base Dev Testing",
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?",
      },
    ],
  },
  {
    category: "Английский",
    description: "Категория Английских тестов",
    visible: true,
    selected: false,
    arr: [
      {
        visible: true,
        selected: false,
        json: DBRuToEngTest1,
        storage_q_passed: [2, 5, 6, 1, 8],
        storage_q_not_passed: [1, 4, 22, 9, 20, 21],
        storage_q_saved: [1, 2, 4, 7, 95],
        title: "С Ру. на Англ.",
        description:
          "500 тестов, где вам нужно перевести с Русского на Английский",
      },
      {
        visible: true,
        selected: false,
        json: DBEngToRuTest1,
        storage_q_passed: [],
        storage_q_not_passed: [],
        storage_q_saved: [],
        title: "С Англ. на Ру.",
        description:
          "500 тестов, где вам нужно перевести с Английского на Русский",
      },
    ],
  },
];
