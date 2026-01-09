
import React from 'react';
import { Activity } from '../types';
import { MOCK_QUESTIONS } from '../constants';

interface Props {
  activity: Activity;
  onStart: () => void;
  onBack: () => void;
}

const QuestionnairePreview: React.FC<Props> = ({ activity, onStart, onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-white p-4 border-b flex items-center sticky top-0 z-10">
        <button onClick={onBack} className="p-1 mr-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
        <h1 className="text-lg font-bold">问卷预览</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{activity.title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          欢迎参加我们的职域深度面访调研。本次问卷大约需要 3-5 分钟，您的宝贵意见将帮助我们为您及您的家人提供更精准的保险保障方案。
        </p>

        <div className="space-y-6">
          <h3 className="font-bold text-gray-700 border-l-4 border-blue-600 pl-3">问卷大纲</h3>
          {MOCK_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="pb-4 border-b border-gray-50 last:border-0">
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">{idx + 1}.</span>
                <div>
                  <p className="text-gray-800 font-medium">
                    {q.title}
                    {q.required && <span className="text-red-500 ml-1">*</span>}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {q.type === 'single' ? '[单选题]' : '[多选题]'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t bg-gray-50">
        <button 
          onClick={onStart}
          className="w-full py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
          填写此问卷
        </button>
      </div>
    </div>
  );
};

export default QuestionnairePreview;
