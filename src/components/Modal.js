import React from 'react';
import './Modal.css'; // Ensure the CSS is imported

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <button onClick={onClose} className="modal-close">×</button> {/* Ensure it's a proper close icon */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
