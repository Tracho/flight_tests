import { create } from "zustand";
import type { QuizCategory } from "@/types/quiz";
import { quizData } from "@/data/quizData";
import { persist } from "zustand/middleware";
import type { QuizProgressBar, QuizProgressBarKey } from "@/types/quizProgressStore";

type SelectQuestion = {
  cate: string;
  quiz: string;
};
interface QuizDataState {
  data: QuizCategory[]; // Глобальная база с категориями и квизами
  progressBar: QuizProgressBar; // Сохранение прогресса, вопросы которые пройдены, не пройдены и сохраненные
  selectQuestion: SelectQuestion; // Определение категории и квиза, также для url
  setData: (data: QuizCategory[]) => void;
  setSelectQuestion: (data: SelectQuestion) => void;
  getProgressBar: (data: SelectQuestion) => QuizProgressBarKey;

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

      selectQuestion: {
        // Определение категории и квиза, также для url
        cate: "",
        quiz: "",
      },

      setData: (data) =>
        set({
          data,
        }),

      setSelectQuestion: (data) =>
        set({
          selectQuestion: data,
        }),

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
      name: "quiz-data-store",
      partialize: (state: QuizDataState) => ({
        progressBar: state.progressBar,
      }),
    },
  ),
);

export const getData = () => useQuizDataStore.getState().data;
export const getSelectQuestion = () =>
  useQuizDataStore.getState().selectQuestion;
export const getProgressBar = (data: SelectQuestion) =>
  useQuizDataStore.getState().getProgressBar(data);

export const setData = (data: QuizCategory[]) =>
  useQuizDataStore.getState().setData(data);
export const setSelectQuestion = (val: SelectQuestion) =>
  useQuizDataStore.getState().setSelectQuestion(val);

export const updateData = (
  callback: (data: QuizCategory[]) => QuizCategory[],
) => useQuizDataStore.getState().updateData(callback);

export const updateProgressBar = (
  callback: (data: QuizProgressBar) => QuizProgressBar,
) => useQuizDataStore.getState().updateProgressBar(callback);
