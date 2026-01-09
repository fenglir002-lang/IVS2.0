
import { CustomerRecommendation, Activity, Question, QuestionnaireResult } from './types';

export const MOCK_RECOMMENDATIONS: CustomerRecommendation[] = [
  { id: '1', name: '张伟', phone: '13812345678', wsmDate: '2023-10-12', enterprise: '字节跳动', activityName: '职场精英保障计划' },
  { id: '2', name: '李芳', phone: '13987654321', wsmDate: '2023-11-05', enterprise: '腾讯科技', activityName: '高管健康关怀' },
  { id: '3', name: '王强', phone: '13700001111', wsmDate: '2023-11-15', enterprise: '阿里巴巴', activityName: '员工福利普惠' },
  { id: '4', name: '赵敏', phone: '15011112222', wsmDate: '2023-12-01', enterprise: '百度集团', activityName: '家庭资产配置' },
  { id: '5', name: '孙悟空', phone: '13366667777', wsmDate: '2023-12-20', enterprise: '花果山科技', activityName: '长寿健康保险' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'act1', title: '职域保障需求调研(2024夏季版)', image: 'https://picsum.photos/seed/act1/400/200', questionCount: 5, isAvailable: true, createTime: 1715000000 },
  { id: 'act2', title: '养老风险深度评估专项调查', image: 'https://picsum.photos/seed/act2/400/200', questionCount: 8, isAvailable: true, createTime: 1714000000 },
  { id: 'act3', title: '少儿教育储备金需求摸底', image: 'https://picsum.photos/seed/act3/400/200', questionCount: 4, isAvailable: true, createTime: 1713000000 },
  { id: 'act4', title: '已过期下架活动示例', image: 'https://picsum.photos/seed/act4/400/200', questionCount: 10, isAvailable: false, createTime: 1712000000 },
];

export const MOCK_QUESTIONS: Question[] = [
  { id: 1, type: 'single', title: '您目前主要的理财偏好是什么？', options: ['银行储蓄', '股票基金', '商业保险', '不动产投资'], required: true },
  { id: 2, type: 'multiple', title: '您关注保险产品的哪些方面？（多选）', options: ['公司品牌', '保障范围', '理赔速度', '增值服务', '保费高低'], required: true },
  { id: 3, type: 'single', title: '您认为理想的年交保费占家庭收入的比例是多少？', options: ['5%以内', '5%-10%', '10%-20%', '20%以上'], required: true },
  { id: 4, type: 'single', title: '您近期是否有增加重疾保障的计划？', options: ['已有且足够', '已有但考虑加保', '暂无但想了解', '完全不考虑'], required: false },
];

export const INITIAL_DATA_RESULTS: QuestionnaireResult[] = [
  { 
    id: 'res1', 
    customerName: '周*', 
    phone: '135****4444', 
    enterprise: '顺丰速运', 
    activityName: '职域保障需求调研', 
    submitTime: '2024-01-15',
    answers: { 1: '商业保险', 2: ['公司品牌', '理赔速度'] }
  }
];
