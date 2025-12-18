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

export function SuggestionsPanel({ suggestions }: Props) {
  return (
    <aside className="panel" aria-label="Suggestions panel">
      <div className="panelHeader">
        <div className="panelTitle">Suggestions</div>
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
                  <div className="listItemTitle">{s.title}</div>
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
                      <a className="btn" href={s.cta.href} onClick={(e) => s.cta?.href === "#" && e.preventDefault()}>
                        {s.cta.label}
                      </a>
                    ) : (
                      <button className="btn" type="button">
                        {s.cta.label}
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
