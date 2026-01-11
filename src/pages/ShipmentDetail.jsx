import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge.jsx";
import { fetchShipmentById } from "../services/shipmentsService.js";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("fr-FR");
}
function formatDateTime(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("fr-FR");
}

export default function ShipmentDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `${id} • Détail expédition`;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchShipmentById(id);
        setShipment(data);
      } catch (e) {
        setError(e.message || "Erreur");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-4">
        <div className="d-flex align-items-center gap-2">
          <div className="spinner-border spinner-border-sm" role="status" />
          <span className="text-muted">Chargement…</span>
        </div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Détail introuvable : {error}</div>
        <Link className="btn btn-outline-dark" to="/">
          ← Retour dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <h1 className="h4 mb-1">
            <span className="mono">{shipment.id}</span> — {shipment.customer}
          </h1>
          <div className="text-muted">
            {shipment.origin} → {shipment.destination}
          </div>
        </div>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-dark" to="/">
            ← Retour dashboard
          </Link>
          <a className="btn btn-dark" href="mailto:romain@email.com">
            Contacter
          </a>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h6 mb-0 text-uppercase text-muted">Résumé</h2>
                <StatusBadge status={shipment.status} />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="text-muted small">Transporteur</div>
                  <div className="fw-semibold">{shipment.carrier}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted small">ETA</div>
                  <div className="fw-semibold">{formatDate(shipment.eta)}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted small">Dernier événement</div>
                  <div className="fw-semibold">{shipment.lastEvent}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted small">Dernière mise à jour</div>
                  <div className="fw-semibold">{formatDateTime(shipment.updatedAt)}</div>
                </div>
              </div>

              <hr />

              <h3 className="h6 text-uppercase text-muted mb-2">Détails opérationnels</h3>
              <ul className="mb-0">
                <li>Client : <strong>{shipment.customer}</strong></li>
                <li>Trajet : <strong>{shipment.origin} → {shipment.destination}</strong></li>
                <li>Nombre d’articles : <strong>{shipment.items}</strong></li>
                <li>Priorité : <strong>{shipment.priority}</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="h6 text-uppercase text-muted">Actions</h2>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-dark" type="button" disabled>
                  Relancer transporteur (demo)
                </button>
                <button className="btn btn-outline-dark" type="button" disabled>
                  Ouvrir incident (demo)
                </button>
                <button className="btn btn-outline-dark" type="button" disabled>
                  Télécharger POD (demo)
                </button>
              </div>
              <div className="text-muted small mt-3">
                Dans une vraie app : ces boutons appelleraient une API.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}