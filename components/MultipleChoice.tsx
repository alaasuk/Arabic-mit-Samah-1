import React, { useState, useEffect, useCallback } from 'react';
import { generateMultipleChoice } from '../services/geminiService';
import { MCQExercise } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ExerciseContainer from './ExerciseContainer';

interface MultipleChoiceProps {
  onBack: () => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ onBack }) => {
  const [exercise, setExercise] = useState<MCQExercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [exerciseCount, setExerciseCount] = useState(1);

  const fetchExercise = useCallback(async () => {
    setLoading(true);
    setExercise(null);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    try {
      const newExercise = await generateMultipleChoice();
      setExercise(newExercise);
    } catch (error) {
      console.error("Failed to generate multiple choice exercise:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExercise();
  }, [fetchExercise]);

  const handleNextExercise = () => {
    setExerciseCount(prev => (prev % 25) + 1);
    fetchExercise();
  }

  const handleOptionClick = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(option);
  };
  
  const handleSubmit = () => {
      if (selectedAnswer) {
          setIsSubmitted(true);
      }
  }

  const getButtonClass = (option: string) => {
    if (!isSubmitted) {
      return selectedAnswer === option
        ? 'bg-blue-600 ring-2 ring-blue-400'
        : 'bg-slate-700 hover:bg-slate-600';
    }

    if (option === exercise?.correctAnswer) {
      return 'bg-green-600 ring-2 ring-green-400';
    }

    if (option === selectedAnswer && option !== exercise?.correctAnswer) {
      return 'bg-red-600 ring-2 ring-red-400';
    }

    return 'bg-slate-700 opacity-50';
  };
  
  const feedbackMessage = isSubmitted ? (
    selectedAnswer === exercise?.correctAnswer ? (
        <p className="text-green-400 text-xl font-bold">🎉 أحسنت! إجابة صحيحة</p>
    ) : (
        <p className="text-red-400 text-xl font-bold">😕 إجابة خاطئة، حاول مجدداً في التدريب التالي!</p>
    )
  ) : null;

  return (
    <ExerciseContainer title="اختر من متعدد" onBack={onBack} exerciseNumber={exerciseCount}>
      {loading && <LoadingSpinner />}
      {!loading && exercise && (
        <div className="w-full flex flex-col items-center gap-8">
          <p className="text-2xl font-semibold text-center">{exercise.question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            {exercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={isSubmitted}
                className={`p-4 rounded-lg text-lg font-semibold transition-all duration-300 w-full ${getButtonClass(option)}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center gap-4 min-h-[80px]">
             {isSubmitted ? (
                 <>
                    {feedbackMessage}
                    <button onClick={handleNextExercise} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        تدريب جديد
                    </button>
                 </>
             ) : (
                <button onClick={handleSubmit} disabled={!selectedAnswer} className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors">
                    تأكيد الإجابة
                </button>
             )}
          </div>
        </div>
      )}
    </ExerciseContainer>
  );
};

export default MultipleChoice;
