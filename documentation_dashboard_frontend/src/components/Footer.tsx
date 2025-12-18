import React from "react";

type Props = {
  apiBaseUrl: string;
  status: string;
};

export function Footer({ apiBaseUrl, status }: Props) {
  return (
    <footer className="footer" aria-label="Footer status">
      <div className="footerInner">
        <div>
          <span className="muted">Status:</span> {status}
        </div>
        <div className="muted">
          API base: <kbd>{apiBaseUrl}</kbd>
        </div>
      </div>
    </footer>
  );
}
