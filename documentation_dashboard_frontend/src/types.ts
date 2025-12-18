export type DocumentationType = "api" | "user-guide" | "dev-guide" | "architecture" | "runbook" | "other";

export interface Project {
  id: string;
  name: string;
}

export interface CoveragePoint {
  /** ISO date string */
  date: string;
  /** 0..100 */
  coveragePct: number;
}

export interface FreshnessPoint {
  /** ISO date string */
  date: string;
  /** number of docs updated on that date */
  updates: number;
}

export type ProblemType = "missing" | "obsolete";

export interface DocumentationProblem {
  id: string;
  type: ProblemType;
  section: string;
  docType: DocumentationType;
  severity: "low" | "medium" | "high";
  lastUpdated?: string;
  summary?: string;
}

export interface MetricsResponse {
  projectId: string;
  projectName?: string;

  /** 0..100 */
  coveragePct: number;
  missingCount: number;
  obsoleteCount: number;

  /** ISO string */
  lastUpdatedAt?: string;

  coverageOverTime: CoveragePoint[];
  freshnessOverTime: FreshnessPoint[];

  problems: DocumentationProblem[];
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  impact: "low" | "medium" | "high";
  effort: "low" | "medium" | "high";
  cta?: {
    label: string;
    href?: string;
  };
}

export interface SuggestionsResponse {
  projectId: string;
  suggestions: Suggestion[];
}

export type Filters = {
  docType: DocumentationType | "all";
  showMissing: boolean;
  showObsolete: boolean;
  severity: "all" | "low" | "medium" | "high";
  search: string;
};
