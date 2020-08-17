import { useRef } from "react";

const StartTeamForm = ({ onStartTeam }) => {
  const nameInput = useRef(null);
  const teamNameInput = useRef(null);
  return (
    <div className="sisu-form">
      <div className="form-group">
        <label htmlFor="teamName" className="label">
          Team Name
        </label>
        <input
          id="teamName"
          ref={teamNameInput}
          className="input"
          type="text"
          autoComplete="off"
          spellCheck="false"
          autoFocus={true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name" className="label">
          Your Name
        </label>
        <input
          id="name"
          ref={nameInput}
          className="input"
          type="text"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div className="form-buttons buttons">
        <button
          className="button-wrapper"
          onClick={() => {
            onStartTeam({
              teamName: teamNameInput.current.value,
              name: nameInput.current.value,
            });
          }}
        >
          <span className="button button-primary" tabIndex="-1">
            Start
          </span>
        </button>
      </div>
    </div>
  );
};

export default StartTeamForm;
