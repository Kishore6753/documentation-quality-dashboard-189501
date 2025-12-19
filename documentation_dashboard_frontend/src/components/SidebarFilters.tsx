import React from "react";
import type { Filters } from "../types";

type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
};

function FilterIcon({
  className,
  title,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  title?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={ariaHidden ? "presentation" : "img"}
      aria-hidden={ariaHidden}
    >
      {title ? <title>{title}</title> : null}
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SearchIcon({
  className,
  title,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  title?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={ariaHidden ? "presentation" : "img"}
      aria-hidden={ariaHidden}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function AlertTriangleIcon({
  className,
  title,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  title?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={ariaHidden ? "presentation" : "img"}
      aria-hidden={ariaHidden}
    >
      {title ? <title>{title}</title> : null}
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ShieldIcon({
  className,
  title,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  title?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={ariaHidden ? "presentation" : "img"}
      aria-hidden={ariaHidden}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function SidebarFilters({ filters, onChange }: Props) {
  return (
    <aside className="panel" aria-label="Filters sidebar">
      <div className="panelHeader">
        <div className="panelTitle" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <FilterIcon className="icon iconSm iconPrimary" aria-hidden={true} />
          Filters
        </div>
        <span className="pill">Live</span>
      </div>
      <div className="panelBody">
        <div className="stack">
          <div className="stack">
            <div className="small muted" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <SearchIcon className="icon iconSm iconMuted" aria-hidden={true} />
              Search sections
            </div>
            <input
              className="input"
              value={filters.search}
              placeholder="e.g. auth, runbook…"
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              aria-label="Search sections"
            />
          </div>

          <div className="hr" />

          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={filters.showMissing}
              onChange={(e) => onChange({ ...filters, showMissing: e.target.checked })}
              aria-label="Toggle missing sections"
            />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <AlertTriangleIcon className="icon iconSm iconPrimary" aria-hidden={true} title="Missing" />
              Show <span className="pill pillPrimary">Missing</span>
            </span>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={filters.showObsolete}
              onChange={(e) => onChange({ ...filters, showObsolete: e.target.checked })}
              aria-label="Toggle obsolete sections"
            />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <AlertTriangleIcon className="icon iconSm" aria-hidden={true} title="Obsolete" />
              Show <span className="pill pillError">Obsolete</span>
            </span>
          </label>

          <div className="hr" />

          <div className="stack">
            <div className="small muted" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <ShieldIcon className="icon iconSm iconMuted" aria-hidden={true} />
              Severity
            </div>
            <select
              className="select"
              value={filters.severity}
              onChange={(e) => onChange({ ...filters, severity: e.target.value as any })}
              aria-label="Select severity"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="small muted" style={{ lineHeight: 1.4, display: "inline-flex", gap: 8, alignItems: "center" }}>
            <FilterIcon className="icon iconSm iconMuted" aria-hidden={true} />
            Tip: combine filters to focus on high-impact gaps, then tackle items in the suggestions panel.
          </div>
        </div>
      </div>
    </aside>
  );
}
