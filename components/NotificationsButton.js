import c from "classnames";
import { useState, useRef, useEffect, useContext } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { ActionsContext } from "../pages/app";
import useNotifications from "../utils/hooks/useNotifications";
import ZenIcon from "./Icons/ZenIcon";

const NotificationsButton = () => {
  const { showPostModal } = useContext(ActionsContext);
  const buttonRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const {
    areNotificationsFetched,
    notifications,
    hasUnreadNotifications,
    fetchNotifications,
  } = useNotifications();

  useEffect(() => {
    if (isActive && !areNotificationsFetched) {
      fetchNotifications();
    }
  }, [fetchNotifications, isActive, areNotificationsFetched]);

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
    <div className="popover-menu-button-wrapper" style={{ marginRight: 6 }}>
      <button
        ref={buttonRef}
        className="button-wrapper"
        onClick={() => setIsActive(!isActive)}
      >
        <span
          className={c(
            "button icon-button button-secondary button-white",
            isActive && "active"
          )}
          tabIndex="-1"
        >
          {hasUnreadNotifications && <ZenIcon />}
          <svg
            style={{ transform: "scale(1.25)" }}
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
        <div className="popover-menu notifications-menu">
          {!areNotificationsFetched && (
            <div className="popover-menu-loading-wrapper">
              <LoadingIndicator />
            </div>
          )}
          {areNotificationsFetched && notifications.length === 0 && (
            <div className="popover-menu-empty-state">
              No notifications yet{" "}
              <span style={{ fontSize: 22, marginLeft: 8 }}>🍬</span>
            </div>
          )}
          {areNotificationsFetched &&
            notifications.length > 0 &&
            notifications.map((notification) => (
              <div
                key={notification.notificationId}
                className="popover-menu-item"
                onClick={() => showPostModal(notification.post)}
              >
                <div
                  className="notification-thumb"
                  style={{
                    backgroundImage: `url(${notification.post.thumbImageUrl})`,
                  }}
                />
                <div className="comment">
                  <div className="comment-body">
                    <span className="comment-author-name">
                      {notification.comment.author.firstName}
                    </span>
                    <span>{notification.comment.content}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsButton;
