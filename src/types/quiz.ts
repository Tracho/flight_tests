// src/types/quiz.ts
export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  title: string;
  timestamp: string;
  info?:string,
  infoHelp?:string,
  correctAnswer: string;
  options: QuizOption[];
}

export interface QuizTest {
  json: QuizQuestion[];
  storage_q_passed: number[];
  storage_q_not_passed: number[];
  storage_q_saved: number[];
  title: string;
  description: string;
  visible:boolean;
  selected: boolean;
}

export interface QuizCategory {
  category: string;
  description: string;
  visible:boolean;
  selected: boolean;
  arr: QuizTest[];
}

// Тип для самого контекста
export interface QuizContextType {
  data: QuizCategory[];
  setData: React.Dispatch<React.SetStateAction<QuizCategory[]>>;
}
