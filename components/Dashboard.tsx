import React from 'react';
import { View } from '../types';
import SectionCard from './SectionCard';

interface DashboardProps {
  onSelectView: (view: View) => void;
}

const sections = [
  {
    view: View.MULTIPLE_CHOICE,
    title: 'اختر من متعدد',
    description: 'اختر الإجابة الصحيحة من بين الخيارات.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    view: View.FILL_IN_BLANK,
    title: 'املأ الفراغ',
    description: 'اكتب الكلمة المناسبة في الفراغ.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
      </svg>
    ),
  },
  {
    view: View.EDUCATIONAL_CARDS,
    title: 'بطاقات تعليمية',
    description: 'تعلم مفاهيم جديدة مع بطاقات تفاعلية.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0h-2M5 11H3" />
      </svg>
    ),
  },
  {
    view: View.READING_COMPREHENSION,
    title: 'تقوية القراءة',
    description: 'اقرأ نصوصاً قصيرة وممتعة عن كرة القدم.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];


const Dashboard: React.FC<DashboardProps> = ({ onSelectView }) => {
  return (
    <div className="text-center">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-slate-900 font-extrabold text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.289 7.5 15.5 7.5c1.21 0 2.32-.439 3.166-1.136m0-1.415V3" />
                </svg>
            </span>
            تعلم العربية مع سماح
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          أهلاً يا أبطال! أنا <span className="font-bold text-green-400">سماح</span>، وسأساعدكم في تعلم قواعد اللغة العربية بمتعة وحماس مع كرة القدم. هيا نختار تدريبنا اليوم!
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <SectionCard
            key={section.title}
            title={section.title}
            description={section.description}
            icon={section.icon}
            onClick={() => onSelectView(section.view)}
          />
        ))}
      </main>

      <footer className="mt-12 text-sm text-slate-500">
        <p>صنع بواسطة سماح لمساعدتكم على تعلم العربية</p>
      </footer>
    </div>
  );
};

export default Dashboard;
