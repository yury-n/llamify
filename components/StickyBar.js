import { useUser } from "../utils/auth/useUser";
import { useState } from "react";
import TeamEditModal from "./Modals/TeamEditModal";
import InviteModal from "./Modals/InviteModal";

const StickyBar = ({ teamId, teamName, teamLogo, onTeamEditSubmit }) => {
  const [showTeamEditModal, setShowTeamEditModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { logout } = useUser();
  return (
    <>
      <img src="/images/logo.svg" className="home-logo" />
      <div className="sticky-bar">
        <div
          className="owner-name-wrapper team-owner-name-wrapper"
          onClick={() => {
            setShowTeamEditModal(true);
          }}
        >
          {teamLogo && <img className="team-logo" src={teamLogo} />}
          <div className="team-name">{teamName}</div>
          <img className="icon" src="/icons/edit.svg" />
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
          {teamId && (
            <button
              className="button-wrapper"
              onClick={() => setShowInviteModal(true)}
            >
              <span
                className="button button-hollow"
                tabIndex="-1"
                style={{ width: 60 }}
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
