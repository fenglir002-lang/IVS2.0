
import React, { useState, useMemo } from 'react';
import { QuestionnaireResult } from '../types';

interface Props {
  results: QuestionnaireResult[];
  maskName: (n: string) => string;
  maskPhone: (p: string) => string;
  onBack: () => void;
}

const ActivityData: React.FC<Props> = ({ results, maskName, maskPhone, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedResult, setSelectedResult] = useState<QuestionnaireResult | null>(null);

  const filteredResults = useMemo(() => {
    return results
      .filter(r => 
        r.customerName.includes(searchTerm) || 
        r.phone.includes(searchTerm) ||
        r.enterprise.includes(searchTerm)
      )
      .sort((a, b) => {
        const timeA = new Date(a.submitTime).getTime();
        const timeB = new Date(b.submitTime).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [results, searchTerm, sortOrder]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white p-4 border-b flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-1 mr-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
        <h1 className="text-lg font-bold">参与活动数据</h1>
      </div>

      <div className="p-4 flex flex-col h-full overflow-hidden">
        {/* Search & Sort Bar */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="搜索姓名/手机号"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <button 
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="px-3 py-2 bg-white border rounded-lg text-sm flex items-center gap-1 text-gray-600"
          >
            排序 {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>

        {/* Data List */}
        <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow-inner border border-gray-100">
          {filteredResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p>未找到匹配数据</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredResults.map(res => (
                <div key={res.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-gray-800 mr-2">{res.customerName}</span>
                      <span className="text-xs text-gray-500">{res.phone}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{res.submitTime}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">企业：{res.enterprise}</div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded truncate max-w-[70%]">
                      {res.activityName}
                    </div>
                    <button 
                      onClick={() => setSelectedResult(res)}
                      className="text-blue-600 text-sm font-bold hover:underline"
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSelectedResult(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">问卷详情</h3>
              <button onClick={() => setSelectedResult(null)} className="text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded-lg">
                <div><label className="text-gray-400 text-xs">客户姓名</label><p className="font-medium">{selectedResult.customerName}</p></div>
                <div><label className="text-gray-400 text-xs">手机号码</label><p className="font-medium">{selectedResult.phone}</p></div>
                <div className="col-span-2"><label className="text-gray-400 text-xs">参与活动</label><p className="font-medium text-blue-600">{selectedResult.activityName}</p></div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-700 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-600 rounded"></div>
                  答案回显
                </h4>
                {Object.entries(selectedResult.answers).map(([qId, ans]) => (
                  <div key={qId} className="border-b border-gray-50 pb-3">
                    <p className="text-sm font-medium text-gray-800 mb-2">题目 {qId}</p>
                    <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                      {Array.isArray(ans) ? ans.join('、') : ans}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setSelectedResult(null)}
              className="mt-6 w-full py-3 bg-gray-100 text-gray-600 rounded-full font-bold active:bg-gray-200"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityData;
