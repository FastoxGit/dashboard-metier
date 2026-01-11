import React from "react";

export default function FiltersBar({
  q,
  status,
  carrier,
  sort,
  onChangeQ,
  onChangeStatus,
  onChangeCarrier,
  onChangeSort,
  onReset,
  statusOptions,
  carrierOptions,
}) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-lg-4">
            <label className="form-label">Recherche</label>
            <input
              className="form-control"
              placeholder="ID, client, ville, événement…"
              value={q}
              onChange={(e) => onChangeQ(e.target.value)}
            />
          </div>

          <div className="col-md-4 col-lg-2">
            <label className="form-label">Statut</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => onChangeStatus(e.target.value)}
            >
              <option value="">Tous</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 col-lg-2">
            <label className="form-label">Transporteur</label>
            <select
              className="form-select"
              value={carrier}
              onChange={(e) => onChangeCarrier(e.target.value)}
            >
              <option value="">Tous</option>
              {carrierOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 col-lg-2">
            <label className="form-label">Tri</label>
            <select
              className="form-select"
              value={sort}
              onChange={(e) => onChangeSort(e.target.value)}
            >
              <option value="updatedAt_desc">MAJ récente</option>
              <option value="updatedAt_asc">MAJ ancienne</option>
              <option value="eta_asc">ETA proche</option>
              <option value="eta_desc">ETA lointaine</option>
              <option value="items_desc">Nb articles ↓</option>
              <option value="items_asc">Nb articles ↑</option>
            </select>
          </div>

          <div className="col-lg-2 d-grid">
            <button className="btn btn-outline-dark" onClick={onReset} type="button">
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}