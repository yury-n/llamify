import LoadingIndicator from "../LoadingIndicator";
import { useContext } from "react";
import { ActionsContext } from "../../pages/app";

const { default: Modal } = require("./Modal");

const NotificationsModal = ({
  areNotificationsFetched,
  notifications,
  onClose,
}) => {
  const { showPostModal } = useContext(ActionsContext);
  return (
    <Modal onClose={onClose} modalClassname="notifications-modal">
      <div class="alert">
        <div class="modal-title">Notifications</div>
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
