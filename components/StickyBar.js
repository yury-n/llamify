import c from "classnames";
import { useUser } from "../utils/auth/useUser";
import { useState } from "react";
import TeamEditModal from "./Modals/TeamEditModal";
import InviteModal from "./Modals/InviteModal";

const StickyBar = ({
  teamId,
  teamName,
  teamLogo,
  isTeamEditable,
  onTeamEditSubmit,
  viewMode,
  onSetViewMode,
}) => {
  const [showTeamEditModal, setShowTeamEditModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { logout } = useUser();

  const renderViewModeButtons = () => (
    <>
      <button
        className="button-wrapper list-view-button"
        onClick={() => onSetViewMode("list")}
        title="List View"
      >
        <span
          className={c(
            "button icon-button button-secondary button-white",
            viewMode === "list" && "active"
          )}
          tabIndex="-1"
        >
          <svg
            height="1792"
            viewBox="0 0 1792 1792"
            width="1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M384 1408q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm0-512q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm-1408-928q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"
            />
          </svg>
        </span>
      </button>
      <button
        className="button-wrapper grid-view-button"
        onClick={() => onSetViewMode("grid")}
        title="Grid View"
      >
        <span
          className={c(
            "button icon-button button-secondary button-white",
            viewMode === "grid" && "active"
          )}
          tabIndex="-1"
        >
          <svg
            id="Layer_1"
            version="1.1"
            viewBox="0 0 16 16"
            width="16px"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            style={{ transform: "scale(0.85)" }}
          >
            <path d="M3,0H1C0.45,0,0,0.45,0,1v2c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1V1C4,0.45,3.55,0,3,0z M9,0H7C6.45,0,6,0.45,6,1v2  c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1V1C10,0.45,9.55,0,9,0z M15,0h-2c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h2  c0.55,0,1-0.45,1-1V1C16,0.45,15.55,0,15,0z M3,6H1C0.45,6,0,6.45,0,7v2c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1V7C4,6.45,3.55,6,3,6  z M9,6H7C6.45,6,6,6.45,6,7v2c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1V7C10,6.45,9.55,6,9,6z M15,6h-2c-0.55,0-1,0.45-1,1v2  c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1V7C16,6.45,15.55,6,15,6z M3,12H1c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h2  c0.55,0,1-0.45,1-1v-2C4,12.45,3.55,12,3,12z M9,12H7c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-2  C10,12.45,9.55,12,9,12z M15,12h-2c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-2C16,12.45,15.55,12,15,12z" />
          </svg>
        </span>
      </button>
    </>
  );

  return (
    <>
      <img src="/images/logo.svg" className="home-logo" />
      <div className="sticky-bar">
        <div className="sticky-bar-left-side">
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
          {teamId && renderViewModeButtons()}
        </div>
        <div className="sticky-bar-buttons buttons">
          {teamId && (
            <button className="button-wrapper" title="Notifcations">
              <span
                className="button icon-button button-secondary button-white"
                tabIndex="-1"
              >
                <img
                  src="/icons/bell.svg"
                  style={{ transform: "scale(1.15)" }}
                />
              </span>
            </button>
          )}
          <button
            className="button-wrapper"
            onClick={() => logout()}
            title="Logout"
          >
            <span
              className="button icon-button button-secondary button-white"
              tabIndex="-1"
            >
              <img
                src="/icons/logout.svg"
                style={{ transform: "scale(1.05)" }}
              />
            </span>
          </button>
          {teamId && (
            <button
              className="button-wrapper"
              onClick={() => setShowInviteModal(true)}
              title="Invite to join the team"
            >
              <span
                className="button button-hollow"
                tabIndex="-1"
                style={{ width: 60, marginLeft: 12 }}
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
          onSubmit={(payload) => {
            onTeamEditSubmit(payload);
            setShowTeamEditModal(false);
          }}
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
