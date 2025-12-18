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
          <div className="brandMark" aria-hidden="true" />
          <div>
            <div className="brandTitle">Documentation Quality</div>
            <div className="brandSub">Coverage • Freshness • Gaps</div>
          </div>
        </div>

        <div className="headerControls">
          <div className="controlGroup" aria-label="Project selector">
            <span className="controlLabel">Project</span>
            <select
              className="select"
              value={selectedProjectId}
              onChange={(e) => onSelectProjectId(e.target.value)}
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="controlGroup" aria-label="Documentation type selector">
            <span className="controlLabel">Type</span>
            <select className="select" value={docType} onChange={(e) => onChangeDocType(e.target.value as any)}>
              {DOC_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btnPrimary" onClick={onRefresh} disabled={!!isRefreshing}>
            {isRefreshing ? "Refreshing…" : "Refresh"}
          </button>

          <span className="badge" title="Last refresh status">
            {statusText ?? "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
}
