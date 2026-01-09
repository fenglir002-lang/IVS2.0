
import React, { useState } from 'react';
import { Activity, QuestionnaireResult } from '../types';
import { MOCK_QUESTIONS } from '../constants';

interface Props {
  activity: Activity;
  onComplete: (res: QuestionnaireResult) => void;
  onClose: () => void;
}

const QuestionnaireForm: React.FC<Props> = ({ activity, onComplete, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const question = MOCK_QUESTIONS[currentIdx];
  const progress = ((currentIdx + 1) / MOCK_QUESTIONS.length) * 100;

  const handleOptionClick = (option: string) => {
    if (question.type === 'single') {
      setAnswers(prev => ({ ...prev, [question.id]: option }));
    } else {
      const currentArr = (answers[question.id] as string[]) || [];
      if (currentArr.includes(option)) {
        setAnswers(prev => ({ ...prev, [question.id]: currentArr.filter(o => o !== option) }));
      } else {
        setAnswers(prev => ({ ...prev, [question.id]: [...currentArr, option] }));
      }
    }
  };

  const isCurrentAnswerValid = () => {
    if (!question.required) return true;
    const ans = answers[question.id];
    if (Array.isArray(ans)) return ans.length > 0;
    return !!ans;
  };

  const next = () => {
    if (currentIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  const prev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const finalize = () => {
    const result: QuestionnaireResult = {
      id: 'res-' + Date.now(),
      customerName: '访客*',
      phone: '138****0000',
      enterprise: '临时企业',
      activityName: activity.title,
      submitTime: new Date().toISOString().split('T')[0],
      answers: { ...answers }
    };
    onComplete(result);
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-bottom duration-500">
      {/* Header & Progress */}
      <div className="p-6 border-b flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Questionnaire</span>
            <span className="text-sm font-black text-[#D31145]">{currentIdx + 1} / {MOCK_QUESTIONS.length}</span>
          </div>
          <div className="w-10"></div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#D31145] h-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          <div className="mb-10">
            <div className="flex gap-3 items-center mb-6">
              <span className="bg-[#D31145] text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter">
                {question.type === 'single' ? 'Single Choice' : 'Multiple Choice'}
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 leading-tight mb-10">{question.title}</h2>
            
            <div className="space-y-4">
              {question.options.map(option => {
                const isSelected = question.type === 'single' 
                  ? answers[question.id] === option
                  : ((answers[question.id] as string[]) || []).includes(option);

                return (
                  <div 
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className={`group p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected 
                      ? 'border-[#D31145] bg-[#D31145]/5 shadow-lg shadow-red-50' 
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`text-lg font-bold transition-colors ${isSelected ? 'text-[#D31145]' : 'text-slate-600 group-hover:text-slate-800'}`}>
                        {option}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-[#D31145] bg-[#D31145]' : 'border-slate-200 bg-white'}`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-8 border-t flex gap-6 bg-slate-50/50 backdrop-blur">
        <button 
          onClick={prev}
          disabled={currentIdx === 0}
          className={`flex-1 py-5 rounded-2xl font-black transition-all ${
            currentIdx === 0 ? 'text-slate-300 border-slate-100 bg-white' : 'text-slate-600 bg-white border border-slate-200 hover:border-slate-400 active:scale-95 shadow-sm'
          }`}
        >
          上一题
        </button>
        <button 
          onClick={next}
          disabled={!isCurrentAnswerValid()}
          className={`flex-1 py-5 rounded-2xl font-black shadow-xl transition-all ${
            isCurrentAnswerValid() 
            ? 'bg-[#D31145] text-white active:scale-95 hover:bg-[#b50e3b] shadow-red-200' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {currentIdx === MOCK_QUESTIONS.length - 1 ? '提交问卷' : '下一题'}
        </button>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-green-100">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">问卷提交成功</h3>
            <p className="text-slate-400 mb-10 leading-relaxed text-lg px-4 font-medium">感谢您的宝贵建议。我们的营销员将会尽快为您整理专属保障方案。</p>
            <button 
              onClick={finalize}
              className="w-full py-5 bg-[#D31145] text-white rounded-2xl font-black text-xl active:scale-95 transition-transform shadow-2xl shadow-red-200"
            >
              完成并关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireForm;
