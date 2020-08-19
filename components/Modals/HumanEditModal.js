import { useState, useRef } from "react";
import Modal from "./Modal";
import useImageUpload from "../../utils/hooks/useImageUpload";

const HumanEditModal = ({
  id,
  idProp,
  name: nameProp,
  role: roleProp,
  avatar: avatarProp,
  onHumanEditSubmit,
  onClose,
}) => {
  const submitButton = useRef(null);
  const [name, setName] = useState(nameProp);
  const [role, setRole] = useState(roleProp);
  const {
    imageFile,
    imagePreview,
    onFileChange,
    uploadToFirebase,
  } = useImageUpload(avatarProp, `userAvatars/${idProp}`);

  const onSubmit = (e) => {
    submitButton.current.childNodes[0].classList.add("busy");
    e.preventDefault();
    if (imageFile) {
      uploadToFirebase((url) => {
        onHumanEditSubmit({
          name,
          role,
          avatar: url,
        });
      });
    } else {
      onHumanEditSubmit({
        name,
        role,
      });
    }
  };
  return (
    <Modal onClose={onClose}>
      <div className="new-team form">
        <div className="modal-title">Edit</div>
        <div className="form-group">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            className="input"
            type="text"
            value={name}
            autoFocus={true}
            autoComplete="false"
            spellCheck={false}
            onChange={(e) => setName(e.target.value)}
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
            autoFocus={true}
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
        <div className="form-buttons buttons">
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

export default HumanEditModal;