import { useEffect, useState } from "react";
import c from "classnames";
import { iOS } from "../../utils";

const SaveToHomeModal = () => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const modalClosed =
      localStorage.getItem("app.saveToHomeModalClosed") || false;

    if (iOS() && !modalClosed) {
      setTimeout(() => {
        setIsActive(true);
      }, 3000);
    }
  }, []);

  const closeModal = () => {
    setIsActive(false);
    localStorage.setItem("app.saveToHomeModalClosed", true);
  };

  return (
    <div
      className={c("modal-overlay save-to-home-overlay", isActive && "active")}
      style={{ opacity: isActive ? 1 : 0 }}
      onClick={closeModal}
    >
      <div className="modal save-to-home-modal">
        <img className="modal-x" src="/icons/x.svg" onClick={closeModal} />
        <div className="save-to-home-header">
          <img src="/images/logo.svg" />
          <div className="modal-title">Save to Home screen</div>
        </div>
        <div>
          Tap the <img src="/icons/ios-share.svg" className="ios-share-icon" />{" "}
          icon at the bottom of your browser and choose “Add to Home Screen”
        </div>
        <div className="form-buttons">
          <button className="button-wrapper" onClick={closeModal}>
            <span className="button button-secondary" tabIndex="-1">
              Okay
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveToHomeModal;
