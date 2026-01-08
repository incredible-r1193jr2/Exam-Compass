
export enum ExamStream {
  ENGINEERING = 'Engineering',
  MEDICAL = 'Medical',
  CIVIL_SERVICES = 'Civil Services',
  LAW = 'Law',
  MANAGEMENT = 'Management',
  BANKING = 'Banking',
  DESIGN = 'Design',
  DEFENCE = 'Defence'
}

export interface Exam {
  id: string;
  name: string;
  shortName: string;
  stream: ExamStream;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
  nextDate: string;
  applicants: number;
  seats: number;
  description: string;
  cutoffTrends: { year: number; score: number }[];
  outcomes: {
    colleges: string[];
    careers: string[];
  };
  syllabusHighlights: string[];
  isComingSoon?: boolean;
}

export interface StudyResource {
  id: string;
  title: string;
  type: 'Video' | 'Notes' | 'Book' | 'Link';
  subject: string;
  rating: number;
  url: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  subject: string;
  topic: string;
}

export interface Timeline {
  id: string;
  eventName: string;
  date: string;
  description: string;
  type: 'registration' | 'admit-card' | 'exam' | 'result' | 'counselling';
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Milestone {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  date: string;
  type: 'achievement' | 'study-log' | 'milestone';
  category?: 'Revision' | 'Problem Solving' | 'New Concepts' | 'Mock Test';
  duration?: string;
  likedBy?: string[];
  commentList?: Array<{ user: string; text: string; date: string }>;
}

export interface PastPaper {
  id: string;
  examId: string;
  year: number;
  set: number;
  url: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  questionsCount: number;
}

export interface UserProgress {
  questionsSolved: number;
  correctAnswers: number;
  accuracy: number;
  lastActive: string;
  streakDays: number;
  topicsCompleted: number;
}
