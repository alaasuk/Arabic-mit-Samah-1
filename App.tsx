import React, { useState, useEffect } from 'react';
import { View, HistoryState, HistoryItem } from './types';
import Dashboard from './components/Dashboard';
import FillInTheBlank from './components/FillInTheBlank';
import MultipleChoice from './components/MultipleChoice';
import ReadingComprehension from './components/ReadingComprehension';
import EducationalCards from './components/EducationalCards';
import HistoryView from './components/HistoryView';

const initialHistoryState: HistoryState = {
  [View.FILL_IN_BLANK]: [],
  [View.MULTIPLE_CHOICE]: [],
  [View.READING_COMPREHENSION]: [],
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [points, setPoints] = useState<number>(0);
  const [history, setHistory] = useState<HistoryState>(initialHistoryState);

  useEffect(() => {
    try {
      const savedPoints = localStorage.getItem('studentPoints');
      if (savedPoints) {
        setPoints(JSON.parse(savedPoints));
      }
      const savedHistory = localStorage.getItem('studentHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setPoints(0);
      setHistory(initialHistoryState);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('studentPoints', JSON.stringify(points));
    } catch (error) {
      console.error("Failed to save points to localStorage", error);
    }
  }, [points]);

  useEffect(() => {
    try {
      localStorage.setItem('studentHistory', JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  const addPoints = (amount: number) => {
    setPoints(prevPoints => prevPoints + amount);
  };

  const addHistoryItem = (exerciseType: View.FILL_IN_BLANK | View.MULTIPLE_CHOICE | View.READING_COMPREHENSION, item: HistoryItem) => {
    setHistory(prevHistory => {
        const newHistoryForType = [item, ...prevHistory[exerciseType]];
        return {
            ...prevHistory,
            [exerciseType]: newHistoryForType,
        };
    });
  };

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard onSelectView={setCurrentView} />;
      case View.FILL_IN_BLANK:
        return <FillInTheBlank onBack={() => setCurrentView(View.DASHBOARD)} addPoints={addPoints} addHistoryItem={addHistoryItem} />;
      case View.MULTIPLE_CHOICE:
        return <MultipleChoice onBack={() => setCurrentView(View.DASHBOARD)} addPoints={addPoints} addHistoryItem={addHistoryItem} />;
      case View.READING_COMPREHENSION:
        return <ReadingComprehension onBack={() => setCurrentView(View.DASHBOARD)} addPoints={addPoints} addHistoryItem={addHistoryItem} />;
      case View.EDUCATIONAL_CARDS:
        return <EducationalCards onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.HISTORY:
        return <HistoryView onBack={() => setCurrentView(View.DASHBOARD)} history={history} />;
      default:
        return <Dashboard onSelectView={setCurrentView} />;
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-screen">
         <header className="w-full py-4 flex justify-between items-center flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
              <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-slate-900 font-extrabold text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.289 7.5 15.5 7.5c1.21 0 2.32-.439 3.166-1.136m0-1.415V3" />
                  </svg>
              </span>
              <span className="hidden sm:inline">تعلم العربية مع سماح</span>
          </h1>
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-lg text-white">{points}</span>
              <span className="text-sm text-slate-400">نقطة</span>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center">
            {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
