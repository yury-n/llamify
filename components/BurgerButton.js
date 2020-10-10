import c from "classnames";
import { useRef, useState, useEffect } from "react";
import BurgerIcon from "./Icons/BurgerIcon";
import ZenIcon from "./Icons/ZenIcon";
import UserMenu from "./UserMenu";
import useNotifications from "../utils/hooks/useNotifications";

const BurgerButton = () => {
  const buttonRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const { hasUnreadNotifications } = useNotifications();

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
    <>
      <div className="popover-menu-button-wrapper">
        <button
          className={c("button-wrapper burger-button")}
          ref={buttonRef}
          onClick={() => setIsActive(!isActive)}
        >
          <span
            className={c(
              "button icon-button button-secondary button-white",
              isActive && "active"
            )}
            tabIndex="-1"
          >
            {hasUnreadNotifications && !isActive && <ZenIcon />}
            <BurgerIcon />
          </span>
        </button>
        {isActive && <UserMenu withNotifications />}
      </div>
    </>
  );
};

export default BurgerButton;
