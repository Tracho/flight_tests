export type QuizParamType = "all" | "saved" | "errors" | "";
export type QuizModeParamType = "standard" | "random" | "";
export type QuizFormatParamType = "choice" | "text" | "";

export type TypeParamsTitleQuestion = {
  title: string;
  type: QuizParamType;
  checked: boolean;
  disabled?: boolean; 
}[];

export type TypeQuizModeParamType = {
  title: string;
  type: QuizModeParamType;
  checked: boolean;
}[];
export type TypeQuizFormatParamType = {
  title: string;
  type: QuizFormatParamType;
  checked: boolean;
}[];
