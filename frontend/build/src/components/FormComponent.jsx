import React from "react";

const FormComponent = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  options = [],
}) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            className="form-control"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows="4"
          />
        );
      case "select":
        return (
          <select
            className="form-control"
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
          >
            <option value="">Select...</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            className="form-control"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default FormComponent;
