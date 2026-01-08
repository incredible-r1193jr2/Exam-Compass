
import { Exam, ExamStream, StudyResource, Question, Milestone } from './types';

export const EXAMS: Exam[] = [
  {
    id: '1',
    name: 'Joint Entrance Examination',
    shortName: 'JEE Main',
    stream: ExamStream.ENGINEERING,
    difficulty: 'Hard',
    nextDate: '2026-04-10',
    applicants: 1250000,
    seats: 55000,
    description: 'Premier engineering entrance for IITs, NITs, and top technical institutes in India.',
    cutoffTrends: [{ year: 2025, score: 93 }, { year: 2024, score: 91 }, { year: 2023, score: 90 }],
    outcomes: {
      colleges: ['IIT Bombay', 'IIT Delhi', 'NIT Trichy', 'IIIT Hyderabad'],
      careers: ['Software Engineer', 'Data Scientist', 'Research Scientist']
    },
    syllabusHighlights: ['Mechanics & Electrodynamics', 'Organic & Physical Chemistry', 'Calculus & Algebra']
  },
  {
    id: '2',
    name: 'National Eligibility cum Entrance Test',
    shortName: 'NEET UG',
    stream: ExamStream.MEDICAL,
    difficulty: 'Hard',
    nextDate: '2026-05-03',
    applicants: 2500000,
    seats: 108000,
    description: 'The single-window entrance exam for all medical (MBBS/BDS) seats in India.',
    cutoffTrends: [{ year: 2025, score: 722 }, { year: 2024, score: 720 }, { year: 2023, score: 715 }],
    outcomes: {
      colleges: ['AIIMS Delhi', 'MAMC', 'KGMU Lucknow', 'CMC Vellore'],
      careers: ['Cardiologist', 'Surgeon', 'Medical Researcher']
    },
    syllabusHighlights: ['Human Physiology & Genetics', 'Plant Physiology', 'Chemical Bonding']
  },
  {
    id: '3',
    name: 'Union Public Service Commission',
    shortName: 'UPSC CSE',
    stream: ExamStream.CIVIL_SERVICES,
    difficulty: 'Very Hard',
    nextDate: '2026-05-31',
    applicants: 1100000,
    seats: 1050,
    description: 'Recruitment for IAS, IPS, and IFS cadres of the Government of India.',
    cutoffTrends: [{ year: 2025, score: 98 }, { year: 2024, score: 95 }, { year: 2023, score: 92 }],
    outcomes: {
      colleges: ['LBSNAA (Training)', 'SVPNPA (Training)'],
      careers: ['IAS Officer', 'IPS Officer', 'Diplomat (IFS)']
    },
    syllabusHighlights: ['Indian Polity & History', 'Ethics & Aptitude', 'Geography & Environment']
  },
  {
    id: '4',
    name: 'Common Law Admission Test',
    shortName: 'CLAT',
    stream: ExamStream.LAW,
    difficulty: 'Moderate',
    nextDate: '2025-12-07',
    applicants: 80000,
    seats: 3500,
    description: 'Admission to 22 National Law Universities in India.',
    cutoffTrends: [{ year: 2025, score: 102 }, { year: 2024, score: 98 }, { year: 2023, score: 95 }],
    outcomes: {
      colleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'WBNUJS Kolkata'],
      careers: ['Corporate Lawyer', 'Judge (Judiciary)', 'Legal Consultant']
    },
    syllabusHighlights: ['Legal Reasoning', 'Current Affairs & GK', 'Critical Reasoning']
  },
  {
    id: '5',
    name: 'Undergraduate Common Entrance Examination for Design',
    shortName: 'UCEED',
    stream: ExamStream.DESIGN,
    difficulty: 'Moderate',
    nextDate: '2026-01-18',
    applicants: 15000,
    seats: 200,
    description: 'Admission to Bachelor of Design (B.Des) programmes at IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad and IIITDM Jabalpur.',
    cutoffTrends: [],
    outcomes: {
      colleges: ['IIT Bombay', 'IIT Delhi', 'IIT Guwahati'],
      careers: ['Product Designer', 'UX/UI Designer', 'Interaction Designer']
    },
    syllabusHighlights: ['Visualization and Spatial Ability', 'Observation and Design Sensitivity', 'Analytical and Logical Reasoning'],
    isComingSoon: true
  },
  {
    id: '6',
    name: 'National Defence Academy',
    shortName: 'NDA',
    stream: ExamStream.DEFENCE,
    difficulty: 'Hard',
    nextDate: '2026-04-12',
    applicants: 400000,
    seats: 400,
    description: 'The Joint Services academy of the Indian Armed Forces, where cadets of the three services train together.',
    cutoffTrends: [],
    outcomes: {
      colleges: ['National Defence Academy (Khadakwasla)'],
      careers: ['Army Officer', 'Navy Officer', 'Air Force Officer']
    },
    syllabusHighlights: ['Mathematics', 'General Ability Test', 'English'],
    isComingSoon: true
  }
];

export const MILESTONES: Milestone[] = [];

export const STUDY_RESOURCES: StudyResource[] = [
  { id: 'r1', title: 'Organic Chemistry Masterclass', type: 'Video', subject: 'Chemistry', rating: 4.8, url: '#' },
  { id: 'r2', title: 'HCV Physics Solutions', type: 'Book', subject: 'Physics', rating: 4.9, url: '#' },
  { id: 'r3', title: 'Calculus Cheat Sheet', type: 'Notes', subject: 'Mathematics', rating: 4.5, url: '#' }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'What is the limit of (sin x)/x as x approaches 0?',
    options: ['0', '1', 'Infinity', 'Undefined'],
    correctOption: 1,
    explanation: 'Using standard trigonometric limits.',
    subject: 'Mathematics',
    topic: 'Limits'
  }
];
