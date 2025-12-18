import React from "react";
import type { Filters } from "../types";

type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
};

export function SidebarFilters({ filters, onChange }: Props) {
  return (
    <aside className="panel" aria-label="Filters sidebar">
      <div className="panelHeader">
        <div className="panelTitle">Filters</div>
        <span className="pill">Live</span>
      </div>
      <div className="panelBody">
        <div className="stack">
          <div className="stack">
            <div className="small muted">Search sections</div>
            <input
              className="input"
              value={filters.search}
              placeholder="e.g. auth, runbook…"
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
            />
          </div>

          <div className="hr" />

          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={filters.showMissing}
              onChange={(e) => onChange({ ...filters, showMissing: e.target.checked })}
            />
            <span>
              Show <span className="pill pillPrimary">Missing</span>
            </span>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={filters.showObsolete}
              onChange={(e) => onChange({ ...filters, showObsolete: e.target.checked })}
            />
            <span>
              Show <span className="pill pillError">Obsolete</span>
            </span>
          </label>

          <div className="hr" />

          <div className="stack">
            <div className="small muted">Severity</div>
            <select
              className="select"
              value={filters.severity}
              onChange={(e) => onChange({ ...filters, severity: e.target.value as any })}
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="small muted" style={{ lineHeight: 1.4 }}>
            Tip: combine filters to focus on high-impact gaps, then tackle items in the suggestions panel.
          </div>
        </div>
      </div>
    </aside>
  );
}
