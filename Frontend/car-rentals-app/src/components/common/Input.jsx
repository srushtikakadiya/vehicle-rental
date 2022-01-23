import React from "react";

const Input = ({ label, name, value, type, error, handleChange }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        value={value}
        type={type}
        name={name}
        onChange={handleChange}
        placeholder={name === 'rentalDays' ? 'enter number 1-100' : name}
        className="form-control"
      ></input>
      {error && <div className="alert alert-danger">{error}</div>}
      {name === "email" ? (
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      ) : null}
    </div>
  );
};

export default Input;
