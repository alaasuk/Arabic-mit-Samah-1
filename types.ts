import { View as V } from './types';

export enum View {
  DASHBOARD,
  FILL_IN_BLANK,
  MULTIPLE_CHOICE,
  READING_COMPREHENSION,
  EDUCATIONAL_CARDS,
  HISTORY,
}

export interface FillBlankExercise {
  sentence: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface MCQExercise {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ReadingExercise {
  paragraph: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface EducationalCard {
  concept: string;
  explanation: string;
  example: string;
}

// History Types
export interface FillBlankHistoryItem {
  exercise: FillBlankExercise;
  selectedAnswer: string;
}

export interface MCQHistoryItem {
  exercise: MCQExercise;
  selectedAnswer: string;
}

export interface ReadingHistoryItem {
    exercise: ReadingExercise;
    selectedAnswer: string;
}

export type HistoryItem = FillBlankHistoryItem | MCQHistoryItem | ReadingHistoryItem;

export interface HistoryState {
  [V.FILL_IN_BLANK]: FillBlankHistoryItem[];
  [V.MULTIPLE_CHOICE]: MCQHistoryItem[];
  [V.READING_COMPREHENSION]: ReadingHistoryItem[];
}