import { useUser } from "../utils/auth/useUser";
import useNotifications from "../utils/hooks/useNotifications";
import { ActionsContext } from "../pages/app";
import { useContext, useEffect } from "react";

const UserMenu = () => {
  const { logout } = useUser();

  const {
    areNotificationsFetched,
    notifications,
    hasUnreadNotifications,
    fetchNotifications,
  } = useNotifications();

  const { showNotificationsModal } = useContext(ActionsContext);

  useEffect(() => {
    if (areNotificationsFetched) {
      showNotificationsModal({
        areNotificationsFetched,
        notifications,
      });
    }
  }, [showNotificationsModal, areNotificationsFetched, notifications]);

  return (
    <div className="popover-menu user-menu">
      <div
        className="popover-menu-item"
        onClick={() => {
          showNotificationsModal({
            areNotificationsFetched: false,
            notifications: [],
          });
          fetchNotifications();
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ position: "relative" }}>
            {hasUnreadNotifications && <ZenIcon />}
            <img
              src="/icons/bell.svg"
              style={{ transform: "scale(1.05)" }}
              className="icon"
            />
          </span>
          <div>Notifications</div>
        </div>
      </div>
      <div className="popover-menu-item" onClick={logout}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/icons/logout.svg"
            style={{ transform: "scale(1.05)" }}
            className="icon"
          />
          <div>Log Out</div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
