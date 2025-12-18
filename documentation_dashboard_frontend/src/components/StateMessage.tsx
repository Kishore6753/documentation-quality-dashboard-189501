import React from "react";

type Props = {
  title: string;
  description?: string;
  kind?: "info" | "error";
  action?: React.ReactNode;
};

export function StateMessage({ title, description, kind = "info", action }: Props) {
  const pillClass = kind === "error" ? "pill pillError" : "pill pillPrimary";

  return (
    <div className="panel">
      <div className="panelHeader">
        <div className="panelTitle">{title}</div>
        <span className={pillClass}>{kind === "error" ? "Error" : "Info"}</span>
      </div>
      <div className="panelBody">
        {description ? <div className="muted" style={{ lineHeight: 1.45 }}>{description}</div> : null}
        {action ? <div style={{ marginTop: 12 }}>{action}</div> : null}
      </div>
    </div>
  );
}
