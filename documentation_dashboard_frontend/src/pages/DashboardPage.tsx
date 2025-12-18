import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchMetrics, fetchProjects, fetchSuggestions, getResolvedApiBaseUrl } from "../api";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MetricsOverview } from "../components/MetricsOverview";
import { ProblemsList } from "../components/ProblemsList";
import { SidebarFilters } from "../components/SidebarFilters";
import { SuggestionsPanel } from "../components/SuggestionsPanel";
import { StateMessage } from "../components/StateMessage";
import { ChartsSection } from "../components/ChartsSection";
import type { Filters, MetricsResponse, Project, SuggestionsResponse } from "../types";

function initialFilters(): Filters {
  return {
    docType: "all",
    showMissing: true,
    showObsolete: true,
    severity: "all",
    search: "",
  };
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState<string>("");

  const [filters, setFilters] = useState<Filters>(initialFilters());

  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionsResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastRefreshedAtRef = useRef<Date | null>(null);

  const apiBaseUrl = useMemo(() => getResolvedApiBaseUrl(), []);

  const statusText = useMemo(() => {
    if (loading) return "Loading…";
    if (refreshing) return "Refreshing…";
    if (error) return "Error";
    if (lastRefreshedAtRef.current) return `Updated ${lastRefreshedAtRef.current.toLocaleTimeString()}`;
    return "Ready";
  }, [loading, refreshing, error]);

  const loadAll = useCallback(
    async (nextProjectId?: string) => {
      const selected = nextProjectId ?? projectId;

      if (!selected) return;

      const controller = new AbortController();
      try {
        setError(null);
        setRefreshing(true);

        const [m, s] = await Promise.all([
          fetchMetrics(selected, { signal: controller.signal }),
          fetchSuggestions(selected, { signal: controller.signal }),
        ]);

        setMetrics(m);
        setSuggestions(s);
        lastRefreshedAtRef.current = new Date();
      } catch (e: any) {
        setError(e?.message ?? "Failed to load dashboard data.");
      } finally {
        setRefreshing(false);
      }

      return () => controller.abort();
    },
    [projectId]
  );

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function init() {
      try {
        setError(null);
        setLoading(true);

        const projs = await fetchProjects({ signal: controller.signal });
        if (!mounted) return;

        setProjects(projs);
        const first = projs[0]?.id ?? "";
        setProjectId(first);

        if (first) {
          const [m, s] = await Promise.all([
            fetchMetrics(first, { signal: controller.signal }),
            fetchSuggestions(first, { signal: controller.signal }),
          ]);

          if (!mounted) return;
          setMetrics(m);
          setSuggestions(s);
          lastRefreshedAtRef.current = new Date();
        }
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Failed to initialize.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  // Keep filters.docType in sync with header doc type selector
  const handleDocTypeChange = (docType: Filters["docType"]) => {
    setFilters((prev) => ({ ...prev, docType }));
  };

  const handleSelectProject = async (nextId: string) => {
    setProjectId(nextId);
    await loadAll(nextId);
  };

  if (loading) {
    return (
      <div className="appShell">
        <Header
          projects={projects.length ? projects : [{ id: "loading", name: "Loading…" }]}
          selectedProjectId={projectId || "loading"}
          onSelectProjectId={() => {}}
          docType={filters.docType}
          onChangeDocType={handleDocTypeChange}
          onRefresh={() => {}}
          isRefreshing={true}
          statusText="Loading…"
        />
        <main className="content">
          <StateMessage title="Loading dashboard…" description="Fetching projects, metrics, and suggestions." />
        </main>
        <Footer apiBaseUrl={apiBaseUrl} status="Loading…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="appShell">
        <Header
          projects={projects.length ? projects : [{ id: "none", name: "No projects" }]}
          selectedProjectId={projectId || (projects[0]?.id ?? "none")}
          onSelectProjectId={handleSelectProject}
          docType={filters.docType}
          onChangeDocType={handleDocTypeChange}
          onRefresh={() => loadAll()}
          isRefreshing={refreshing}
          statusText="Error"
        />
        <main className="content">
          <StateMessage
            title="We couldn't load the dashboard"
            kind="error"
            description={error}
            action={
              <button className="btn btnPrimary" onClick={() => loadAll()}>
                Retry
              </button>
            }
          />
        </main>
        <Footer apiBaseUrl={apiBaseUrl} status="Error" />
      </div>
    );
  }

  // Metrics may still be null if there were zero projects.
  if (!metrics) {
    return (
      <div className="appShell">
        <Header
          projects={projects.length ? projects : [{ id: "none", name: "No projects" }]}
          selectedProjectId={projectId || "none"}
          onSelectProjectId={handleSelectProject}
          docType={filters.docType}
          onChangeDocType={handleDocTypeChange}
          onRefresh={() => loadAll()}
          isRefreshing={refreshing}
          statusText={statusText}
        />
        <main className="content">
          <StateMessage
            title="No data available"
            description="No projects were returned from the API. Configure the backend or try again."
            action={
              <button className="btn btnPrimary" onClick={() => loadAll()}>
                Refresh
              </button>
            }
          />
        </main>
        <Footer apiBaseUrl={apiBaseUrl} status="No data" />
      </div>
    );
  }

  return (
    <div className="appShell">
      <Header
        projects={projects.length ? projects : [{ id: projectId, name: metrics.projectName ?? projectId }]}
        selectedProjectId={projectId}
        onSelectProjectId={handleSelectProject}
        docType={filters.docType}
        onChangeDocType={handleDocTypeChange}
        onRefresh={() => loadAll()}
        isRefreshing={refreshing}
        statusText={statusText}
      />

      <main className="content" aria-label="Dashboard content">
        <SidebarFilters filters={filters} onChange={setFilters} />

        <section className="main" aria-label="Main dashboard section">
          <MetricsOverview metrics={metrics} />
          <ChartsSection coverage={metrics.coverageOverTime} freshness={metrics.freshnessOverTime} />
          <ProblemsList problems={metrics.problems} filters={filters} />
        </section>

        <SuggestionsPanel suggestions={suggestions?.suggestions ?? []} />
      </main>

      <Footer apiBaseUrl={apiBaseUrl} status={statusText} />
    </div>
  );
}
