import c from "classnames";
import { CurrentUserContext } from "../pages/app";
import { useState, useContext, useRef, useEffect } from "react";
import UserMenu from "./UserMenu";

const UserProfileButton = () => {
  const [isActive, setIsActive] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const buttonRef = useRef();

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }
    const makeInactive = (e) =>
      e.target !== buttonRef.current &&
      !buttonRef.current.contains(e.target) &&
      setIsActive(false);
    window.addEventListener("click", makeInactive);
    return () => {
      window.removeEventListener("click", makeInactive);
    };
  }, []);

  if (!currentUser || !currentUser.firstName) {
    return null;
  }

  return (
    <div className="popover-menu-button-wrapper">
      <button
        className="button-wrapper"
        onClick={() => {
          setIsActive(true);
        }}
        ref={buttonRef}
      >
        <span
          className={c(
            "button icon-button button-secondary button-white profile-button",
            isActive && "active"
          )}
          tabIndex="-1"
        >
          <div
            className="profile-button-avatar"
            style={{
              backgroundImage:
                currentUser.avatarThumbUrl &&
                `url(${currentUser.avatarThumbUrl})`,
              backgroundColor: !currentUser.avatarThumbUrl
                ? currentUser.color
                : undefined,
            }}
          />
          {currentUser.firstName}
        </span>
      </button>
      {isActive && <UserMenu />}
    </div>
  );
};

export default UserProfileButton;
