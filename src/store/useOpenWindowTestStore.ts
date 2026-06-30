// src/store/useQuizStore.ts
import { create } from "zustand";
import type { QuizCategory, QuizQuestion } from "@/types/quiz";
import { quizData } from "@/data/quizData";

interface QuizState {
  data: QuizCategory[];

  getQuestionsCount: (cateName: string, testName: string) => number;
  getQuestion: (
    cateName: string,
    testName: string,
    numberTest: number,
  ) => QuizQuestion | undefined;
}

const useOpenWindowTestStore = create<QuizState>((set, get) => ({
  data: quizData,
  getQuestion: (cateName, testName, numberTest) => {
    // Находим нужный тест, используя безопасный опциональный поиск ?.
    return get()
      .data.find((cat) => cat.category === cateName)
      ?.arr.find((test) => test.title === testName)?.json[numberTest]; // Если элемента нет, автоматически вернется undefined
  },
  getQuestionsCount: (cateName, testName) => {
    return (
      get()
        .data.find((cat) => cat.category === cateName)
        ?.arr.find((test) => test.title === testName)?.json.length ?? 0
    );
  },
}));

// Экспортируем метод для вызова вне React-компонентов (например, в функциях-хелперах)
export const quizOpenWindow = {
  getQuestion: (cateName: string, testName: string, numberTest: number) =>
    useOpenWindowTestStore
      .getState()
      .getQuestion(cateName, testName, numberTest),

  getQuestionsCount: (cateName: string, testName: string) =>
    useOpenWindowTestStore.getState().getQuestionsCount(cateName, testName),
};
