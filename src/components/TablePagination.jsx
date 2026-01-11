import React from "react";

export default function TablePagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
      <div className="text-muted small">
        Page <strong>{page}</strong> / {totalPages} — <strong>{total}</strong> résultat(s)
      </div>
      <div className="btn-group">
        <button
          className="btn btn-outline-dark btn-sm"
          disabled={!canPrev}
          onClick={() => onPageChange(1)}
        >
          «
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          disabled={!canPrev}
          onClick={() => onPageChange(page - 1)}
        >
          Précédent
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
        >
          Suivant
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          disabled={!canNext}
          onClick={() => onPageChange(totalPages)}
        >
          »
        </button>
      </div>
    </div>
  );
}