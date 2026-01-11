import React from "react";

const MAP = {
  Ready: "secondary",
  "In Transit": "primary",
  Delivered: "success",
  Delayed: "warning",
  Issue: "danger",
};

export default function StatusBadge({ status }) {
  const variant = MAP[status] || "secondary";
  return <span className={`badge text-bg-${variant}`}>{status}</span>;
}