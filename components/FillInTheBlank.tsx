import React, { useState, useEffect, useCallback } from 'react';
import { generateFillInTheBlank } from '../services/geminiService';
import { FillBlankExercise } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ExerciseContainer from './ExerciseContainer';

interface FillInTheBlankProps {
  onBack: () => void;
}

const FillInTheBlank: React.FC<FillInTheBlankProps> = ({ onBack }) => {
  const [exercise, setExercise] = useState<FillBlankExercise | null>(null);
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
      const newExercise = await generateFillInTheBlank();
      // Shuffle options to make it more challenging
      const shuffledOptions = [...newExercise.options].sort(() => Math.random() - 0.5);
      setExercise({ ...newExercise, options: shuffledOptions });
    } catch (error) {
      console.error("Failed to generate fill-in-the-blank exercise:", error);
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
  };

  const handleOptionClick = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(option);
    setIsSubmitted(true);
  };

  const getButtonClass = (option: string) => {
    if (!isSubmitted) {
      return 'bg-slate-700 hover:bg-slate-600';
    }
    if (option === exercise?.answer) {
      return 'bg-green-600 ring-2 ring-green-400';
    }
    if (option === selectedAnswer && option !== exercise?.answer) {
      return 'bg-red-600 ring-2 ring-red-400';
    }
    return 'bg-slate-700 opacity-50';
  };

  const getSentenceWithContent = () => {
    if (!exercise) return null;

    const parts = exercise.sentence.split('___');
    let content: React.ReactNode = <span className="inline-block bg-slate-900 border-2 border-dashed border-slate-600 rounded-lg w-32 h-10 mx-2" />;

    if (isSubmitted) {
      if (selectedAnswer === exercise.answer) {
        content = <span className="text-green-400 font-bold bg-green-900/50 px-2 py-1 rounded-md mx-2">{exercise.answer}</span>;
      } else {
        content = (
          <>
            <span className="text-red-400 font-bold bg-red-900/50 px-2 py-1 rounded-md line-through mx-2">{selectedAnswer}</span>
            <span className="text-green-400 font-bold bg-green-900/50 px-2 py-1 rounded-md mx-2">{exercise.answer}</span>
          </>
        );
      }
    }
    
    return (
        <p className="text-3xl font-semibold leading-relaxed text-center">
            {parts[0]}
            {content}
            {parts[1]}
        </p>
    );
  };

  return (
    <ExerciseContainer title="املأ الفراغ" onBack={onBack} exerciseNumber={exerciseCount}>
      {loading && <LoadingSpinner />}
      {!loading && exercise && (
        <div className="w-full text-center flex flex-col items-center gap-8">
            <div className="p-4 min-h-[80px]">
                {getSentenceWithContent()}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
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

            {isSubmitted && (
                 <div className="mt-4 flex flex-col items-center gap-4">
                     {selectedAnswer === exercise.answer 
                        ? <p className="text-green-400 text-xl font-bold">🎉 أحسنت! إجابة صحيحة</p> 
                        : <p className="text-red-400 text-xl font-bold">😕 إجابة خاطئة!</p>}
                     <button onClick={handleNextExercise} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                         تدريب جديد
                     </button>
                 </div>
            )}
        </div>
      )}
    </ExerciseContainer>
  );
};

export default FillInTheBlank;
