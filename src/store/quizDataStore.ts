import { create } from "zustand";
import type { QuizCategory } from "@/types/quiz";
import { quizData } from "@/data/quizData";
import { persist } from "zustand/middleware";
import type {
  QuizProgressBar,
  QuizProgressBarKey,
} from "@/types/quizProgressStore";

type SelectQuestion = {
  cate: string;
  quiz: string;
};
interface QuizDataState {
  data: QuizCategory[]; // Глобальная база с категориями и квизами
  progressBar: QuizProgressBar; // Сохранение прогресса, вопросы которые пройдены, не пройдены и сохраненные
  setData: (data: QuizCategory[]) => void;
  getProgressBar: (data: SelectQuestion) => QuizProgressBarKey;

  hasQuiz: (cate: string, title: string) => boolean; // Находит квиз, вернёт true / false

  updateData: (callback: (data: QuizCategory[]) => QuizCategory[]) => void;
  updateProgressBar: (
    callback: (data: QuizProgressBar) => QuizProgressBar,
  ) => void;
}

export const useQuizDataStore = create<QuizDataState>()(
  persist(
    (set, get) => ({
      data: quizData, // Глобальная база с категориями и квизами

      progressBar: {}, // Сохранение прогресса, вопросы которые пройдены, не пройдены и сохраненные

      setData: (data) =>
        set({
          data,
        }),
     
      hasQuiz: (cate: string, title: string) => {
        const currentData = get().data;
        // 1. Ищем категорию по полю 'category'
        const foundCategory = currentData.find(
          (c) => c.category.toLowerCase() === cate.toLowerCase(),
        );
        if (!foundCategory) return false;

        // 2. Внутри найденной категории ищем квиз в массиве 'arr' по полю 'title'
        return foundCategory.arr.some(
          (q) => q.title.toLowerCase() === title.toLowerCase(),
        );
      },

      getProgressBar: ({ cate, quiz }: SelectQuestion) => {
        const progress = get().progressBar;
        return progress?.[cate]?.[quiz];
      },

      updateData: (callback) =>
        set((state) => ({
          data: callback(state.data),
        })),

      updateProgressBar: (callback) =>
        set((state) => ({
          progressBar: callback(state.progressBar),
        })),
    }),
    {
      name: "progressBar",
      partialize: (state: QuizDataState) => ({
        progressBar: state.progressBar,
      }),
    },
  ),
);

export const getData = () => useQuizDataStore.getState().data;
export const useProgressBarAll = () => useQuizDataStore((state) => state.progressBar);

export const getProgressBar = (data: SelectQuestion) => // не вызывает перерисовку компонента из-за getState 
  useQuizDataStore.getState().getProgressBar(data);
export const useProgressBar = (cate: string, quiz: string) => // вызывает перерисовку компонента 
  useQuizDataStore((state) => state.progressBar[cate]?.[quiz]);

export const setData = (data: QuizCategory[]) =>
  useQuizDataStore.getState().setData(data);

export const updateData = (
  callback: (data: QuizCategory[]) => QuizCategory[],
) => useQuizDataStore.getState().updateData(callback);

export const updateProgressBar = (
  callback: (data: QuizProgressBar) => QuizProgressBar,
) => useQuizDataStore.getState().updateProgressBar(callback);

export const hasQuiz = (cate: string, title: string) =>
  useQuizDataStore.getState().hasQuiz(cate, title);
