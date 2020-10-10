import LoadingIndicator from "../LoadingIndicator";
import { useContext, useEffect } from "react";
import { ActionsContext } from "../../pages/app";
import useNotifications from "../../utils/hooks/useNotifications";

const { default: Modal } = require("./Modal");

const NotificationsModal = ({ onClose }) => {
  const {
    areNotificationsFetched,
    notifications,
    fetchNotifications,
  } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const { showPostModal } = useContext(ActionsContext);

  return (
    <Modal onClose={onClose} modalClassname="notifications-modal">
      <div className="alert">
        <div className="modal-title">Notifications</div>
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
    </Modal>
  );
};

export default NotificationsModal;
