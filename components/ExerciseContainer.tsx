import React from 'react';

interface ExerciseContainerProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
  exerciseNumber?: number;
}

const ExerciseContainer: React.FC<ExerciseContainerProps> = ({ title, onBack, children, exerciseNumber }) => {
  return (
    <div className="bg-slate-800 p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-3xl mx-auto min-h-[400px] flex flex-col">
        <header className="relative flex justify-center items-center w-full mb-6 min-h-[44px]">
            {/* Back Button on the start side (right in RTL) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <button
                    onClick={onBack}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-full transition-colors duration-300 flex items-center justify-center w-11 h-11 sm:w-auto sm:h-auto sm:px-4 sm:py-2 sm:gap-2"
                    aria-label="عودة"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                    <span className="hidden sm:inline">عودة</span>
                </button>
            </div>

            {/* Title in the center */}
            <h2 className="text-2xl sm:text-3xl font-bold text-green-400 text-center px-14 sm:px-28 truncate">
                {title}
            </h2>

            {/* Exercise Number on the end side (left in RTL) */}
            {exerciseNumber && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <span className="bg-slate-700 text-green-400 text-sm sm:text-lg font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        {exerciseNumber} / 25
                    </span>
                </div>
            )}
        </header>

        <div className="flex-grow flex flex-col items-center justify-center">
            {children}
        </div>
    </div>
  );
};

export default ExerciseContainer;
