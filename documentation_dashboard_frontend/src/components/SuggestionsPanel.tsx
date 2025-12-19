import React from "react";
import type { Suggestion } from "../types";

type Props = {
  suggestions: Suggestion[];
};

function pillForImpact(impact: "low" | "medium" | "high") {
  if (impact === "high") return "pill pillError";
  if (impact === "medium") return "pill pillPrimary";
  return "pill";
}

function SunIcon({
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
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function ZapIcon({
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
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ArrowUpRightIcon({
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
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function SuggestionsPanel({ suggestions }: Props) {
  return (
    <aside className="panel" aria-label="Suggestions panel">
      <div className="panelHeader">
        <div className="panelTitle" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <SunIcon className="icon iconSm iconSuccess" aria-hidden={true} />
          Suggestions
        </div>
        <span className="pill pillSuccess">Actionable</span>
      </div>
      <div className="panelBody">
        {suggestions.length === 0 ? (
          <div className="muted small" style={{ lineHeight: 1.45 }}>
            No suggestions available. When the backend is connected, this panel will recommend next steps based on gaps
            and freshness.
          </div>
        ) : (
          <div className="list">
            {suggestions.map((s) => (
              <div className="listItem" key={s.id}>
                <div className="listItemTitleRow">
                  <div className="listItemTitle" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                    <ZapIcon className="icon iconSm iconSuccess" aria-hidden={true} title="Suggestion" />
                    {s.title}
                  </div>
                  <span className={pillForImpact(s.impact)} title="Impact">
                    impact: {s.impact}
                  </span>
                </div>

                <div className="listItemMeta">
                  <span className="pill">effort: {s.effort}</span>
                </div>

                <div className="listItemDesc">{s.description}</div>

                {s.cta?.label ? (
                  <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
                    {s.cta.href ? (
                      <a
                        className="btn"
                        href={s.cta.href}
                        onClick={(e) => s.cta?.href === "#" && e.preventDefault()}
                        aria-label={`Action: ${s.cta.label}`}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          {s.cta.label}
                          <ArrowUpRightIcon className="icon iconSm iconMuted" aria-hidden={true} />
                        </span>
                      </a>
                    ) : (
                      <button className="btn" type="button" aria-label={`Action: ${s.cta.label}`}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          {s.cta.label}
                          <ArrowUpRightIcon className="icon iconSm iconMuted" aria-hidden={true} />
                        </span>
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
