import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";

// PUBLIC_INTERFACE
export default function App() {
  /** App entry component providing routes for the documentation dashboard. */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* Alias route for future expansion */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route
          path="*"
          element={
            <div className="appShell">
              <main className="content">
                <div className="panel">
                  <div className="panelHeader">
                    <div className="panelTitle">Not found</div>
                    <span className="pill pillError">404</span>
                  </div>
                  <div className="panelBody">
                    <div className="muted" style={{ lineHeight: 1.45 }}>
                      The page you requested does not exist. Go back to the dashboard.
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <a className="btn btnPrimary" href="/">
                        Go to dashboard
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
