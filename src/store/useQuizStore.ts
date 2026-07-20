import { Checkbox } from "@/ui/input/Checkbox";
// src/store/useQuizStore.ts
import { create } from "zustand";
import type { QuizCategory } from "@/types/quiz";
import { quizData } from "@/data/quizData";
import { createJSONStorage, persist } from "zustand/middleware";
import { getData } from "./quizDataStore";

// Описываем интерфейс нашего хранилища
interface QuizState {
  data: QuizCategory[];
  selectedCategories: string[];
  selectedTests: string[];
  // Пример экшена: перенос вопроса из "ошибок" в "пройденные"
  searchCateQuestion: (searchValue: string) => void;
  checkBoxCate: (categoryName: string) => void;
  checkboxTest: (categoryName: string, testName: string) => void;
}

const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      // Начальное состояние (ваш массив данных)
      data: getData(),
      selectedCategories: [],
      selectedTests: [],
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

      checkBoxCate: (categoryName) =>
        set((state) => {
          const includesName = state.selectedCategories.includes(categoryName);

          const selectedCategories = includesName
            ? state.selectedCategories.filter((i) => i !== categoryName)
            : [...state.selectedCategories, categoryName];

          const category = state.data.find((item) => item.category === categoryName);

          const testTitles = category
            ? category.arr.map((test) => test.title)
            : [];

          const selectedTests = includesName
            ? state.selectedTests.filter((title) => !testTitles.includes(title))
            : [...new Set([...state.selectedTests, ...testTitles])];

          return {
            selectedCategories,
            selectedTests,
          };
        }),

      checkboxTest: (categoryName: string, testName: string) =>
        set((state) => {
          // Переключаем тест
          const selectedTests = state.selectedTests.includes(testName)
            ? state.selectedTests.filter((i) => i !== testName)
            : [...state.selectedTests, testName];

          // Находим категорию
          const category = state.data.find(
            (item) => item.category === categoryName,
          );

          if (!category) {
            return {
              selectedTests,
              selectedCategories: state.selectedCategories,
            };
          }

          // Проверяем, остался ли хоть один выбранный тест этой категории
          const hasSelected = category.arr.some((test) =>
            selectedTests.includes(test.title),
          );

          let selectedCategories = state.selectedCategories;

          if (hasSelected) {
            // Если категория ещё не выбрана — добавляем
            if (!selectedCategories.includes(categoryName)) {
              selectedCategories = [...selectedCategories, categoryName];
            }
          } else {
            // Если выбранных тестов больше нет — убираем категорию
            selectedCategories = selectedCategories.filter(
              (i) => i !== categoryName,
            );
          }

          return {
            selectedTests,
            selectedCategories,
          };
        }),
    }),
    {
      name: "local_cate_checkbox",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedCategories: state.selectedCategories,
        selectedTests: state.selectedTests,
      }),
    },
  ),
);

export const useQuizData = () => useQuizStore((state) => state.data);
export const useSelectedCategories = () =>
  useQuizStore((state) => state.selectedCategories);
export const useSelectedTests = () =>
  useQuizStore((state) => state.selectedTests);
export const quizActions = {
  searchCategory: (value: string) =>
    useQuizStore.getState().searchCateQuestion(value),

  checkCategory: (categoryName: string) => useQuizStore.getState().checkBoxCate(categoryName),
  checkboxTest: (categoryName: string, testName: string) =>
    useQuizStore.getState().checkboxTest(categoryName, testName),
};
