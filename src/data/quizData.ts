// Импорты ваших JSON данных
import DBTest1 from "@/data/testing/Test1.json" with { type: "json" };
import DBTest2 from "@/data/testing/Test2.json" with { type: "json" };
import DBTesting from "@/data/testing/Testing.json" with { type: "json" };
import DBRuToEngTest1 from "@/data/Eng/RuToEngTest1.json" with { type: "json" };
import DBEngToRuTest1 from "@/data/Eng/EngToRuTest1.json" with { type: "json" };
import FrontEnd from '@/data/testing/FrontEnd.json' with {type:'json'};
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
        title: "Медицинские тесты #1",
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sapiente repellat nobis quisquam non illo esse magni fugiat maxime? Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?",
      },
      {
        visible: true,
        selected: false,
        json: DBTest2, 
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
        title: "My Data base Dev Testing",
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat labore possimus obcaecati blanditiis doloremque officia qui voluptas quia?",
      },
    ],
  },
    {
    category: "Интеллектуальный микс",
    description: "Вопросы обо всем на свете: от программирования до географии",
    visible: true,
    selected: false,
    arr: [
      {
        visible: true,
        selected: false,
        json: FrontEnd, 
        title: "Эрудит-Квиз: Базовый уровень",
        description: "Увлекательный тест из 10 вопросов для проверки общей эрудиции, логики и базовых знаний в веб-разработке, биологии и географии."
      }
    ]
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
        title: "С Ру. на Англ.",
        description:
          "500 тестов, где вам нужно перевести с Русского на Английский",
      },
      {
        visible: true,
        selected: false,
        json: DBEngToRuTest1, 
        title: "С Англ. на Ру.",
        description:
          "500 тестов, где вам нужно перевести с Английского на Русский",
      },
    ],
  },
];
