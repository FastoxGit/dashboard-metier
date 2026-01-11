import React from "react";

export default function KPI({ label, value, hint }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="text-muted small">{label}</div>
        <div className="display-6 fw-bold">{value}</div>
        {hint && <div className="text-muted small mt-1">{hint}</div>}
      </div>
    </div>
  );
}