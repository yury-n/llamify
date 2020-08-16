import { useRef, useEffect } from "react";

const Modal = ({ onClose, children }) => {
  const modalOverlayRef = useRef();
  const modalRef = useRef();
  useEffect(() => {
    const modalRect = modalRef.current.getBoundingClientRect();
    const modalAspectRatio = modalRect.width / modalRect.height;
    let newHeight;
    let newWidth;
    console.log({ modalRect });
    if (modalRect.height > window.innerHeight) {
      newHeight = window.innerHeight - 140;
      newWidth = newHeight * modalAspectRatio;
    } else if (modalRect.width > window.innerWidth) {
      newWidth = window.innerWidth - 140;
      newHeight = newWidth / modalAspectRatio;
    }
    console.log({ newWidth, newHeight });
    if (newWidth || newHeight) {
      modalRef.current.style.width = `${newWidth}px`;
      modalRef.current.style.height = `${newHeight}px`;
    }
  }, []);
  return (
    <div
      ref={modalOverlayRef}
      className="modal-overlay"
      onClick={(e) => {
        e.target === modalOverlayRef.current && onClose();
      }}
    >
      <div ref={modalRef} className="modal">
        <img className="modal-x" src="/icons/x.svg" onClick={() => onClose()} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
