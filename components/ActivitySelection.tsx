
import React, { useState } from 'react';
import { Activity } from '../types';

interface Props {
  activities: Activity[];
  onSelectPreview: (act: Activity) => void;
  onSelectFill: (act: Activity) => void;
  onBack: () => void;
}

const ActivitySelection: React.FC<Props> = ({ activities, onSelectPreview, onSelectFill, onBack }) => {
  const [activeList, setActiveList] = useState(activities.sort((a, b) => b.createTime - a.createTime));

  const handleAction = (act: Activity, action: 'preview' | 'fill') => {
    if (!act.isAvailable) {
      alert('该活动已下架，请重新选择');
      setActiveList(prev => prev.filter(a => a.id !== act.id));
      return;
    }
    if (action === 'preview') onSelectPreview(act);
    else onSelectFill(act);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-500">
      <div className="bg-white p-6 border-b flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 mr-4 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">选择职域面对面活动</h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto">
        <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-6">可供选择的在线活动</h2>
        
        {activeList.length === 0 ? (
          <div className="text-center py-20 text-slate-300">
            <svg className="w-20 h-20 mx-auto mb-4 opacity-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <p>暂无可用活动</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 pb-8">
            {activeList.map(act => (
              <div key={act.id} className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-[#D31145]/20 transition-all duration-500 hover:-translate-y-1 flex flex-col">
                <div className="h-44 bg-slate-200 relative overflow-hidden">
                  <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-800">
                    {act.questionCount} 题
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-800 text-lg mb-4 line-clamp-2 leading-tight h-14">{act.title}</h3>
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => handleAction(act, 'preview')}
                      className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                      预览
                    </button>
                    <button 
                      onClick={() => handleAction(act, 'fill')}
                      className="flex-1 py-3 bg-[#D31145] text-white rounded-xl text-sm font-bold shadow-lg shadow-red-100 hover:bg-[#b50e3b] transition-all"
                    >
                      开始面访
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitySelection;
