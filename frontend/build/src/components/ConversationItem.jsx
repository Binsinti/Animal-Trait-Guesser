import React from "react";

const ConversationItem = ({
  title,
  message,
  timestamp,
  isActive = false,
  onClick,
  unreadCount = 0,
  avatar,
}) => {
  return (
    <div
      className={`conversation-item p-3 border-bottom ${
        isActive ? "bg-light" : ""
      } ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="d-flex align-items-start">
        {avatar && (
          <div className="me-3">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              {avatar}
            </div>
          </div>
        )}
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            <h6 className="mb-1 fw-bold">{title}</h6>
            {timestamp && (
              <small className="text-muted">{timestamp}</small>
            )}
          </div>
          <p className="mb-0 text-muted small text-truncate">{message}</p>
        </div>
        {unreadCount > 0 && (
          <span className="badge bg-primary rounded-pill ms-2">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
