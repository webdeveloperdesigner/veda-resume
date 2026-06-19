export interface Rewrite {
  original: string;
  suggested: string;
  reason: string;
}

export interface ReviewResult {
  overallScore: number;
  categoryScores: {
    clarity: number;
    impact: number;
    atsCompatibility: number;
    structure: number;
  };
  summary: string;
  strengths: string[];
  weaknesses: string[];
  rewrites: Rewrite[];
  missingSections?: string[];
  industryFit?: string;
  skillGap?: string[];
}

export type AppState = 'idle' | 'loading' | 'result' | 'error';
