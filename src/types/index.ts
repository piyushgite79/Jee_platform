export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Test {
  id: string;
  title: string;
  subject: 'physics' | 'chemistry' | 'mathematics';
  difficulty: 1 | 2 | 3;
  totalQuestions: number;
  duration: number; // in minutes
  createdAt: Date;
  completedAt?: Date;
  score?: number;
}

export interface Question {
  id: string;
  testId: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  chapter: string;
  difficulty: 1 | 2 | 3;
  userAnswer?: number;
  isMarkedForReview?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number;
}

export interface UserStats {
  totalTests: number;
  averageScore: number;
  subjectsCompleted: string[];
  currentStreak: number;
  bestStreak: number;
  totalPoints: number;
  level: number;
}