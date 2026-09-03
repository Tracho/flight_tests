// src/types/quiz.ts
export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  title: string;
  timestamp?: string;
  info?:string,
  infoHelp?:string,
  correctAnswer: string;
  options: QuizOption[];
}

export interface CategoryQuiz {
  json: QuizQuestion[]; 
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
  arr: CategoryQuiz[];
}

// Тип для самого контекста
export interface QuizContextType {
  data: QuizCategory[];
  setData: React.Dispatch<React.SetStateAction<QuizCategory[]>>;
}
