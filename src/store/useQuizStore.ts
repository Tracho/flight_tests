// src/store/useQuizStore.ts
import { create } from "zustand";
import type { QuizCategory } from "@/types/quiz";

// Импорты ваших JSON данных
import DBTest1 from "@/data/Test1.json" with { type: "json" };
import DBTest2 from "@/data/Test2.json" with { type: "json" };
import DBTesting from "@/data/Testing.json" with { type: "json" };
import DBRuToEngTest1 from "@/data/Eng/RuToEngTest1.json" with { type: "json" };
import DBEngToRuTest1 from "@/data/Eng/EngToRuTest1.json" with { type: "json" };

// Описываем интерфейс нашего хранилища
interface QuizState {
  data: QuizCategory[];
  // Пример экшена: перенос вопроса из "ошибок" в "пройденные"
  passQuestion: (
    categoryName: string,
    testTitle: string,
    questionId: number,
  ) => void;
  // Пример экшена: сохранить вопрос в закладки
  toggleSaveQuestion: (
    categoryName: string,
    testTitle: string,
    questionId: number,
  ) => void;
  searchCateQuestion: (searchValue: string) => void;
  checkBoxCate: (nameCate:string) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  // Начальное состояние (ваш массив данных)
  data: [
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
          storage_q_passed: [2, 5, 6, 1, 8],
          storage_q_not_passed: [1, 4, 22, 9, 20, 21],
          storage_q_saved: [1, 2, 4, 7, 95],
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
  ],

  // Логика изменения состояния инкапсулирована здесь
  passQuestion: (categoryName, testTitle, questionId) =>
    set((state) => ({
      data: state.data.map((cat) => {
        if (cat.category !== categoryName) return cat;
        return {
          ...cat,
          arr: cat.arr.map((test) => {
            if (test.title !== testTitle) return test;
            return {
              ...test,
              // Удаляем из не пройденных
              storage_q_not_passed: test.storage_q_not_passed.filter(
                (id) => id !== questionId,
              ),
              // Добавляем в пройденные (если еще нет там)
              storage_q_passed: test.storage_q_passed.includes(questionId)
                ? test.storage_q_passed
                : [...test.storage_q_passed, questionId],
            };
          }),
        };
      }),
    })),

  toggleSaveQuestion: (categoryName, testTitle, questionId) =>
    set((state) => ({
      data: state.data.map((cat) => {
        if (cat.category !== categoryName) return cat;
        return {
          ...cat,
          arr: cat.arr.map((test) => {
            if (test.title !== testTitle) return test;
            const isSaved = test.storage_q_saved.includes(questionId);
            return {
              ...test,
              storage_q_saved: isSaved
                ? test.storage_q_saved.filter((id) => id !== questionId)
                : [...test.storage_q_saved, questionId],
            };
          }),
        };
      }),
    })),

  searchCateQuestion: (searchValue) =>
    set((state) => {
      const val = searchValue.trim().toLowerCase();
      return {
        data: state.data.map((datakey) => {
          const cat = datakey.category.trim().toLowerCase();

          // если строка поиска пустая — показываем всё
          if (!val) {
            return {
              ...datakey,
              visible: true,
            };
          }
          // проверяем совпадение
          const isMatch = cat.includes(val);

          return {
            ...datakey,
            visible: isMatch,
          };
        }),
      };
    }),

  checkBoxCate: (nameCate: string) =>
    set((state) => {
      const updated = state.data.map((item) => {
        if (item.category !== nameCate) return item;

        return {
          ...item,
          selected: !item.selected,
        };
      });

      // проверяем, есть ли выбранные
      const hasSelected = updated.some((item) => item.selected);

      return {
        data: updated.map((item) => ({
          ...item,
          visible: hasSelected ? item.selected : true,
        })),
      };
    }),
}));
