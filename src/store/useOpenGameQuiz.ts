// src/store/useQuizStore.ts
import { create } from "zustand";
import type { QuizCategory, QuizQuestion, QuizTest } from "@/types/quiz";
import { useShallow } from "zustand/react/shallow";
import { quizData } from "@/data/quizData";

type SelectQuestion = {
  cate: string;
  quiz: string;
};
type GameSettings = {
  mode: "standard" | "random" | "";
  withTimer: boolean;
  started: boolean;
  idQuestion:number;
};
interface QuizState {
  data: QuizCategory[];

  selectQuestion: SelectQuestion;
  game: GameSettings;

  setSelectQuestion: (val: SelectQuestion) => void;

  setGame: (value: Partial<GameSettings>) => void;
  startGame: () => void;
  stopGame: () => void;
  resetGame: () => void;
  getOpenDataQuiz: () => QuizTest | undefined;
  getIdQuestion:() => number;
  getQuizQuestion:() => QuizQuestion;
}

const ObjGame:GameSettings = {
  mode: "",
  withTimer: false,
  started: false,
  idQuestion:0,
};
// Сам стор оставляем приватным (не экспортируем),
// чтобы наружу выходили только чистые атомарные инструменты
const useOpenQuiz = create<QuizState>((set, get) => ({
  data: quizData,

  selectQuestion: {
    cate: "",
    quiz: "",
  },

  game: ObjGame,

  setGame: (value) =>
    set((state) => ({
      game: {
        ...state.game,
        ...value,
      },
    })),

  startGame: () =>
    set((state) => ({
      game: {
        ...state.game,
        started: true,
      },
    })),

  stopGame: () =>
    set((state) => ({
      game: {
        ...state.game,
        started: false,
      },
    })),

  resetGame: () =>
    set({
      game: ObjGame,
    }),

  getIdQuestion:():number =>{
    return get().game.idQuestion;
  },

  setSelectQuestion: (val) =>
    set({
      selectQuestion: val,
    }),

  getQuizQuestion: (): QuizQuestion => {
    const quiz = get().getOpenDataQuiz();
    const index = get().game.idQuestion;
    return quiz?.json[index] || ({} as QuizQuestion);
  },

  getOpenDataQuiz: (): QuizTest | undefined => {
    const select = get().selectQuestion;
    return get()
      .data.find((cat) => cat.category === select.cate)
      ?.arr.find((quiz) => quiz.title === select.quiz);
  },
}));

// 1. ХУК ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ (Будет вызывать перерендер компонента при изменении)
export const useSelectQuestion = () =>
  useOpenQuiz((state) => state.selectQuestion);
export const useQuizData = () => useOpenQuiz((state) => state.data);

export const useGame = () =>
  useOpenQuiz(
    useShallow((state) => ({
      game: state.game,
      setGame: state.setGame,
      startGame: state.startGame,
      stopGame: state.stopGame,
      resetGame: state.resetGame,
      getIdQuestion: state.getIdQuestion,
      getQuizQuestion: state.getQuizQuestion,
    }))
  );

// 2. ОБЪЕКТ ДЛЯ ИЗМЕНЕНИЯ И ЧТЕНИЯ ВНЕ РЕНДЕРА (НЕ вызывает перерендер при вызове)
export const quizActionsTest = {
  setSelectQuestion: (val: SelectQuestion) =>
    useOpenQuiz.getState().setSelectQuestion(val),

  getSelectQuestion: () => useOpenQuiz.getState().selectQuestion,
  getOpenDataQuiz: () => useOpenQuiz.getState().getOpenDataQuiz(),
};
