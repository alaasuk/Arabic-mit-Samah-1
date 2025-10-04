import React from 'react';
import { HistoryState, View, FillBlankHistoryItem, MCQHistoryItem, ReadingHistoryItem } from '../types';
import ExerciseContainer from './ExerciseContainer';

interface HistoryViewProps {
  onBack: () => void;
  history: HistoryState;
}

const renderFillInTheBlankItem = (item: FillBlankHistoryItem, index: number, total: number) => {
    const parts = item.exercise.sentence.split('___');
    const isAnswerCorrect = item.selectedAnswer === item.exercise.answer;
    let content: React.ReactNode;

    if (isAnswerCorrect) {
        content = <span className="text-green-400 font-bold bg-green-900/50 px-2 py-0.5 rounded-md mx-1 text-base">{item.exercise.answer}</span>;
    } else {
        content = (
          <>
            <span className="text-red-400 font-bold bg-red-900/50 px-2 py-0.5 rounded-md line-through mx-1 text-base">{item.selectedAnswer}</span>
            <span className="text-green-400 font-bold bg-green-900/50 px-2 py-0.5 rounded-md mx-1 text-base">{item.exercise.answer}</span>
          </>
        );
    }

    return (
      <div key={index} className="bg-slate-900/50 p-4 rounded-lg space-y-2">
        <p className="text-lg leading-relaxed">
          <span className="font-bold text-slate-500 ml-2">{total - index}.</span>
          {parts[0]}{content}{parts[1]}
        </p>
        <div className="pr-6">
            <p className="font-bold text-yellow-500 text-sm">💡 الشرح: <span className="font-normal text-slate-300">{item.exercise.explanation}</span></p>
        </div>
      </div>
    );
};

const renderMCQItem = (item: MCQHistoryItem, index: number, total: number) => {
    return (
      <div key={index} className="bg-slate-900/50 p-4 rounded-lg space-y-2">
        <p className="font-semibold mb-2">
          <span className="font-bold text-slate-500 ml-2">{total - index}.</span>
          {item.exercise.question}
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm pr-6">
          {item.exercise.options.map(opt => {
            const isCorrect = opt === item.exercise.correctAnswer;
            const isSelected = opt === item.selectedAnswer;
            let classes = 'p-2 rounded ';
            if (isCorrect) {
              classes += 'bg-green-900/70 text-green-300';
            } else if (isSelected && !isCorrect) {
              classes += 'bg-red-900/70 text-red-300 line-through';
            } else {
              classes += 'bg-slate-800 text-slate-400';
            }
            return <div key={opt} className={classes}>{opt}</div>;
          })}
        </div>
        {item.exercise.explanation && (
            <div className="pr-6 pt-2">
                <p className="font-bold text-yellow-500 text-sm">💡 الشرح: <span className="font-normal text-slate-300">{item.exercise.explanation}</span></p>
            </div>
        )}
      </div>
    );
};

const renderReadingItem = (item: ReadingHistoryItem, index: number, total: number) => {
    return (
      <div key={index} className="bg-slate-900/50 p-4 rounded-lg space-y-3">
        <div>
          <span className="font-bold text-slate-500 ml-2">{total - index}.</span>
          <span className="text-slate-400 italic">"{item.exercise.paragraph}"</span>
        </div>
        <p className="font-semibold pr-6">{item.exercise.question}</p>
        <div className="grid grid-cols-2 gap-2 text-sm pr-6">
          {item.exercise.options.map(opt => {
            const isCorrect = opt === item.exercise.correctAnswer;
            const isSelected = opt === item.selectedAnswer;
            let classes = 'p-2 rounded ';
            if (isCorrect) classes += 'bg-green-900/70 text-green-300';
            else if (isSelected && !isCorrect) classes += 'bg-red-900/70 text-red-300 line-through';
            else classes += 'bg-slate-800 text-slate-400';
            return <div key={opt} className={classes}>{opt}</div>;
          })}
        </div>
        <div className="pr-6">
            <p className="font-bold text-yellow-500 text-sm">💡 الشرح: <span className="font-normal text-slate-300">{item.exercise.explanation}</span></p>
        </div>
      </div>
    );
};


const HistoryView: React.FC<HistoryViewProps> = ({ onBack, history }) => {
    const fillInBlankHistory = history[View.FILL_IN_BLANK];
    const mcqHistory = history[View.MULTIPLE_CHOICE];
    const readingHistory = history[View.READING_COMPREHENSION];
    
    const isEmpty = fillInBlankHistory.length === 0 && mcqHistory.length === 0 && readingHistory.length === 0;

  return (
    <ExerciseContainer title="سجل التمارين المحلولة" onBack={onBack}>
        {isEmpty ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <p className="text-2xl text-slate-400">📜</p>
                <p className="text-xl text-slate-400 mt-4">لم تقم بحل أي تمارين بعد.</p>
                <p className="text-slate-500">عندما تحل التمارين، ستظهر هنا للمراجعة.</p>
            </div>
        ) : (
            <div className="space-y-8">
                {fillInBlankHistory.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-green-400 mb-4 border-b-2 border-slate-700 pb-2">تمارين املأ الفراغ</h3>
                        <div className="space-y-4">
                            {fillInBlankHistory.map((item, index) => renderFillInTheBlankItem(item, index, fillInBlankHistory.length))}
                        </div>
                    </section>
                )}
                {mcqHistory.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-green-400 mb-4 border-b-2 border-slate-700 pb-2">تمارين اختر من متعدد</h3>
                        <div className="space-y-4">
                            {mcqHistory.map((item, index) => renderMCQItem(item, index, mcqHistory.length))}
                        </div>
                    </section>
                )}
                {readingHistory.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-green-400 mb-4 border-b-2 border-slate-700 pb-2">تمارين تقوية القراءة</h3>
                        <div className="space-y-4">
                            {readingHistory.map((item, index) => renderReadingItem(item, index, readingHistory.length))}
                        </div>
                    </section>
                )}
            </div>
        )}
    </ExerciseContainer>
  );
};

export default HistoryView;