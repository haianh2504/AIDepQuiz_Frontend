export type SubscaleKey = "emotional" | "functional" | "cognitive" | "control";
export type CategoryKey = "low" | "moderate" | "high";

export interface LikertLabel {
  value: number;
  text: string;
}

export interface LikertScale {
  min: 1;
  max: 5;
  type: "likert";
  labels: LikertLabel[];
}

export interface LikertOption {
  optionId: string;
  value: number;
  text: string;
}

export interface QuizQuestion {
  questionId: string;
  questionNumber: number;
  subscale: SubscaleKey;
  subscaleLabel: string;
  text: string;
  options: LikertOption[];
}

export interface ScoreRange {
  min: number;
  max: number;
}

export interface CategoryRange {
  key: CategoryKey;
  label: string;
  minMean: number;
  maxMean: number;
}

export interface ScoringRules {
  itemCount: 16;
  scoringMethod: "mean";
  totalRange: ScoreRange;
  meanRange: ScoreRange;
  displayDecimals: 2;
  reverseScoredItems: false;
  categoryRanges: CategoryRange[];
}

export interface QuizDefinitionResponse {
  testSlug: "ai-dependence";
  testVersion: string;
  locale: "vi-VN";
  title: string;
  questionCount: 16;
  scale: LikertScale;
  questions: QuizQuestion[];
  scoring: ScoringRules;
}

export interface Answer {
  questionId: string;
  value: number;
}

export interface SubmitQuizRequest {
  testVersion: string;
  answers: Answer[];
}

export interface OverallScore {
  totalScore: number;
  maxTotalScore: 80;
  mean: number;
  displayMean: string;
}

export interface Category {
  key: CategoryKey;
  label: string;
  description: string;
}

export interface SubscaleScore {
  key: SubscaleKey;
  label: string;
  mean: number;
  displayMean: string;
}

export interface SubmitQuizResponse {
  testSlug: "ai-dependence";
  testVersion: string;
  locale: "vi-VN";
  score: OverallScore;
  category: Category;
  subscales: SubscaleScore[];
  feedback: string;
  advice: string[];
  limitations: string[];
}

export interface ApiErrorPayload {
  error?: {
    code?: string;
    message?: string;
    details?: Array<{
      field?: string;
      reason?: string;
      expected?: string | number;
      received?: string | number;
    }>;
  };
}

