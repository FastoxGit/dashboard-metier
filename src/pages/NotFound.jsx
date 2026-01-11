import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h1 className="h4">404</h1>
          <p className="text-muted mb-3">Page introuvable.</p>
          <Link className="btn btn-outline-dark" to="/">
            Retour dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}