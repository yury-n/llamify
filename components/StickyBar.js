import c from "classnames";
import { useState, useContext } from "react";
import TeamEditModal from "./Modals/TeamEditModal";
import NotificationsButton from "./NotificationsButton";
import ListIcon from "./Icons/ListIcon";
import GridIcon from "./Icons/GridIcon";
import FeedIcon from "./Icons/FeedIcon";
import BurgerButton from "./BurgerButton";
import UserProfileButton from "./UserProfileButton";
import { ActionsContext } from "../pages/app";
import PlusIcon from "./Icons/PlusIcon";

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
  const { showInviteModal } = useContext(ActionsContext);

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
          <UserProfileButton />
          {teamId && withInviteButton && (
            <button className="button-wrapper" onClick={showInviteModal}>
              <span
                className="button button-hollow"
                tabIndex="-1"
                style={{ width: 60, marginLeft: 12 }}
              >
                <PlusIcon />
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
    </>
  );
};

export default StickyBar;
