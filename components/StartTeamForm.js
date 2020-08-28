import { useRef, useState } from "react";
import firebase from "firebase/app";
import database from "firebase/database";
import initFirebase from "../utils/auth/initFirebase";
import useImageUpload from "../utils/hooks/useImageUpload";

const StartTeamForm = ({ onStartTeam }) => {
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const teamNameInput = useRef(null);
  const formErrorBox = useRef(null);
  const submitButton = useRef(null);

  const {
    imageFile,
    imagePreview,
    onFileChange,
    uploadToFirebase,
    standardFileUploadButtonWithPreview,
  } = useImageUpload();

  const [step, setStep] = useState(1);

  const onSubmit = () => {
    let hasError = false;
    if (step == 1) {
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
      formErrorBox.current.style.display = "none";
      setStep(2);
      return;
    }
    // step 2
    if (!teamNameInput.current.value) {
      teamNameInput.current.classList.add("error");
      hasError = true;
    }
    if (hasError) {
      formErrorBox.current.style.display = "block";
      return;
    }
    formErrorBox.current.style.display = "none";

    submitButton.current.childNodes[0].classList.add("busy");

    // submit
    initFirebase();
    const teamId = firebase.database().ref("/teams/").push().key;
    const submitParams = {
      teamId,
      teamName: teamNameInput.current.value,
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
    };
    if (imageFile) {
      uploadToFirebase(`teamLogos/${teamId}`, 64, (url) => {
        submitParams.teamLogo = url;
        console.log({ submitParams });
        onStartTeam(submitParams);
      });
    } else {
      onStartTeam(submitParams);
    }
  };

  const onFieldKeyPress = (e) => {
    e.target.classList.remove("error");
    if (e.nativeEvent.code === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="sisu-form" onSubmit={onSubmit}>
      <div
        ref={formErrorBox}
        className="form-error"
        style={{ display: "none" }}
      >
        Please fill out required fields
      </div>
      <div style={{ display: step == 1 ? "block" : "none", width: "100%" }}>
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
      </div>
      {step == 2 && (
        <div style={{ width: "100%" }}>
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
              onKeyPress={onFieldKeyPress}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Logo
            </label>
            {standardFileUploadButtonWithPreview}
          </div>
        </div>
      )}
      <div className="form-buttons">
        <button
          className="button-wrapper"
          onClick={onSubmit}
          ref={submitButton}
        >
          <span className="button button-primary" tabIndex="-1">
            {step === 1 ? "Next" : "Start"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default StartTeamForm;
