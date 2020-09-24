import { useEffect, useState } from "react";
import c from "classnames";
import { iOS, isMobile } from "../../utils";

let deferredPrompt;

const SaveToHomeModal = () => {
  const [mode, setMode] = useState(false);
  useEffect(() => {
    const modalClosed =
      localStorage.getItem("app.saveToHomeModalClosed") || false;

    if (isMobile() && iOS() && !modalClosed) {
      setTimeout(() => {
        setMode("iOS");
      }, 10000);
    }
    const onBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

  const closeModal = () => {
    setMode(false);
    localStorage.setItem("app.saveToHomeModalClosed", true);
  };

  const showInstallPromptAndCloseModal = () => {
    deferredPrompt && deferredPrompt.prompt();
    closeModal();
  };

  return (
    <div
      className={c(
        "modal-overlay save-to-home-overlay",
        mode && "active",
        mode
      )}
      style={{ opacity: mode ? 1 : 0 }}
      onClick={closeModal}
    >
      <div className="modal save-to-home-modal">
        <img className="modal-x" src="/icons/x.svg" onClick={closeModal} />
        <div className="save-to-home-header">
          <img src="/images/logo.svg" />
          <div className="modal-title">Save to Home screen</div>
        </div>
        {mode === "iOS" && (
          <div>
            Tap the{" "}
            <img src="/icons/ios-share.svg" className="ios-share-icon" /> icon
            at the bottom of your browser and choose “Add to Home Screen”
          </div>
        )}
        {mode === "android" && (
          <div>
            Add the App to your Home Screen and browse updates at a comfortable
            pace.
          </div>
        )}
        <div className="form-buttons">
          {mode === "iOS" && (
            <button className="button-wrapper" onClick={closeModal}>
              <span className="button button-secondary" tabIndex="-1">
                Okay
              </span>
            </button>
          )}
          {mode === "android" && (
            <>
              <button
                className="button-wrapper"
                onClick={showInstallPromptAndCloseModal}
              >
                <span className="button button-primary" tabIndex="-1">
                  Save
                </span>
              </button>
              <button className="button-wrapper" onClick={closeModal}>
                <span className="button button-secondary" tabIndex="-1">
                  Close
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveToHomeModal;
