import React from "react";
import type { DocumentationType, Project } from "../types";

type Props = {
  projects: Project[];
  selectedProjectId: string;
  onSelectProjectId: (projectId: string) => void;

  docType: DocumentationType | "all";
  onChangeDocType: (docType: DocumentationType | "all") => void;

  onRefresh: () => void;
  isRefreshing?: boolean;

  statusText?: string;
};

const DOC_TYPES: Array<{ value: DocumentationType | "all"; label: string }> = [
  { value: "all", label: "All docs" },
  { value: "api", label: "API" },
  { value: "user-guide", label: "User guide" },
  { value: "dev-guide", label: "Dev guide" },
  { value: "architecture", label: "Architecture" },
  { value: "runbook", label: "Runbook" },
  { value: "other", label: "Other" },
];

function LayoutIcon({
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
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </svg>
  );
}

function FolderIcon({
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
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FileTextIcon({
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function RefreshIcon({
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
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10" />
      <path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14" />
    </svg>
  );
}

export function Header({
  projects,
  selectedProjectId,
  onSelectProjectId,
  docType,
  onChangeDocType,
  onRefresh,
  isRefreshing,
  statusText,
}: Props) {
  return (
    <div className="topbar">
      <div className="topbarInner">
        <div className="brand" aria-label="Documentation Quality Dashboard">
          <span className="iconBadge" aria-hidden="true" title="Dashboard">
            <LayoutIcon className="icon iconLg" aria-hidden={true} />
          </span>
          <div>
            <div className="brandTitle">Documentation Quality</div>
            <div className="brandSub">Coverage • Freshness • Gaps</div>
          </div>
        </div>

        <div className="headerControls">
          <div className="controlGroup" aria-label="Project selector">
            <span className="controlLabel" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FolderIcon className="icon iconSm iconPrimary" aria-hidden={true} />
              Project
            </span>
            <select
              className="select"
              value={selectedProjectId}
              onChange={(e) => onSelectProjectId(e.target.value)}
              aria-label="Select project"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="controlGroup" aria-label="Documentation type selector">
            <span className="controlLabel" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FileTextIcon className="icon iconSm iconSuccess" aria-hidden={true} />
              Type
            </span>
            <select
              className="select"
              value={docType}
              onChange={(e) => onChangeDocType(e.target.value as any)}
              aria-label="Select documentation type"
            >
              {DOC_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btnPrimary" onClick={onRefresh} disabled={!!isRefreshing} aria-label="Refresh dashboard">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <RefreshIcon className="icon iconSm" aria-hidden={true} />
              {isRefreshing ? "Refreshing…" : "Refresh"}
            </span>
          </button>

          <span
            className="badge"
            title="Last refresh status"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <LayoutIcon className="icon iconSm iconMuted" aria-hidden={true} />
            {statusText ?? "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
}
