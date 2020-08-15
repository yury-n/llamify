import { useUser } from "../utils/auth/useUser";

const StickyBar = ({ teamName }) => {
  const { logout } = useUser();
  return (
    <div className="sticky-bar">
      <div className="owner-name-wrapper team-owner-name-wrapper">
        <div className="team-name">{teamName}</div>
      </div>
      <div className="sticky-bar-buttons buttons">
        <button className="button-wrapper" onClick={() => logout()}>
          <span className="button button-secondary button-white" tabindex="-1">
            Log out
          </span>
        </button>
        {false && (
          <button className="button-wrapper">
            <span
              className="button button-hollow"
              tabindex="-1"
              style="width: 60px;"
            >
              Invite
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StickyBar;
