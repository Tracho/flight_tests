type QuizParamType = "all" | "saved" | "errors";

export type TypeParamsTitleQuestion = {
  title: string;
  type: QuizParamType;
  checked: boolean;
}[];