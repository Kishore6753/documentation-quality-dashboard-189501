import React, { useMemo } from "react";
import type { DocumentationProblem, Filters } from "../types";

type Props = {
  problems: DocumentationProblem[];
  filters: Filters;
};

function pillForType(type: "missing" | "obsolete") {
  return type === "missing" ? "pill pillPrimary" : "pill pillError";
}

function pillForSeverity(sev: "low" | "medium" | "high") {
  if (sev === "high") return "pill pillError";
  if (sev === "medium") return "pill pillPrimary";
  return "pill";
}

function includesCaseInsensitive(hay: string, needle: string) {
  return hay.toLowerCase().includes(needle.toLowerCase());
}

export function ProblemsList({ problems, filters }: Props) {
  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (!filters.showMissing && p.type === "missing") return false;
      if (!filters.showObsolete && p.type === "obsolete") return false;

      if (filters.docType !== "all" && p.docType !== filters.docType) return false;
      if (filters.severity !== "all" && p.severity !== filters.severity) return false;

      if (filters.search.trim()) {
        const q = filters.search.trim();
        const blob = `${p.section} ${p.summary ?? ""} ${p.docType} ${p.type} ${p.severity}`;
        if (!includesCaseInsensitive(blob, q)) return false;
      }

      return true;
    });
  }, [problems, filters]);

  return (
    <div className="panel" aria-label="Problems list">
      <div className="panelHeader">
        <div className="panelTitle">Missing / Obsolete Sections</div>
        <span className="pill">{filtered.length} shown</span>
      </div>
      <div className="panelBody">
        {filtered.length === 0 ? (
          <div className="muted small" style={{ lineHeight: 1.45 }}>
            No problems match the current filters. Try widening the scope or clearing the search.
          </div>
        ) : (
          <div className="list">
            {filtered.map((p) => (
              <div key={p.id} className="listItem">
                <div className="listItemTitleRow">
                  <div className="listItemTitle">{p.section}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span className={pillForType(p.type)}>{p.type === "missing" ? "Missing" : "Obsolete"}</span>
                    <span className={pillForSeverity(p.severity)}>{p.severity}</span>
                  </div>
                </div>

                <div className="listItemMeta">
                  <span className="pill">{p.docType}</span>
                  {p.lastUpdated ? <span className="pill">Last updated: {new Date(p.lastUpdated).toLocaleDateString()}</span> : null}
                </div>

                {p.summary ? <div className="listItemDesc">{p.summary}</div> : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
