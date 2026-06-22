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
  missingKeywords: string[];
  improvementSuggestions: string[];
  fullyOptimizedResume: string;
  improvedScore: number;
  summaryOfChanges: string;
}

export type AppState = 'idle' | 'loading' | 'result' | 'error';
