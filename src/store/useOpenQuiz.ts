// src/store/useQuizStore.ts
import { create } from "zustand";
import type { QuizCategory } from "@/types/quiz";
import { quizData } from "@/data/quizData";

interface QuizState {
  data: QuizCategory[];
  selectQuestion: string;
  setSelectQuestion: (val: string) => void;
}

// Сам стор оставляем приватным (не экспортируем), 
// чтобы наружу выходили только чистые атомарные инструменты
const useOpenQuiz = create<QuizState>((set) => ({
  data: quizData,
  selectQuestion: "",
  setSelectQuestion: (val) => set({ selectQuestion: val }),
}));

// 1. ХУК ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ (Будет вызывать перерендер компонента при изменении)
export const useSelectQuestion = () => useOpenQuiz((state) => state.selectQuestion);
export const useQuizData = () => useOpenQuiz((state) => state.data);

// 2. ОБЪЕКТ ДЛЯ ИЗМЕНЕНИЯ И ЧТЕНИЯ ВНЕ РЕНДЕРА (НЕ вызывает перерендер при вызове)
export const quizActionsTest = {
  // Функция для изменения состояния
  setSelectQuestion: (val: string) => useOpenQuiz.getState().setSelectQuestion(val),
  
  // Функция для быстрого получения значения БЕЗ подписки (например, в обычных функциях или JS-файлах)
  getSelectQuestion: () => useOpenQuiz.getState().selectQuestion,
};
