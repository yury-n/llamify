import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import firebase from "firebase/app";
import "firebase/storage";

let imageFile;

const TeamEditModal = ({
  teamId,
  teamName: teamNameProp,
  teamLogo: teamLogoProp,
  onSubmit: onSubmitProp,
  onClose,
}) => {
  const submitButton = useRef(null);
  const [teamName, setTeamName] = useState(teamNameProp);
  const [imagePreview, setImagePreview] = useState(
    teamLogoProp ? { src: teamLogoProp } : null
  );

  useEffect(() => {
    imageFile = null;
  }, []);

  const onSubmit = (e) => {
    submitButton.current.childNodes[0].classList.add("busy");
    if (imageFile) {
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
        var image = new Image();
        image.onload = function () {
          // Resize the image

          var canvas = document.createElement("canvas"),
            max_size = 50,
            width = image.width,
            height = image.height;
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(image, 0, 0, width, height);
          canvas.toBlob((blob) => {
            const storageRef = firebase.storage().ref();
            const logoFileRef = storageRef.child(
              `teamLogos/${teamId}.${imagePreview.type}`
            );
            logoFileRef.put(blob).then(() => {
              logoFileRef.getDownloadURL().then((url) => {
                onSubmitProp({
                  teamId,
                  teamName,
                  teamLogo: url,
                });
              });
            });
          });
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(imageFile);
    } else {
      onSubmitProp({
        teamId,
        teamName,
      });
    }
    e.preventDefault();
  };

  const onFileChange = (e) => {
    imageFile = e.target.files[0];
    const objectURL = URL.createObjectURL(imageFile);
    setImagePreview({
      src: objectURL,
      type: imageFile.type.split("/")[1],
    });
    e.preventDefault();
    e.stopPropagation();
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
          <div className="team-logo-form-wrapper">
            {imagePreview && (
              <img className="team-logo-form-preview" src={imagePreview.src} />
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

export default TeamEditModal;
