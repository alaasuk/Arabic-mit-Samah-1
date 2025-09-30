
export enum View {
  DASHBOARD,
  FILL_IN_BLANK,
  MULTIPLE_CHOICE,
  READING_COMPREHENSION,
  EDUCATIONAL_CARDS,
}

export interface FillBlankExercise {
  sentence: string;
  options: string[];
  answer: string;
}

export interface MCQExercise {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ReadingExercise {
  paragraph: string;
  question: string;
  answer: string;
}

export interface EducationalCard {
  concept: string;
  explanation: string;
  example: string;
}