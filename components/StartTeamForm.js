import { useRef } from "react";

const StartTeamForm = ({ onStartTeam }) => {
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const teamNameInput = useRef(null);
  const submitButton = useRef(null);
  const onSubmit = (e) => {
    submitButton.current.childNodes[0].classList.add("busy");
    onStartTeam({
      teamName: teamNameInput.current.value,
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
    });
    e.preventDefault();
  };
  return (
    <form className="sisu-form" onSubmit={onSubmit}>
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
      <div style={{ height: 50 }}></div>
      <div className="form-group">
        <label htmlFor="first-name" className="label">
          First Name
        </label>
        <input
          id="name"
          ref={firstNameInput}
          className="input"
          type="text"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div className="form-group">
        <label htmlFor="last-name" className="label">
          Last Name
        </label>
        <input
          id="name"
          ref={lastNameInput}
          className="input"
          type="text"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div className="form-buttons">
        <button
          className="button-wrapper"
          onClick={onSubmit}
          ref={submitButton}
        >
          <span className="button button-primary" tabIndex="-1">
            Start
          </span>
        </button>
      </div>
    </form>
  );
};

export default StartTeamForm;
