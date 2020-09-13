import { useEffect, useState } from "react";
import c from "classnames";

const SaveToHomeModal = () => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 3000);
  }, []);

  return (
    <div
      className={c("modal-overlay save-to-home-overlay", isActive && "active")}
      style={{ opacity: isActive ? 1 : 0 }}
      onClick={() => setIsActive(false)}
    >
      <div className="modal save-to-home-modal">
        <img
          className="modal-x"
          src="/icons/x.svg"
          onClick={() => setIsActive(false)}
        />
        <div className="save-to-home-header">
          <img src="/images/logo.svg" />
          <div class="modal-title">Save to Home screen</div>
        </div>
        <div>
          Tap the <img src="/icons/ios-share.svg" className="ios-share-icon" />{" "}
          icon at the bottom of your browser and choose “Add to Home Screen”
        </div>
      </div>
    </div>
  );
};

export default SaveToHomeModal;
