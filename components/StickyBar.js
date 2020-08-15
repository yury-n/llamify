import { useUser } from "../utils/auth/useUser";
import { useState } from "react";
import TeamEditModal from "./Modals/TeamEditModal";

const StickyBar = ({ teamName, onTeamEditSubmit }) => {
  const [showTeamEditModal, setShowTeamEditModal] = useState(false);
  const { logout } = useUser();
  return (
    <>
      <div className="sticky-bar">
        <div
          className="owner-name-wrapper team-owner-name-wrapper"
          onClick={() => {
            setShowTeamEditModal(true);
          }}
        >
          <div className="team-name">{teamName}</div>
          <img src="/icons/edit.svg" />
        </div>
        <div className="sticky-bar-buttons buttons">
          <button className="button-wrapper" onClick={() => logout()}>
            <span
              className="button button-secondary button-white"
              tabIndex="-1"
            >
              Log out
            </span>
          </button>
          {false && (
            <button className="button-wrapper">
              <span
                className="button button-hollow"
                tabIndex="-1"
                style="width: 60px;"
              >
                Invite
              </span>
            </button>
          )}
        </div>
      </div>
      {showTeamEditModal && (
        <TeamEditModal
          teamName={teamName}
          onSubmit={onTeamEditSubmit}
          onClose={() => setShowTeamEditModal(false)}
        />
      )}
    </>
  );
};

export default StickyBar;
