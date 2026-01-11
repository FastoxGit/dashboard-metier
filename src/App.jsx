import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ShipmentDetail from "./pages/ShipmentDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Romain • Dashboard Métier
          </Link>
          <div className="ms-auto d-flex gap-2">
            <a
              className="btn btn-outline-dark btn-sm"
              href="https://github.com/FastoxGit"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn btn-dark btn-sm"
              href="https://www.linkedin.com/in/romain-joseph-81135a218/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipments/:id" element={<ShipmentDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-top bg-white">
        <div className="container py-4 small text-muted d-flex flex-column flex-md-row justify-content-between gap-2">
          <span>Projet vitrine — Dashboard “Suivi d’expéditions”</span>
          <span>React • Bootstrap • Filtres • Pagination • Détail</span>
        </div>
      </footer>
    </div>
  );
}