import { useUser } from "../utils/auth/useUser";
import useNotifications from "../utils/hooks/useNotifications";
import { ActionsContext } from "../pages/app";
import { useContext } from "react";
import EditIcon from "./Icons/EditIcon";
import InviteIcon from "./Icons/InviteIcon";

const UserMenu = ({ withNotifications }) => {
  const {
    showNotificationsModal,
    showInviteModal,
    showProfileEditModal,
  } = useContext(ActionsContext);
  const { logout } = useUser();

  const { hasUnreadNotifications, fetchNotifications } = useNotifications();

  return (
    <div className="popover-menu user-menu">
      <div
        className="popover-menu-item popover-menu-item-with-icon"
        onClick={showProfileEditModal}
      >
        <EditIcon className="icon" style={{ width: 20, marginRight: 11 }} />
        <div>Edit Profile</div>
      </div>
      <div
        className="popover-menu-item popover-menu-item-with-icon"
        onClick={showInviteModal}
      >
        <InviteIcon className="icon" style={{ width: 20, marginRight: 11 }} />
        <div>Invite</div>
      </div>
      {withNotifications && (
        <div
          className="popover-menu-item popover-menu-item-with-icon"
          onClick={() => {
            showNotificationsModal();
            fetchNotifications();
          }}
        >
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
      )}
      <div
        className="popover-menu-item popover-menu-item-with-icon"
        onClick={logout}
      >
        <img
          src="/icons/logout.svg"
          style={{ transform: "scale(1.05)" }}
          className="icon"
        />
        <div>Log Out</div>
      </div>
    </div>
  );
};

export default UserMenu;
