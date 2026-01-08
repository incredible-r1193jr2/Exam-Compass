
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
}
