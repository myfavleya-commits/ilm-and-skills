export type Category =
  | 'Foundations'
  | 'Office Productivity'
  | 'Languages and Communication'
  | 'Technology and Content'
  | 'Teaching and Professional Practice';

export type Course = {
  id: string;
  title: string;
  shortTitle: string;
  category: Category;
  description: string;
  relevance: string;
  prerequisites: string[];
  objectives: string[];
  lessons: { title: string; detail: string }[];
  practice: string;
  miniProject: { title: string; description: string };
  completion: string[];
  nextCourse: string;
  icon: string;
  phase: string;
  optional?: boolean;
};

export type RoadmapStage = {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  prerequisites: string;
  learns: string;
  steps: string[];
  activity: string;
  output: string;
  assessment: string;
  next: string;
  courseIds: string[];
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  creates: string;
  skills: string[];
  evaluation: string[];
  courseId: string;
  preview:
    'document' | 'spreadsheet' | 'slides' | 'website' | 'plan' | 'classroom';
};

export type Pathway = 'web' | 'content' | 'teaching';
