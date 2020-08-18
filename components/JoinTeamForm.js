import { useRef } from "react";

const JoinTeamForm = ({ onJoinTeam }) => {
  const nameInput = useRef(null);
  const submitButton = useRef(null);
  const onSubmit = (e) => {
    submitButton.current.childNodes[0].classList.add("busy");
    onJoinTeam({
      name: nameInput.current.value,
    });
    e.preventDefault();
  };
  return (
    <form className="sisu-form" onSubmit={onSubmit}>
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
          autoFocus={true}
        />
      </div>
      <div className="form-buttons buttons">
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

export default JoinTeamForm;
