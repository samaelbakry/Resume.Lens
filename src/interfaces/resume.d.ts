export interface ResumeAnalysis {
  id: string;
  resumePath: string;
  imagePath: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  feedback: unknown;
}

export interface FeedbackCategory {
  score: number;
  tips: string[];
}

export interface ResumeFeedback {
  overallScore: number;
  structure: FeedbackCategory;
  toneAndStyle: FeedbackCategory;
  ATS: FeedbackCategory;
  content: FeedbackCategory;
  skills: FeedbackCategory;
}