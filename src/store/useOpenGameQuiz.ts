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
  idQuestion: number;
  showAnswers: boolean;
};
type SelectedAnswer = {
  text: string;
  select: boolean;
};

interface QuizState {
  data: QuizCategory[];

  selectQuestion: SelectQuestion;
  game: GameSettings;
  // arrSelectedAnswer: SelectedAnswer[];

  setSelectQuestion: (val: SelectQuestion) => void;

  setGame: (value: Partial<GameSettings>) => void;
  startGame: () => void;
  stopGame: () => void;
  resetGame: () => void;
  getOpenDataQuiz: () => QuizTest | undefined;
  getIdQuestion: () => number;
  getQuizQuestion: () => QuizQuestion;
  setShowAnswers: (val: boolean) => void;
  toggleShowAnswers: () => void;
  getShowAnswers: () => boolean;
  checkingAnswers: (answers: SelectedAnswer[]) => boolean;
}

const ObjGame: GameSettings = {
  mode: "",
  withTimer: false,
  started: false,
  idQuestion: 0,
  showAnswers: false,
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

  // arrSelectedAnswer: [],

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

  getIdQuestion: (): number => {
    return get().game.idQuestion;
  },

  setShowAnswers: (val) => {
    set((state) => ({
      game: {
        ...state.game,
        showAnswers: val,
      },
    }));
  },
  toggleShowAnswers: () =>
    set((state) => ({
      game: {
        ...state.game,
        showAnswers: !state.game.showAnswers,
      },
    })),
  getShowAnswers: () => get().game.showAnswers,

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

  checkingAnswers: (answers: SelectedAnswer[]) => {
    get().toggleShowAnswers();

    const question = get().getQuizQuestion();

    // правильные ответы из базы
    const correctAnswers = question.options
      .filter((item) => item.isCorrect)
      .map((item) => item.text)
      .sort();

    // ответы пользователя
    const selectedAnswers = answers
      .filter((item) => item.select)
      .map((item) => item.text)
      .sort();

    const isCorrect =
      correctAnswers.length === selectedAnswers.length &&
      correctAnswers.every(
        (answer, index) => answer === selectedAnswers[index],
      );

    return isCorrect;
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
      setShowAnswers: state.setShowAnswers,
      toggleShowAnswers: state.toggleShowAnswers,
      getShowAnswers: state.getShowAnswers,
      checkingAnswers: state.checkingAnswers,
    })),
  );

// 2. ОБЪЕКТ ДЛЯ ИЗМЕНЕНИЯ И ЧТЕНИЯ ВНЕ РЕНДЕРА (НЕ вызывает перерендер при вызове)
export const quizActionsTest = {
  setSelectQuestion: (val: SelectQuestion) =>
    useOpenQuiz.getState().setSelectQuestion(val),

  getSelectQuestion: () => useOpenQuiz.getState().selectQuestion,
  getOpenDataQuiz: () => useOpenQuiz.getState().getOpenDataQuiz(),
};
