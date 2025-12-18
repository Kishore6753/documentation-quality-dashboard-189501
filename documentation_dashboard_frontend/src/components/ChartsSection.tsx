import React from "react";
import type { CoveragePoint, FreshnessPoint } from "../types";

type Props = {
  coverage: CoveragePoint[];
  freshness: FreshnessPoint[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function buildPolyline(points: Array<{ x: number; y: number }>): string {
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

function Sparkline({
  values,
  color,
  yMin,
  yMax,
  unitLabel,
  ariaLabel,
}: {
  values: number[];
  color: string;
  yMin: number;
  yMax: number;
  unitLabel?: string;
  ariaLabel: string;
}) {
  const w = 640;
  const h = 200;
  const padX = 16;
  const padY = 16;

  const n = Math.max(1, values.length);
  const xStep = (w - padX * 2) / Math.max(1, n - 1);

  const mapped = values.map((v, i) => {
    const x = padX + i * xStep;
    const norm = (clamp(v, yMin, yMax) - yMin) / Math.max(1e-9, yMax - yMin);
    const y = padY + (1 - norm) * (h - padY * 2);
    return { x, y, v };
  });

  const line = buildPolyline(mapped);
  const last = mapped[mapped.length - 1];

  return (
    <div className="sparkline" role="img" aria-label={ariaLabel}>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none">
        {/* grid */}
        <line x1={padX} y1={h - padY} x2={w - padX} y2={h - padY} stroke="rgba(229,231,235,0.16)" />
        <line x1={padX} y1={padY} x2={w - padX} y2={padY} stroke="rgba(229,231,235,0.10)" />
        <line x1={padX} y1={h / 2} x2={w - padX} y2={h / 2} stroke="rgba(229,231,235,0.10)" />

        {/* area */}
        <path
          d={`M ${padX} ${h - padY} L ${line} L ${w - padX} ${h - padY} Z`}
          fill={color}
          opacity={0.10}
        />

        {/* line */}
        <polyline points={line} fill="none" stroke={color} strokeWidth={2.5} />

        {/* last point */}
        {last ? <circle cx={last.x} cy={last.y} r={4.5} fill={color} /> : null}

        {/* labels */}
        <text x={padX} y={h - 6} className="axisText">
          {yMin}
          {unitLabel ?? ""}
        </text>
        <text x={padX} y={12} className="axisText">
          {yMax}
          {unitLabel ?? ""}
        </text>
      </svg>
    </div>
  );
}

export function ChartsSection({ coverage, freshness }: Props) {
  const coverageValues = coverage.map((p) => p.coveragePct);
  const freshValues = freshness.map((p) => p.updates);

  const freshMax = Math.max(1, ...freshValues);

  return (
    <div className="panel" aria-label="Charts section">
      <div className="panelHeader">
        <div className="panelTitle">Trends</div>
        <span className="pill">Last {Math.max(coverage.length, freshness.length)} points</span>
      </div>
      <div className="panelBody">
        <div className="chartsGrid">
          <div className="chartWrap">
            <div className="chartTitleRow">
              <div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Coverage over time</div>
                <div className="small muted">Percent of required docs present</div>
              </div>
              <span className="pill pillPrimary">Coverage</span>
            </div>
            <Sparkline
              values={coverageValues}
              color="var(--color-primary)"
              yMin={0}
              yMax={100}
              unitLabel="%"
              ariaLabel="Coverage over time chart"
            />
          </div>

          <div className="chartWrap">
            <div className="chartTitleRow">
              <div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Freshness</div>
                <div className="small muted">Updates per time bucket</div>
              </div>
              <span className="pill pillSuccess">Freshness</span>
            </div>
            <Sparkline
              values={freshValues}
              color="var(--color-success)"
              yMin={0}
              yMax={freshMax + 1}
              ariaLabel="Freshness updates chart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
