import React from "react";

const EmptyState = ({
  icon = "💬",
  title = "Welcome!",
  message = "Get started by creating something new.",
  actionButton,
}) => {
  return (
    <div className="empty-state d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div className="mb-4" style={{ fontSize: "4rem" }}>
        {icon}
      </div>
      <h2 className="mb-3">{title}</h2>
      <p className="text-muted mb-4" style={{ maxWidth: "400px" }}>
        {message}
      </p>
      {actionButton && <div className="mt-2">{actionButton}</div>}
    </div>
  );
};

export default EmptyState;
