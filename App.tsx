import React, { useState } from 'react';
import { View } from './types';
import Dashboard from './components/Dashboard';
import FillInTheBlank from './components/FillInTheBlank';
import MultipleChoice from './components/MultipleChoice';
import ReadingComprehension from './components/ReadingComprehension';
import EducationalCards from './components/EducationalCards';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard onSelectView={setCurrentView} />;
      case View.FILL_IN_BLANK:
        return <FillInTheBlank onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.MULTIPLE_CHOICE:
        return <MultipleChoice onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.READING_COMPREHENSION:
        return <ReadingComprehension onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.EDUCATIONAL_CARDS:
        return <EducationalCards onBack={() => setCurrentView(View.DASHBOARD)} />;
      default:
        return <Dashboard onSelectView={setCurrentView} />;
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
