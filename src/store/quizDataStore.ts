import { create } from "zustand";
import type { QuizCategory } from "@/types/quiz";
import { quizData } from "@/data/quizData";

interface QuizDataState {
  data: QuizCategory[];

  setData: (data: QuizCategory[]) => void;

  updateData: (
    callback: (data: QuizCategory[]) => QuizCategory[]
  ) => void;
}

export const useQuizDataStore = create<QuizDataState>((set) => ({
  data: quizData,

  setData: (data) =>
    set({
      data,
    }),

  updateData: (callback) =>
    set((state) => ({
      data: callback(state.data),
    })),
}));

export const getData = () => useQuizDataStore.getState().data; 
 export const setData = (data: QuizCategory[]) =>
  useQuizDataStore.getState().setData(data);

export const updateData = (  callback: (data: QuizCategory[]) => QuizCategory[]) =>
  useQuizDataStore.getState().updateData(callback);
