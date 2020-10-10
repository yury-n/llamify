import { useState, useRef, useContext } from "react";
import Modal from "./Modal";
import useImageUpload from "../../utils/hooks/useImageUpload";
import { CurrentUserContext, TeamContext } from "../../pages/app";

const ProfileEditModal = ({ onSubmit, onClose }) => {
  const currentUser = useContext(CurrentUserContext);
  const team = useContext(TeamContext);
  const userId = currentUser?.id;
  const teamId = team?.teamId;
  const submitButton = useRef(null);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [role, setRole] = useState(currentUser.role);
  const {
    imageFile,
    imagePreview,
    onFileChange,
    uploadToFirebase,
  } = useImageUpload(
    currentUser.avatarThumbUrl
      ? {
          src: currentUser.avatarThumbUrl,
        }
      : null
  );

  const onSubmitHandler = (e) => {
    submitButton.current.childNodes[0].classList.add("busy");
    e.preventDefault();
    if (imageFile) {
      uploadToFirebase(
        `userAvatars/${teamId}/${userId}/thumb/`,
        120,
        (avatarThumbUrl) => {
          uploadToFirebase(
            `userAvatars/${teamId}/${userId}/full`,
            400,
            (avatarFullUrl) => {
              onSubmit({
                firstName,
                lastName,
                role,
                avatarThumbUrl,
                avatarFullUrl,
              });
            }
          );
        }
      );
    } else {
      onSubmit({
        firstName,
        lastName,
        role,
      });
    }
  };
  return (
    <Modal onClose={onClose}>
      <div className="new-team form">
        <div className="modal-title">Edit</div>
        <div className="form-group">
          <label htmlFor="first-name" className="label">
            First Name
          </label>
          <input
            id="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
            type="text"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role" className="label">
            Role
          </label>
          <input
            id="role"
            className="input"
            type="text"
            value={role || ""}
            autoComplete="false"
            spellCheck={false}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar" className="label">
            Avatar
          </label>
          <div className="image-field-form-wrapper">
            {imagePreview && (
              <div
                className="image-field-form-preview"
                style={{ backgroundImage: `url(${imagePreview.src})` }}
              />
            )}
            <button className="button-wrapper file-button-wrapper">
              <input
                type="file"
                name="file"
                id="file"
                className="file-input"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={onFileChange}
              />
              <label className="file-input-label" htmlFor="file" />
              <span
                className="button button-secondary button-white"
                tabIndex="-1"
              >
                Select Image
              </span>
            </button>
          </div>
        </div>
        <div className="form-buttons">
          <button
            className="button-wrapper"
            onClick={onSubmitHandler}
            ref={submitButton}
          >
            <span className="button button-primary" tabIndex="-1">
              Submit
            </span>
          </button>
          <button className="button-wrapper" onClick={() => onClose()}>
            <span className="button button-secondary" tabIndex="-1">
              Cancel
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;
