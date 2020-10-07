import c from "classnames";
import { useUser } from "../utils/auth/useUser";
import { useState, useContext } from "react";
import TeamEditModal from "./Modals/TeamEditModal";
import InviteModal from "./Modals/InviteModal";
import NotificationsButton from "./NotificationsButton";
import ListIcon from "./Icons/ListIcon";
import GridIcon from "./Icons/GridIcon";
import FeedIcon from "./Icons/FeedIcon";
import BurgerButton from "./BurgerButton";
import { CurrentUserContext } from "../pages/app";

const StickyBar = ({
  teamId,
  teamName,
  teamLogo,
  isTeamEditable,
  viewMode,
  setViewMode,
  resetFilters,
  withInviteButton,
}) => {
  const [showTeamEditModal, setShowTeamEditModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const { logout } = useUser();

  const viewModeButtons = (
    <div className="view-mode-buttons">
      <button
        className="button-wrapper list-view-button"
        onClick={() => setViewMode("list")}
        aria-label="List View"
        data-balloon-pos="down"
      >
        <span
          className={c(
            "button icon-button button-secondary button-white",
            viewMode === "list" && "active"
          )}
          tabIndex="-1"
        >
          <ListIcon />
        </span>
      </button>
      <button
        className="button-wrapper grid-view-button"
        onClick={() => setViewMode("grid")}
        aria-label="Grid View"
        data-balloon-pos="down"
      >
        <span
          className={c(
            "button icon-button button-secondary button-white",
            viewMode === "grid" && "active"
          )}
          tabIndex="-1"
        >
          <GridIcon />
        </span>
      </button>
      <button
        className="button-wrapper grid-view-button"
        onClick={() => setViewMode("feed")}
        aria-label="Feed View"
        data-balloon-pos="down"
      >
        <span
          className={c(
            "button icon-button button-secondary button-white",
            viewMode === "feed" && "active"
          )}
          tabIndex="-1"
        >
          <FeedIcon />
        </span>
      </button>
    </div>
  );

  return (
    <>
      <div className="sticky-bar">
        <img
          src="/images/logo.svg"
          className="home-logo"
          onClick={() => {
            window.scrollTo(0, 0);
            resetFilters();
          }}
        />
        <div className="sticky-bar-left-side">
          <BurgerButton />
          <div
            className={c(
              "team-name-wrapper",
              isTeamEditable && "owner-name-wrapper"
            )}
            onClick={() => {
              isTeamEditable && setShowTeamEditModal(true);
            }}
          >
            {teamLogo && <img className="team-logo" src={teamLogo} />}
            <div className="team-name">{teamName}</div>
            {isTeamEditable && <img className="icon" src="/icons/edit.svg" />}
          </div>
        </div>
        <div className="sticky-bar-buttons buttons">
          {teamId && <NotificationsButton />}
          {currentUser && (
            <button
              className="button-wrapper"
              onClick={() => logout()}
              aria-label="Log out"
              data-balloon-pos="down"
            >
              <span
                className="button icon-button button-secondary button-white profile-button"
                tabIndex="-1"
              >
                <div
                  className="profile-button-avatar"
                  style={{
                    backgroundImage: `url(${currentUser.avatarThumbUrl})`,
                  }}
                />
                {currentUser.firstName}
              </span>
            </button>
          )}
          {teamId && withInviteButton && (
            <button
              className="button-wrapper"
              onClick={() => setShowInviteModal(true)}
              aria-label="Invite to join the team"
              data-balloon-pos="down"
            >
              <span
                className="button button-hollow"
                tabIndex="-1"
                style={{ width: 60, marginLeft: -4 }}
              >
                Invite
              </span>
            </button>
          )}
        </div>
      </div>
      {showTeamEditModal && (
        <TeamEditModal
          teamId={teamId}
          teamName={teamName}
          teamLogo={teamLogo}
          onClose={() => setShowTeamEditModal(false)}
        />
      )}
      {showInviteModal && (
        <InviteModal
          teamId={teamId}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </>
  );
};

export default StickyBar;
