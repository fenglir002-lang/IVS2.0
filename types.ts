
export enum PageType {
  HOME = 'home',
  ACTIVITY_SELECTION = 'activity_selection',
  PREVIEW = 'preview',
  FILL = 'fill',
  DATA_REPORT = 'data_report'
}

export enum PhonePageType {
  SCANNER = 'scanner',
  AUTH = 'auth',
  SUCCESS = 'success',
  FAIL = 'fail'
}

export enum QRInteractionStatus {
  IDLE = 'idle',
  SCANNING = 'scanning',
  SCANNED = 'scanned',
  AUTHORIZED = 'authorized',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface CustomerRecommendation {
  id: string;
  name: string;
  phone: string;
  wsmDate: string;
  enterprise: string;
  activityName: string;
}

export interface Activity {
  id: string;
  title: string;
  image: string;
  questionCount: number;
  isAvailable: boolean;
  createTime: number;
}

export interface Question {
  id: number;
  type: 'single' | 'multiple';
  title: string;
  options: string[];
  required: boolean;
}

export interface QuestionnaireResult {
  id: string;
  customerName: string;
  phone: string;
  enterprise: string;
  activityName: string;
  submitTime: string;
  answers: Record<number, string | string[]>;
}
