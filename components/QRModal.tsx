
import React, { useState, useEffect } from 'react';
import { QRInteractionStatus } from '../types';

interface Props {
  status: QRInteractionStatus;
  onClose: () => void;
}

const QRModal: React.FC<Props> = ({ status, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [qrId, setQrId] = useState(Math.random());

  useEffect(() => {
    if (status !== QRInteractionStatus.IDLE && status !== QRInteractionStatus.SCANNING) return;
    
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status]);

  const refreshQR = () => {
    setQrId(Math.random());
    setTimeLeft(60);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl p-10 shadow-2xl flex flex-col items-center relative scale-in-center">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800 mb-2">邀请客户参与活动</h2>
            <p className="text-slate-400 text-sm">请客户使用微信扫描下方二维码</p>
        </div>

        {/* QR Section */}
        <div className="relative w-72 h-72 bg-white p-3 border border-slate-100 rounded-[2rem] shadow-sm flex items-center justify-center group overflow-hidden">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ivs-v2-face-${qrId}`}
            alt="QR Code"
            className={`w-full h-full transition-all duration-700 ${
                status === QRInteractionStatus.SCANNED || 
                status === QRInteractionStatus.AUTHORIZED || 
                status === QRInteractionStatus.REJECTED || 
                status === QRInteractionStatus.SCANNING 
                ? 'scale-90 opacity-10 blur-sm' : 'scale-100 opacity-100'
            }`}
          />

          {/* Overlays based on phone interaction */}
          {status === QRInteractionStatus.SCANNING && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 animate-pulse">
                <div className="w-16 h-16 border-4 border-[#D31145] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[#D31145] font-black text-lg">客户识别中...</p>
            </div>
          )}

          {status === QRInteractionStatus.SCANNED && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50/80 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <p className="text-blue-700 font-bold">客户确认中</p>
                <p className="text-blue-500 text-xs mt-1">请提醒客户手机点击确认</p>
             </div>
          )}

          {status === QRInteractionStatus.AUTHORIZED && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-50/90 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-100">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <p className="text-green-700 font-black text-xl">验证成功</p>
                <p className="text-green-600 text-sm mt-1">正在进入活动流程...</p>
            </div>
          )}

          {status === QRInteractionStatus.REJECTED && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/90 animate-in shake">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <p className="text-red-700 font-bold">校验不通过</p>
                <button 
                    onClick={refreshQR}
                    className="mt-4 text-xs bg-white border border-red-200 text-red-600 px-4 py-2 rounded-full font-bold"
                >
                    点击重试
                </button>
             </div>
          )}
        </div>

        {timeLeft > 0 && status === QRInteractionStatus.IDLE && (
          <div className="mt-8 px-6 py-2 bg-slate-50 rounded-full text-slate-400 text-sm font-medium">
            有效时间剩余 <span className="text-[#D31145] font-black font-mono">{timeLeft}s</span>
          </div>
        )}

        <button 
          onClick={refreshQR}
          className="mt-8 text-sm font-bold text-slate-400 hover:text-slate-600 flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          重新生成二维码
        </button>
      </div>
    </div>
  );
};

export default QRModal;
