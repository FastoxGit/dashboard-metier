import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import KPI from "../components/KPI.jsx";
import FiltersBar from "../components/FiltersBar.jsx";
import TablePagination from "../components/TablePagination.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { fetchShipments } from "../services/shipmentsService.js";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("fr-FR");
}

function formatDateTime(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("fr-FR");
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [shipments, setShipments] = useState([]);

  // filtres
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [carrier, setCarrier] = useState("");
  const [sort, setSort] = useState("updatedAt_desc");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    document.title = "Dashboard • Suivi d’expéditions";
    (async () => {
      setLoading(true);
      const data = await fetchShipments();
      setShipments(data);
      setLoading(false);
    })();
  }, []);

  // options filtres
  const statusOptions = useMemo(() => {
    return Array.from(new Set(shipments.map((s) => s.status))).sort();
  }, [shipments]);

  const carrierOptions = useMemo(() => {
    return Array.from(new Set(shipments.map((s) => s.carrier))).sort();
  }, [shipments]);

  // filtering + sorting
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = shipments.filter((s) => {
      const hay = [
        s.id,
        s.customer,
        s.carrier,
        s.status,
        s.origin,
        s.destination,
        s.lastEvent,
        s.priority,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQ = !query || hay.includes(query);
      const matchesStatus = !status || s.status === status;
      const matchesCarrier = !carrier || s.carrier === carrier;

      return matchesQ && matchesStatus && matchesCarrier;
    });

    const [field, dir] = sort.split("_");
    list.sort((a, b) => {
      const av = a[field];
      const bv = b[field];

      // dates
      if (field === "updatedAt" || field === "eta") {
        const ad = new Date(av).getTime();
        const bd = new Date(bv).getTime();
        return dir === "asc" ? ad - bd : bd - ad;
      }

      // numbers
      if (field === "items") {
        return dir === "asc" ? a.items - b.items : b.items - a.items;
      }

      return 0;
    });

    return list;
  }, [shipments, q, status, carrier, sort]);

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [q, status, carrier, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  // KPIs
  const kpis = useMemo(() => {
    const byStatus = (st) => filtered.filter((s) => s.status === st).length;
    const issues = filtered.filter((s) => s.status === "Issue" || s.status === "Delayed").length;
    return {
      total: filtered.length,
      inTransit: byStatus("In Transit"),
      delivered: byStatus("Delivered"),
      attention: issues,
    };
  }, [filtered]);

  function onReset() {
    setQ("");
    setStatus("");
    setCarrier("");
    setSort("updatedAt_desc");
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <h1 className="h3 mb-1">Suivi d’expéditions</h1>
          <div className="text-muted">
            Dashboard métier (projet vitrine) — filtres, tri, pagination, détail.
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-dark"
            onClick={() => window.location.reload()}
            type="button"
          >
            Rafraîchir
          </button>
          <a className="btn btn-dark" href="mailto:romain@email.com">
            Contacter
          </a>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <KPI label="Expéditions (filtrées)" value={kpis.total} hint="Selon les filtres actifs" />
        </div>
        <div className="col-md-3">
          <KPI label="En transit" value={kpis.inTransit} hint="À surveiller" />
        </div>
        <div className="col-md-3">
          <KPI label="Livrées" value={kpis.delivered} hint="Terminé" />
        </div>
        <div className="col-md-3">
          <KPI label="À traiter" value={kpis.attention} hint="Retard ou incident" />
        </div>
      </div>

      <FiltersBar
        q={q}
        status={status}
        carrier={carrier}
        sort={sort}
        onChangeQ={setQ}
        onChangeStatus={setStatus}
        onChangeCarrier={setCarrier}
        onChangeSort={setSort}
        onReset={onReset}
        statusOptions={statusOptions}
        carrierOptions={carrierOptions}
      />

      <div className="card border-0 shadow-sm mt-3">
        <div className="card-body">
          {loading ? (
            <div className="d-flex align-items-center gap-2">
              <div className="spinner-border spinner-border-sm" role="status" />
              <span className="text-muted">Chargement des expéditions…</span>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr className="text-muted">
                      <th>ID</th>
                      <th>Client</th>
                      <th>Trajet</th>
                      <th>Transporteur</th>
                      <th>Statut</th>
                      <th>ETA</th>
                      <th>MAJ</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((s) => (
                      <tr key={s.id}>
                        <td className="mono">{s.id}</td>
                        <td>
                          <div className="fw-semibold">{s.customer}</div>
                          <div className="text-muted small">
                            {s.items} article(s) • Priorité: {s.priority}
                          </div>
                        </td>
                        <td>
                          <div className="fw-semibold">
                            {s.origin} → {s.destination}
                          </div>
                          <div className="text-muted small">{s.lastEvent}</div>
                        </td>
                        <td>{s.carrier}</td>
                        <td>
                          <StatusBadge status={s.status} />
                        </td>
                        <td>{formatDate(s.eta)}</td>
                        <td className="text-muted small">{formatDateTime(s.updatedAt)}</td>
                        <td className="text-end">
                          <Link className="btn btn-outline-dark btn-sm" to={`/shipments/${s.id}`}>
                            Détail
                          </Link>
                        </td>
                      </tr>
                    ))}

                    {!pageItems.length && (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-4">
                          Aucun résultat avec ces filtres.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-3">
                <TablePagination
                  page={safePage}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={setPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}