import React from "react";

const Message = ({ variant = "info", children, dismissible = false, onClose }) => {
  const alertClass = `alert alert-${variant} ${dismissible ? "alert-dismissible fade show" : ""}`;

  return (
    <div className={alertClass} role="alert">
      {children}
      {dismissible && onClose && (
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
};

export default Message;
