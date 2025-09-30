import React, { useState, useEffect, useCallback } from 'react';
import { generateReadingComprehension } from '../services/geminiService';
import { ReadingExercise } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ExerciseContainer from './ExerciseContainer';

interface ReadingComprehensionProps {
  onBack: () => void;
}

const ReadingComprehension: React.FC<ReadingComprehensionProps> = ({ onBack }) => {
  const [exercise, setExercise] = useState<ReadingExercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [exerciseCount, setExerciseCount] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const fetchExercise = useCallback(async () => {
    setLoading(true);
    setExercise(null);
    setShowAnswer(false);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    try {
      const newExercise = await generateReadingComprehension();
      setExercise(newExercise);
    } catch (error) {
      console.error("Failed to generate reading comprehension exercise:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExercise();
    return () => {
      window.speechSynthesis.cancel(); // Cleanup on unmount
    };
  }, [fetchExercise]);

  const handleNextExercise = () => {
    setExerciseCount(prev => (prev % 25) + 1);
    fetchExercise();
  };
  
  const speakText = (text: string) => {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <ExerciseContainer title="تقوية القراءة" onBack={onBack} exerciseNumber={exerciseCount}>
      {loading && <LoadingSpinner />}
      {!loading && exercise && (
        <div className="w-full text-center flex flex-col items-center gap-6">
            <div className="relative bg-slate-900 p-6 rounded-xl border border-slate-700 w-full">
                <button 
                    onClick={() => speakText(exercise.paragraph)}
                    className="absolute top-3 left-3 bg-slate-700 p-2 rounded-full hover:bg-slate-600 transition-colors"
                    aria-label={isSpeaking ? "إيقاف الصوت" : "تشغيل الصوت"}
                >
                    {isSpeaking ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                    )}
                </button>
                <p className="text-xl leading-relaxed text-slate-200">{exercise.paragraph}</p>
            </div>
            
            <div className="mt-4">
                <p className="text-2xl font-semibold text-green-400">{exercise.question}</p>
            </div>
            
            <div className="mt-2 min-h-[120px] flex flex-col items-center justify-center gap-4">
                {showAnswer ? (
                    <div className="flex flex-col items-center gap-4 animate-fade-in">
                        <p className="text-2xl font-bold bg-green-900/50 text-green-300 p-4 rounded-lg">{exercise.answer}</p>
                         <button onClick={handleNextExercise} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            النص التالي
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setShowAnswer(true)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        أظهر الإجابة
                    </button>
                )}
            </div>
        </div>
      )}
    </ExerciseContainer>
  );
};

export default ReadingComprehension;
