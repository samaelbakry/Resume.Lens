export interface ResumeTip {
  type: string;
  tip: string;
}

export interface ResumeCategory {
  score: number;
  tips: ResumeTip[];
}

export interface ResumeFeedback {
  overallScore: number;
  ATS: ResumeCategory;
  content: ResumeCategory;
  skills: ResumeCategory;
  experience: ResumeCategory;
  formatting: ResumeCategory;
}