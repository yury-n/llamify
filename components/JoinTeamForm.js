import { useRef } from "react";

const JoinTeamForm = ({ onJoinTeam }) => {
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const submitButton = useRef(null);
  const formErrorBox = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    if (!firstNameInput.current.value) {
      firstNameInput.current.classList.add("error");
      hasError = true;
    }
    if (!lastNameInput.current.value) {
      lastNameInput.current.classList.add("error");
      hasError = true;
    }
    if (hasError) {
      formErrorBox.current.style.display = "block";
      return;
    }

    submitButton.current.childNodes[0].classList.add("busy");
    onJoinTeam({
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
    });
  };

  const onFieldKeyPress = (e) => {
    e.target.classList.remove("error");
  };

  return (
    <form className="sisu-form" onSubmit={onSubmit}>
      <div
        ref={formErrorBox}
        className="form-error"
        style={{ display: "none" }}
      >
        Please fill out required fields
      </div>
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
          autoFocus={true}
          onKeyPress={onFieldKeyPress}
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
          onKeyPress={onFieldKeyPress}
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

export default JoinTeamForm;
