import { ALL_SHIPMENTS } from "../data/shipments.js";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchShipments() {
  // simule un appel API
  await sleep(250);
  return ALL_SHIPMENTS;
}

export async function fetchShipmentById(id) {
  await sleep(150);
  const found = ALL_SHIPMENTS.find((s) => s.id === id);
  if (!found) throw new Error("Shipment not found");
  return found;
}