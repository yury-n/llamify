import { useState, useRef } from "react";
import Modal from "./Modal";
import useImageUpload from "../../utils/hooks/useImageUpload";

const TeamEditModal = ({
  teamId,
  teamName: teamNameProp,
  teamLogo: teamLogoProp,
  onSubmit: onSubmitProp,
  onClose,
}) => {
  const submitButton = useRef(null);
  const [teamName, setTeamName] = useState(teamNameProp);
  const {
    imageFile,
    imagePreview,
    onFileChange,
    uploadToFirebase,
  } = useImageUpload({
    src: teamLogoProp,
  });

  const onSubmit = (e) => {
    submitButton.current.childNodes[0].classList.add("busy");
    if (imageFile) {
      uploadToFirebase(`teamLogos/${teamId}`, 64, (url) => {
        onSubmitProp({
          teamId,
          teamName,
          teamLogo: url,
        });
      });
    } else {
      onSubmitProp({
        teamId,
        teamName,
      });
    }
    e.preventDefault();
  };

  return (
    <Modal onClose={onClose}>
      <div className="new-team form">
        <div className="modal-title">Edit Team</div>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Name
          </label>
          <input
            className="input"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Logo
          </label>
          <div className="image-field-form-wrapper">
            {imagePreview && (
              <img
                className="image-field-form-preview"
                src={imagePreview.src}
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
            onClick={onSubmit}
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

export default TeamEditModal;
