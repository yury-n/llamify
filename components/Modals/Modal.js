import { useRef } from "react";

const Modal = ({ onClose, children }) => {
  const modalOverlayRef = useRef();
  return (
    <div
      ref={modalOverlayRef}
      className="modal-overlay"
      onClick={(e) => {
        e.target === modalOverlayRef.current && onClose();
      }}
    >
      <div className="modal">
        <img className="modal-x" src="/icons/x.svg" onClick={() => onClose()} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
