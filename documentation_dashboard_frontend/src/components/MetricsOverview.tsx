import React from "react";
import type { MetricsResponse } from "../types";

type Props = {
  metrics: MetricsResponse;
};

function PieChartIcon({
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
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function ClockIcon({
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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

function formatDateTime(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export function MetricsOverview({ metrics }: Props) {
  const coveragePillClass =
    metrics.coveragePct >= 85 ? "pill pillSuccess" : metrics.coveragePct >= 70 ? "pill pillPrimary" : "pill pillError";

  return (
    <div className="cardsGrid" aria-label="Metrics overview">
      <div className="card">
        <div className="cardLabel">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <PieChartIcon className="icon iconSm iconPrimary" aria-hidden={true} title="Coverage" />
            Coverage
          </span>
          <span className={coveragePillClass}>{metrics.coveragePct.toFixed(0)}%</span>
        </div>
        <div className="cardValue">{metrics.coveragePct.toFixed(0)}%</div>
        <div className="cardDelta">
          <span className="muted">Target:</span> <span className="pill">85%</span>
          <span className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <ClockIcon className="icon iconSm iconMuted" aria-hidden={true} title="Last updated" /> Last updated:
          </span>
          <span className="pill">{formatDateTime(metrics.lastUpdatedAt)}</span>
        </div>
      </div>

      <div className="card">
        <div className="cardLabel">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <AlertTriangleIcon className="icon iconSm iconPrimary" aria-hidden={true} title="Missing sections" />
            Missing sections
          </span>
          <span className="pill pillPrimary">{metrics.missingCount}</span>
        </div>
        <div className="cardValue">{metrics.missingCount}</div>
        <div className="cardDelta">
          <span className="muted">Gaps reduce discoverability and onboarding speed.</span>
        </div>
      </div>

      <div className="card">
        <div className="cardLabel">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <AlertTriangleIcon className="icon iconSm" aria-hidden={true} title="Obsolete sections" />
            Obsolete sections
          </span>
          <span className="pill pillError">{metrics.obsoleteCount}</span>
        </div>
        <div className="cardValue">{metrics.obsoleteCount}</div>
        <div className="cardDelta">
          <span className="muted">Stale docs cause incidents and repeated questions.</span>
        </div>
      </div>
    </div>
  );
}
