
import React, { useState, useEffect } from 'react';
import { PageType, PhonePageType, QRInteractionStatus, CustomerRecommendation, Activity, QuestionnaireResult } from './types';
import { MOCK_RECOMMENDATIONS, MOCK_ACTIVITIES, INITIAL_DATA_RESULTS } from './constants';
import FaceToFaceHome from './components/FaceToFaceHome';
import QRModal from './components/QRModal';
import ActivitySelection from './components/ActivitySelection';
import QuestionnairePreview from './components/QuestionnairePreview';
import QuestionnaireForm from './components/QuestionnaireForm';
import ActivityData from './components/ActivityData';
import PhoneSimulator from './components/PhoneSimulator';

const App: React.FC = () => {
  // Pad State
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.HOME);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activityResults, setActivityResults] = useState<QuestionnaireResult[]>(INITIAL_DATA_RESULTS);

  // Shared Interaction State (Real-time Linkage)
  const [qrInteraction, setQrInteraction] = useState<QRInteractionStatus>(QRInteractionStatus.IDLE);

  // Masks
  const maskName = (name: string) => name[0] + '*';
  const maskPhone = (phone: string) => phone.slice(0, 3) + '****' + phone.slice(-4);

  // Sync Logic: When phone authorizes, Pad advances
  useEffect(() => {
    if (qrInteraction === QRInteractionStatus.AUTHORIZED) {
      setTimeout(() => {
        setIsQRModalOpen(false);
        setCurrentPage(PageType.ACTIVITY_SELECTION);
        setQrInteraction(QRInteractionStatus.IDLE);
      }, 1500);
    }
  }, [qrInteraction]);

  const handleFinishQuestionnaire = (result: QuestionnaireResult) => {
    setActivityResults(prev => [result, ...prev]);
    setCurrentPage(PageType.DATA_REPORT);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 lg:p-8 gap-12 font-sans overflow-hidden">
      
      {/* PAD CONTAINER (Marketing Agent Side) */}
      <div className="relative w-[850px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl border-[12px] border-slate-800 flex flex-col overflow-hidden shrink-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-50"></div>
        
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {currentPage === PageType.HOME && (
            <FaceToFaceHome 
              recommendations={MOCK_RECOMMENDATIONS} 
              maskName={maskName}
              maskPhone={maskPhone}
              onInitiate={() => {
                setIsQRModalOpen(true);
                setQrInteraction(QRInteractionStatus.IDLE);
              }}
              onViewData={() => setCurrentPage(PageType.DATA_REPORT)}
            />
          )}

          {currentPage === PageType.ACTIVITY_SELECTION && (
            <ActivitySelection 
              activities={MOCK_ACTIVITIES}
              onSelectPreview={(act) => {
                setSelectedActivity(act);
                setCurrentPage(PageType.PREVIEW);
              }}
              onSelectFill={(act) => {
                setSelectedActivity(act);
                setCurrentPage(PageType.FILL);
              }}
              onBack={() => setCurrentPage(PageType.HOME)}
            />
          )}

          {currentPage === PageType.PREVIEW && selectedActivity && (
            <QuestionnairePreview 
              activity={selectedActivity}
              onStart={() => setCurrentPage(PageType.FILL)}
              onBack={() => setCurrentPage(PageType.ACTIVITY_SELECTION)}
            />
          )}

          {currentPage === PageType.FILL && selectedActivity && (
            <QuestionnaireForm 
              activity={selectedActivity}
              onComplete={handleFinishQuestionnaire}
              onClose={() => setCurrentPage(PageType.HOME)}
            />
          )}

          {currentPage === PageType.DATA_REPORT && (
            <ActivityData 
              results={activityResults}
              maskName={maskName}
              maskPhone={maskPhone}
              onBack={() => setCurrentPage(PageType.HOME)}
            />
          )}

          {isQRModalOpen && (
            <QRModal 
              status={qrInteraction}
              onClose={() => {
                setIsQRModalOpen(false);
                setQrInteraction(QRInteractionStatus.IDLE);
              }}
            />
          )}
        </div>
      </div>

      {/* IPHONE CONTAINER (Customer Side) */}
      <div className="relative w-[320px] h-[650px] bg-white rounded-[3rem] shadow-2xl border-[10px] border-slate-800 overflow-hidden shrink-0 flex flex-col">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
        </div>
        
        <PhoneSimulator 
          qrInteraction={qrInteraction}
          onScan={() => setQrInteraction(QRInteractionStatus.SCANNING)}
          onScanned={(success) => setQrInteraction(success ? QRInteractionStatus.SCANNED : QRInteractionStatus.REJECTED)}
          onAuthorize={(confirmed) => setQrInteraction(confirmed ? QRInteractionStatus.AUTHORIZED : QRInteractionStatus.REJECTED)}
          isPadShowingQR={isQRModalOpen}
        />
      </div>

      {/* Background Label */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 text-white/20 text-4xl font-black uppercase tracking-widest pointer-events-none">
        IVS 2.0 Depth Interview System
      </div>
    </div>
  );
};

export default App;
