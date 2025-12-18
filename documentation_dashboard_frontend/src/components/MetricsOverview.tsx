import React from "react";
import type { MetricsResponse } from "../types";

type Props = {
  metrics: MetricsResponse;
};

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
          <span>Coverage</span>
          <span className={coveragePillClass}>{metrics.coveragePct.toFixed(0)}%</span>
        </div>
        <div className="cardValue">{metrics.coveragePct.toFixed(0)}%</div>
        <div className="cardDelta">
          <span className="muted">Target:</span> <span className="pill">85%</span>
          <span className="muted">• Last updated:</span> <span className="pill">{formatDateTime(metrics.lastUpdatedAt)}</span>
        </div>
      </div>

      <div className="card">
        <div className="cardLabel">
          <span>Missing sections</span>
          <span className="pill pillPrimary">{metrics.missingCount}</span>
        </div>
        <div className="cardValue">{metrics.missingCount}</div>
        <div className="cardDelta">
          <span className="muted">Gaps reduce discoverability and onboarding speed.</span>
        </div>
      </div>

      <div className="card">
        <div className="cardLabel">
          <span>Obsolete sections</span>
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
