// src/store/useQuizStore.ts
import { create } from "zustand";
import type { QuizCategory, QuizQuestion, CategoryQuiz } from "@/types/quiz";
import { useShallow } from "zustand/react/shallow";
import {
  getData,
  getSelectQuestion,
  updateData,
  updateProgressBar,
} from "./quizDataStore";

type GameSettings = {
  mode: "standard" | "random" | "";
  withTimer: boolean;
  started: boolean;
  finish:boolean;
  idQuestion: number;
  showAnswers: boolean;
};
type SelectedAnswer = {
  text: string;
  select: boolean;
};

interface QuizState {
  data: QuizCategory[]; // Глобальная дата баззы
  game: GameSettings; // Игровая настройка. Когда должна начаться игра, закончится, показать ответы, время и тд

  setGame: (value: Partial<GameSettings>) => void; // Изменение настройки игры, к примеру мод игры
  startGame: () => void; // Запустить игру
  stopGame: () => void; // Остановить игру
  resetGame: () => void; // Обновить все настройки игры
  getOpenDataCateQuiz: () => CategoryQuiz | undefined; // Достает категорию квиза
  getQuizQuestion: () => QuizQuestion; // Достает вопрос из квиза
  getIdQuestion: () => number; // Достает текущий индекс из ObjGame: GameSettings
  setСhangeStatusAnswers: (val: boolean) => void; // Вручную изменить  showAnswers: false || true, в ObjGame: GameSettings чтобы скрыть вопросы или показать какой должен был быть ответ
  toggleShowAnswers: () => void; // Автоматично при вызове переписывает showAnswers: false || true, в ObjGame: GameSettings тем самим вопросы будут показывать как правильно и не правильно, или скрыть вопросы
  getShowAnswers: () => boolean; // Достает showAnswers: false || true, в ObjGame: GameSettings
  checkingAnswers: (answers: SelectedAnswer[]) => boolean; // Проверка ответов answers == question.options, вернут boolean
  nextQuestion: () => void; // часть навигации следующий вопрос
  previousQuestion: () => void; // часть навигации предыдущий вопрос
  addIdQuestProgress: (boolean: boolean) => void; //
  endGame:() => void;
}

const ObjGame: GameSettings = {
  mode: "",
  withTimer: false,
  started: false,
  finish:false,
  idQuestion: 0,
  showAnswers: false,
};
// Сам стор оставляем приватным (не экспортируем),
// чтобы наружу выходили только чистые атомарные инструменты
const useOpenQuiz = create<QuizState>((set, get) => ({
  data: getData(),
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

  setСhangeStatusAnswers: (val) => {
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

  getQuizQuestion: (): QuizQuestion => {
    const quiz = get().getOpenDataCateQuiz();
    const index = get().game.idQuestion;

    return quiz?.json[index] || ({} as QuizQuestion);
  },

  getOpenDataCateQuiz: (): CategoryQuiz | undefined => {
    const select = getSelectQuestion();
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

  nextQuestion: () => {
    const max_index = get().getOpenDataCateQuiz()?.json.length ?? 0;
    const this_index = get().getIdQuestion();
    const next_index = this_index + 1 < max_index ? this_index + 1 : this_index;

    set((state) => ({
      game: {
        ...state.game,
        idQuestion: next_index,
      },
    }));
  },

  previousQuestion: () => {
    const this_index = get().getIdQuestion();
    const prev_index = this_index > 0 ? this_index - 1 : 0;

    set((state) => ({
      game: {
        ...state.game,
        idQuestion: prev_index,
      },
    }));
  },

  addIdQuestProgress: (isCorrect) => {
    const { cate, quiz } = getSelectQuestion();
    const questionId = get().game.idQuestion;
    console.log(isCorrect);
    updateProgressBar((progress) => {
      const newProgress = structuredClone(progress);

      // создаем структуру если ее нет
      if (!newProgress[cate]) {
        newProgress[cate] = {};
      }

      if (!newProgress[cate][quiz]) {
        newProgress[cate][quiz] = {
          passed: [],
          not_passed: [],
          q_saved: [],
        };
      }

      const current = newProgress[cate][quiz];

      let passed = [...current.passed];
      let notPassed = [...current.not_passed];

      if (isCorrect) {
        const count = notPassed.filter((id) => id === questionId).length;

        if (count > 1) {
          const index = notPassed.indexOf(questionId);
          notPassed.splice(index, 1);
        } else if (count === 1) {
          notPassed = notPassed.filter((id) => id !== questionId);

          if (!passed.includes(questionId)) {
            passed.push(questionId);
          }
        } else {
          if (!passed.includes(questionId)) {
            passed.push(questionId);
          }
        }
      } else {
        const count = notPassed.filter((id) => id === questionId).length;

        if (count < 3) {
          notPassed.push(questionId);
        }

        passed = passed.filter((id) => id !== questionId);
      }

      current.passed = passed;
      current.not_passed = notPassed;

      console.group(`%c${cate} / ${quiz}`, "color:cyan;font-weight:bold");

      console.log("Passed:", passed);
      console.log("Not passed:", notPassed);

      console.groupEnd();

      return newProgress;
    });
  },

  endGame:()=>{
   const maxLenghtQuiz = get().getOpenDataCateQuiz()?.json.length; 
   const thisNumberQuiz = get().game.idQuestion +1;
  console.log(thisNumberQuiz)
    console.log(maxLenghtQuiz)
   if(maxLenghtQuiz && thisNumberQuiz === maxLenghtQuiz){
    
    get().setGame({
      finish:true,
    })
   }
  }
}));

// 1. ХУК ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ (Будет вызывать перерендер компонента при изменении)

export const useQuizData = () => useOpenQuiz((state) => state.data);
export const useGame = () =>
  useOpenQuiz(
    useShallow((state) => ({
      game: state.game,
      setGame: state.setGame,
      startGame: state.startGame,
      stopGame: state.stopGame,
      resetGame: state.resetGame,
      endGame:state.endGame,
      getIdQuestion: state.getIdQuestion,
      getQuizQuestion: state.getQuizQuestion,
      setСhangeStatusAnswers: state.setСhangeStatusAnswers,
      toggleShowAnswers: state.toggleShowAnswers,
      getShowAnswers: state.getShowAnswers,
      checkingAnswers: state.checkingAnswers,
      nextQuestion: state.nextQuestion,
      previousQuestion: state.previousQuestion,
      addIdQuestProgress: state.addIdQuestProgress,
    })),
  );

// 2. ОБЪЕКТ ДЛЯ ИЗМЕНЕНИЯ И ЧТЕНИЯ ВНЕ РЕНДЕРА (НЕ вызывает перерендер при вызове)
export const quizActionsTest = {
  getOpenDataCateQuiz: () => useOpenQuiz.getState().getOpenDataCateQuiz(),
};
