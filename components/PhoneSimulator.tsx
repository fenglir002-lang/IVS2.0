
import React, { useState, useEffect } from 'react';
import { PhonePageType, QRInteractionStatus } from '../types';

interface Props {
  qrInteraction: QRInteractionStatus;
  onScan: () => void;
  onScanned: (success: boolean) => void;
  onAuthorize: (confirmed: boolean) => void;
  isPadShowingQR: boolean;
}

const PhoneSimulator: React.FC<Props> = ({ qrInteraction, onScan, onScanned, onAuthorize, isPadShowingQR }) => {
  const [phonePage, setPhonePage] = useState<PhonePageType>(PhonePageType.SCANNER);

  // Reset phone when QR modal closes on Pad
  useEffect(() => {
    if (!isPadShowingQR) {
      setPhonePage(PhonePageType.SCANNER);
    }
  }, [isPadShowingQR]);

  const handleScanClick = () => {
    onScan();
    // Simulate network delay for verification
    setTimeout(() => {
      const isEligible = Math.random() > 0.2; // 80% success rate for demo
      if (isEligible) {
        onScanned(true);
        setPhonePage(PhonePageType.AUTH);
      } else {
        onScanned(false);
        setPhonePage(PhonePageType.FAIL);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative animate-in fade-in duration-500">
      {/* Phone Header (Mocking WeChat/Browser) */}
      <div className="bg-[#f2f2f2] px-4 pt-8 pb-3 flex items-center border-b border-slate-200">
        <div className="text-xs font-bold text-slate-800">职域面对面活动参与</div>
      </div>

      <div className="flex-1 flex flex-col p-6 items-center justify-center text-center">
        {phonePage === PhonePageType.SCANNER && (
          <div className="space-y-6 flex flex-col items-center">
            <div className={`w-40 h-40 bg-white border-2 border-dashed border-slate-300 rounded-3xl flex items-center justify-center mb-4 transition-all ${isPadShowingQR ? 'border-red-500 bg-red-50 scale-105' : ''}`}>
              {qrInteraction === QRInteractionStatus.SCANNING ? (
                 <div className="relative w-full h-full p-4 overflow-hidden rounded-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 shadow-[0_0_15px_rgba(211,17,69,0.5)] animate-bounce"></div>
                    <svg className="w-full h-full text-red-100" fill="currentColor" viewBox="0 0 24 24"><path d="M3 4V8H5V5H8V3H4C3.44772 3 3 3.44772 3 4ZM19 4V8H21V4C21 3.44772 20.5523 3 20 3H16V5H19ZM3 20V16H5V19H8V21H4C3.44772 21 3 20.5523 3 20ZM19 20V16H21V20C21 20.5523 20.5523 21 20 21H16V19H19Z"></path></svg>
                 </div>
              ) : (
                <svg className={`w-20 h-20 ${isPadShowingQR ? 'text-red-500' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                </svg>
              )}
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800 text-lg">扫码参与活动</h3>
              <p className="text-slate-400 text-sm">请将手机对准营销员Pad端的二维码</p>
            </div>
            
            <button 
              onClick={handleScanClick}
              disabled={!isPadShowingQR || qrInteraction === QRInteractionStatus.SCANNING}
              className={`mt-4 px-10 py-3 rounded-full font-bold shadow-xl transition-all active:scale-95 ${
                isPadShowingQR 
                ? 'bg-[#D31145] text-white shadow-red-200' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {qrInteraction === QRInteractionStatus.SCANNING ? '校验身份中...' : '模拟扫码'}
            </button>
          </div>
        )}

        {phonePage === PhonePageType.AUTH && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
             <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
             </div>
             <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-xl leading-snug">身份确认成功</h3>
                <p className="text-slate-500 text-sm px-4">您将参与面对面活动，请确认是否授权您的信息参与活动？</p>
             </div>
             <div className="flex flex-col gap-3 w-full px-4">
                <button 
                  onClick={() => {
                    onAuthorize(true);
                    setPhonePage(PhonePageType.SUCCESS);
                  }}
                  className="w-full py-4 bg-[#D31145] text-white rounded-xl font-bold shadow-lg shadow-red-100 active:scale-95 transition-transform"
                >
                  确认授权
                </button>
                <button 
                  onClick={() => {
                    onAuthorize(false);
                    setPhonePage(PhonePageType.SCANNER);
                  }}
                  className="w-full py-4 bg-white text-slate-500 border border-slate-200 rounded-xl font-bold active:bg-slate-50 transition-colors"
                >
                  取消
                </button>
             </div>
          </div>
        )}

        {phonePage === PhonePageType.SUCCESS && (
          <div className="animate-in zoom-in-95 duration-500">
             <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
             </div>
             <h3 className="font-bold text-slate-800 text-xl mb-2">感谢您参与</h3>
             <p className="text-slate-400 text-sm">请配合营销员在Pad端完成后续流程</p>
          </div>
        )}

        {phonePage === PhonePageType.FAIL && (
           <div className="animate-in shake duration-500">
             <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
             </div>
             <h3 className="font-bold text-slate-800 text-xl mb-2">暂不满足活动资格</h3>
             <p className="text-slate-400 text-sm mb-8">抱歉，您的身份校验未通过，请联系营销员了解详情</p>
             <button 
                onClick={() => setPhonePage(PhonePageType.SCANNER)}
                className="px-8 py-3 bg-slate-800 text-white rounded-full font-bold active:bg-slate-700 transition-colors"
              >
                返回
              </button>
           </div>
        )}
      </div>

      {/* Brand Footer */}
      <div className="p-8 flex justify-center opacity-20">
        <div className="text-[#D31145] font-black text-2xl italic">AIA</div>
      </div>
    </div>
  );
};

export default PhoneSimulator;
