import React, { useState, useEffect, useCallback } from 'react';
import { generateEducationalCard } from '../services/geminiService';
import { EducationalCard } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ExerciseContainer from './ExerciseContainer';

interface EducationalCardsProps {
  onBack: () => void;
}

const TOTAL_CARDS = 100;

const EducationalCards: React.FC<EducationalCardsProps> = ({ onBack }) => {
  const [card, setCard] = useState<EducationalCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [cardCount, setCardCount] = useState(1);

  const fetchCard = useCallback(async () => {
    setLoading(true);
    setCard(null);
    try {
      const level = cardCount <= 50 ? 'مبتدئ' : 'متوسط';
      const newCard = await generateEducationalCard(level);
      setCard(newCard);
    } catch (error) {
      console.error("Failed to generate educational card:", error);
    } finally {
      setLoading(false);
    }
  }, [cardCount]);

  useEffect(() => {
    fetchCard();
  }, [fetchCard]);

  const handleNextCard = () => {
    setCardCount(prev => (prev % TOTAL_CARDS) + 1);
    fetchCard();
  };

  return (
    <ExerciseContainer title="بطاقات تعليمية" onBack={onBack} exerciseNumber={cardCount}>
      {loading && <LoadingSpinner />}
      {!loading && card && (
        <div className="w-full flex flex-col items-center gap-8">
          <div className="bg-slate-900 p-8 rounded-2xl border-2 border-green-500 shadow-lg shadow-green-500/10 w-full max-w-lg text-center transform transition-transform duration-500">
                <h3 className="text-2xl font-bold text-green-400 mb-4">{card.concept}</h3>
                <p className="text-lg text-slate-300 mb-6">{card.explanation}</p>
                <div className="border-t border-slate-700 pt-4">
                    <p className="text-sm text-slate-500 mb-2">مثال:</p>
                    <p className="text-xl font-semibold text-white">{card.example}</p>
                </div>
          </div>
          <button onClick={handleNextCard} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors text-lg">
            البطاقة التالية
          </button>
        </div>
      )}
    </ExerciseContainer>
  );
};

export default EducationalCards;