
import React, { useState } from 'react';
import { CustomerRecommendation } from '../types';

interface Props {
  recommendations: CustomerRecommendation[];
  maskName: (n: string) => string;
  maskPhone: (p: string) => string;
  onInitiate: () => void;
  onViewData: () => void;
}

const FaceToFaceHome: React.FC<Props> = ({ recommendations, maskName, maskPhone, onInitiate, onViewData }) => {
  const [list, setList] = useState(recommendations.slice(0, 5));
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setList(prev => [...prev, ...recommendations]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-[#D31145] text-white p-6 flex justify-between items-center sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-2">
            <span className="font-black italic text-2xl">AIA</span>
            <div className="w-[1px] h-6 bg-white/30 mx-2"></div>
            <span className="text-lg font-bold tracking-tight">职域面对面</span>
        </div>
        <div className="flex gap-4 text-sm opacity-80">
            <span>北京分公司</span>
            <span>张三营销员</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Banner with Premium Look */}
        <div className="w-full h-44 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600880212319-78d7e5226b7e?auto=format&fit=crop&q=80&w=800" 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8">
            <div className="text-white space-y-1">
                <h2 className="text-2xl font-black">深度面访 IVS 2.0</h2>
                <p className="text-white/80 text-sm">专业化营销活动管理系统</p>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-800 font-black flex items-center gap-2">
                <span className="w-2 h-5 bg-[#D31145] rounded-full"></span>
                客户推荐列表
            </h3>
            <span className="text-xs text-slate-400">共 {recommendations.length} 条推荐数据</span>
          </div>

          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
              <svg className="w-16 h-16 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <p>暂无推荐客户</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">客户姓名 / 手机号</th>
                    <th className="px-6 py-4">对应企业 / 活动名称</th>
                    <th className="px-6 py-4 text-right">WSM日期</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {list.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-800">{maskName(item.name)}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{maskPhone(item.phone)}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-slate-700 font-semibold">{item.enterprise}</div>
                        <div className="text-[#D31145] text-xs font-medium mt-0.5">{item.activityName}</div>
                      </td>
                      <td className="px-6 py-5 text-right text-xs text-slate-400 font-mono">
                        {item.wsmDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button 
                onClick={loadMore}
                disabled={loading}
                className="w-full py-4 text-[#D31145] text-sm font-bold border-t border-slate-50 hover:bg-slate-50 transition-colors disabled:text-slate-300"
              >
                {loading ? '努力加载中...' : '加载更多推荐客户'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-slate-100 flex gap-6 z-20">
        <button 
          onClick={onInitiate}
          className="flex-[2] bg-[#D31145] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-200 active:scale-95 hover:bg-[#b50e3b] transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
          发起职域面对面
        </button>
        <button 
          onClick={onViewData}
          className="flex-1 bg-white border-2 border-slate-200 text-slate-600 py-5 rounded-2xl font-bold active:scale-95 hover:bg-slate-50 hover:border-slate-300 transition-all"
        >
          参与活动数据
        </button>
      </div>
    </div>
  );
};

export default FaceToFaceHome;
