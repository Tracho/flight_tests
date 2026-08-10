import { create } from "zustand";
import { persist } from "zustand/middleware";


type SelectQuestion = {
  cate: string;
  quiz: string;
};
interface TypeSettingParams {
  selectQuiz: SelectQuestion; // Определение категории и квиза, также для url
  setSelectQuiz: (val: SelectQuestion) => void;
}

export const useSettingParams = create<TypeSettingParams>()(
  persist(
    (set, get) => ({
      selectQuiz: {cate:'',quiz:''},
      setSelectQuiz: (val) => set({ selectQuiz: val }),
      
    }),
    {
      name: "selectQuiz",
      partialize: (state: TypeSettingParams) => ({
        progressBar: state.selectQuiz,
      }),
    },
  ),
);

export const setSelectQuiz = (val: SelectQuestion) =>
  useSettingParams.getState().setSelectQuiz(val);
export const getSelectQuiz = () =>
  useSettingParams.getState().selectQuiz;
