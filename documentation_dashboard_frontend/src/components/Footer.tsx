import React from "react";

type Props = {
  apiBaseUrl: string;
  status: string;
};

function InfoIcon({
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
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function CheckCircleIcon({
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function Footer({ apiBaseUrl, status }: Props) {
  return (
    <footer className="footer" aria-label="Footer status">
      <div className="footerInner">
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <InfoIcon className="icon iconSm iconMuted" aria-hidden={true} />
          <span>
            <span className="muted">Status:</span> {status}
          </span>
        </div>
        <div className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <CheckCircleIcon className="icon iconSm iconSuccess" aria-hidden={true} title="API base URL" />
          API base: <kbd>{apiBaseUrl}</kbd>
        </div>
      </div>
    </footer>
  );
}
