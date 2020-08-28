import c from "classnames";
import { useState, useRef, useEffect } from "react";

const NotificationsButton = () => {
  const buttonRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const hasNewNotifications = false;
  useEffect(() => {
    const makeInactive = (e) =>
      e.target !== buttonRef.current &&
      !buttonRef.current.contains(e.target) &&
      setIsActive(false);
    window.addEventListener("click", makeInactive);
    return () => {
      window.removeEventListener("click", makeInactive);
    };
  }, []);
  return (
    <div className="notifications-button-wrapper">
      <button
        ref={buttonRef}
        className="button-wrapper"
        aria-label="Notifcations"
        data-balloon-pos="down"
        onClick={() => setIsActive(true)}
      >
        <span
          className={c(
            "button icon-button button-secondary button-white",
            isActive && "active"
          )}
          tabIndex="-1"
        >
          {hasNewNotifications && (
            <svg
              className="new-notifications-icon"
              viewBox="0 0 18 18"
              id="zen-star--inline"
            >
              <path
                fill="currentColor"
                d="M17 9.24194V8.75806C14.1121 8.58296 12.478 8.20496 11.1214 6.87857C9.79504 5.52203 9.41704 3.88792 9.24194 1H8.75806C8.58296 3.88792 8.20496 5.52203 6.87857 6.87857C5.52203 8.20496 3.88792 8.58296 1 8.75806V9.24194C3.88792 9.41704 5.52203 9.79504 6.87857 11.1214C8.20496 12.478 8.58296 14.1121 8.75806 17H9.24194C9.41704 14.1121 9.79504 12.478 11.1214 11.1214C12.478 9.79504 14.1121 9.41704 17 9.24194Z"
              ></path>
            </svg>
          )}
          <svg
            style={{ transform: "scale(1.15)" }}
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="bell"
            className="svg-inline--fa fa-bell fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M439.39 362.29c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71zM67.53 368c21.22-27.97 44.42-74.33 44.53-159.42 0-.2-.06-.38-.06-.58 0-61.86 50.14-112 112-112s112 50.14 112 112c0 .2-.06.38-.06.58.11 85.1 23.31 131.46 44.53 159.42H67.53zM224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64z"
            ></path>
          </svg>
        </span>
      </button>
      {isActive && (
        <div className="notifications-popover">
          <div className="notification">
            <div
              className="notification-thumb"
              style={{
                backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/llamify.appspot.com/o/posts%2FkwxmofFGMFeC1qYzFPLebNKmq2k1%2Fthumb%2FkwxmofFGMFeC1qYzFPLebNKmq2k1%2F-MFVlvFTZQVrniuSKuM1.png?alt=media&token=1c84d0d7-ba4c-4587-81ba-7e875a2c4700)`,
              }}
            />
            <div className="comment">
              <div className="comment-body">
                <span className="comment-author-name">Yury</span>
                <span>
                  That's a pretty awesome car here pretty awesome car here
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsButton;
