import type { MetricsResponse, Project, SuggestionsResponse } from "./types";

/**
 * Select API base URL from environment variables, with required priority:
 * 1) REACT_APP_API_BASE
 * 2) REACT_APP_BACKEND_URL
 * 3) window.location.origin
 */
function getApiBaseUrl(): string {
  const envBase =
    (process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.trim()) ||
    (process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.trim());

  if (envBase) return envBase.replace(/\/$/, "");
  return window.location.origin.replace(/\/$/, "");
}

const API_BASE = getApiBaseUrl();

type RequestOptions = {
  signal?: AbortSignal;
};

async function getJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal: options.signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}) for ${path}${text ? `: ${text}` : ""}`);
  }

  return (await res.json()) as T;
}

function seedProjects(): Project[] {
  return [
    { id: "project-alpha", name: "Project Alpha" },
    { id: "project-beta", name: "Project Beta" },
    { id: "project-gamma", name: "Project Gamma" },
  ];
}

function seedMetrics(projectId: string): MetricsResponse {
  const now = new Date();
  const days = (n: number) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000);

  const coverageOverTime = Array.from({ length: 12 }).map((_, i) => {
    const date = days((12 - i) * 7);
    const coveragePct = Math.max(40, Math.min(96, 55 + i * 3 + (i % 2 === 0 ? 2 : -1)));
    return { date: date.toISOString().slice(0, 10), coveragePct };
  });

  const freshnessOverTime = Array.from({ length: 14 }).map((_, i) => {
    const date = days((14 - i) * 3);
    const updates = Math.max(0, (i % 5) + (i % 3 === 0 ? 2 : 0));
    return { date: date.toISOString().slice(0, 10), updates };
  });

  const coveragePct = coverageOverTime[coverageOverTime.length - 1]?.coveragePct ?? 72;

  return {
    projectId,
    projectName: seedProjects().find((p) => p.id === projectId)?.name ?? "Unknown",
    coveragePct,
    missingCount: 6,
    obsoleteCount: 3,
    lastUpdatedAt: now.toISOString(),
    coverageOverTime,
    freshnessOverTime,
    problems: [
      {
        id: "p1",
        type: "missing",
        section: "API Authentication",
        docType: "api",
        severity: "high",
        summary: "No documented auth flow; developers are guessing tokens/headers.",
      },
      {
        id: "p2",
        type: "obsolete",
        section: "Deployment Runbook",
        docType: "runbook",
        severity: "medium",
        lastUpdated: days(90).toISOString(),
        summary: "Mentions deprecated CI steps and old environment names.",
      },
      {
        id: "p3",
        type: "missing",
        section: "Architecture Overview",
        docType: "architecture",
        severity: "medium",
        summary: "No system diagram or component interaction description.",
      },
      {
        id: "p4",
        type: "obsolete",
        section: "Local Setup",
        docType: "dev-guide",
        severity: "low",
        lastUpdated: days(45).toISOString(),
        summary: "Old Node version and missing new env vars.",
      },
    ],
  };
}

function seedSuggestions(projectId: string): SuggestionsResponse {
  return {
    projectId,
    suggestions: [
      {
        id: "s1",
        title: "Document authentication & error handling",
        description:
          "Add a short 'Auth' section and list error codes for the most used endpoints to reduce onboarding friction.",
        impact: "high",
        effort: "medium",
        cta: { label: "Create issue", href: "#" },
      },
      {
        id: "s2",
        title: "Add an architecture overview diagram",
        description:
          "Include a single diagram showing services, data stores, and key request flows; keep it updated quarterly.",
        impact: "high",
        effort: "high",
        cta: { label: "Open docs folder", href: "#" },
      },
      {
        id: "s3",
        title: "Refresh runbook references",
        description:
          "Update deployment steps to match current CI/CD and validate the rollback procedure with a dry run.",
        impact: "medium",
        effort: "low",
        cta: { label: "Review runbook", href: "#" },
      },
    ],
  };
}

// PUBLIC_INTERFACE
export async function fetchProjects(options: RequestOptions = {}): Promise<Project[]> {
  /** Fetch list of projects available for selection. */
  try {
    return await getJson<Project[]>("/projects", options);
  } catch (e) {
    // Backend may not be available yet; return seeded data to keep UI functional.
    return seedProjects();
  }
}

// PUBLIC_INTERFACE
export async function fetchMetrics(
  projectId: string,
  options: RequestOptions = {}
): Promise<MetricsResponse> {
  /** Fetch metrics for selected project. */
  try {
    return await getJson<MetricsResponse>(`/metrics?projectId=${encodeURIComponent(projectId)}`, options);
  } catch (e) {
    return seedMetrics(projectId);
  }
}

// PUBLIC_INTERFACE
export async function fetchSuggestions(
  projectId: string,
  options: RequestOptions = {}
): Promise<SuggestionsResponse> {
  /** Fetch actionable suggestions for selected project. */
  try {
    return await getJson<SuggestionsResponse>(
      `/suggestions?projectId=${encodeURIComponent(projectId)}`,
      options
    );
  } catch (e) {
    return seedSuggestions(projectId);
  }
}

// PUBLIC_INTERFACE
export function getResolvedApiBaseUrl(): string {
  /** Expose the resolved base URL for UI diagnostics. */
  return API_BASE;
}
