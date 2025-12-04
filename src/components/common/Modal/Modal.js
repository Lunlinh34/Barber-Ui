import React from "react";
import "./Modal.scss";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
