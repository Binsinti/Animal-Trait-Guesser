import React from "react";

const Loader = ({ size = "lg", variant = "primary", text = "" }) => {
  const sizeClass = size === "sm" ? "spinner-border-sm" : "";

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div
        className={`spinner-border text-${variant} ${sizeClass}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  );
};

export default Loader;
