import c from "classnames";
import { useRef, useEffect, useState } from "react";

const Modal = ({
  width: widthProp,
  height: heightProp,
  onClose,
  children,
  modalClassname,
  overlayClassname,
}) => {
  const [size, setSize] = useState({
    width: widthProp,
    height: heightProp,
  });
  const modalOverlayRef = useRef();
  const modalRef = useRef();
  useEffect(() => {
    const modalAspectRatio = widthProp / heightProp;
    let newHeight;
    let newWidth;
    if (heightProp && heightProp > window.innerHeight - 140) {
      newHeight = window.innerHeight - 140;
      newWidth = newHeight * modalAspectRatio;
    } else if (widthProp && widthProp > window.innerWidth - 140) {
      newWidth = window.innerWidth - 140;
      newHeight = newWidth / modalAspectRatio;
    }
    console.log({ newWidth, newHeight });
    if (newWidth || newHeight) {
      setSize({
        width: newWidth,
        height: newHeight,
      });
    }
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keyup", handleEscapeKey);
    return () => {
      window.removeEventListener("keyup", handleEscapeKey);
    };
  }, []);
  return (
    <div
      ref={modalOverlayRef}
      className={c("modal-overlay", overlayClassname)}
      onClick={(e) => {
        e.target === modalOverlayRef.current && onClose();
      }}
    >
      <div ref={modalRef} className={c("modal", modalClassname)} style={size}>
        <img className="modal-x" src="/icons/x.svg" onClick={() => onClose()} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
