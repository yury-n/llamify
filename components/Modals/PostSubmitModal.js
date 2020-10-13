import c from "classnames";
import { useRef, useState, useContext } from "react";
import useImageUpload from "../../utils/hooks/useImageUpload";
const { default: Modal } = require("./Modal");
import firebase from "firebase/app";
import database from "firebase/database";
import initFirebase from "../../utils/auth/initFirebase";
import "firebase/firestore";
import ButtonShine from "../ButtonShine";
import { TeamContext } from "../../pages/app";

const PostSubmitModal = ({
  postId,
  userId,
  teamId,
  description: descriptionProp,
  imagePreview: imagePreviewProp,
  imageFile: imageFileProp,
  isDragActive,
  onClose,
  onPostSubmit,
}) => {
  const { newsletter: teamNewsletter } = useContext(TeamContext);
  const submitButton = useRef(null);
  const imagePreviewDiv = useRef(null);
  const textarea = useRef(null);

  const onFileChangeCallback = () => {
    textarea.current.focus();
  };

  const {
    imagePreview: imagePreviewFromInput,
    onFileChange,
    uploadToFirebase,
  } = useImageUpload(imagePreviewProp, imageFileProp, onFileChangeCallback);

  const [description, setDescription] = useState(descriptionProp);
  const [includeInNewsletter, setIncludeInNewsletter] = useState(false);

  const imagePreview = imagePreviewProp || imagePreviewFromInput;

  const onTextareaChange = (e) => {
    setDescription(e.target.value);
    setIncludeInNewsletter(true);
  };

  const onSubmit = () => {
    submitButton.current.childNodes[0].classList.add("busy");
    imagePreviewDiv.current.classList.add("busy");
    textarea.current.readOnly = true;
    textarea.current.classList.add("read-only");
    textarea.current.classList.add("busy");
    if (!postId) {
      initFirebase();
      const db = firebase.database();
      const postsRef = db.ref(`/teams/${teamId}/teamMembers/${userId}/posts`);
      const newPostId = postsRef.push().key;
      uploadToFirebase(
        `posts/${teamId}/${userId}/full/${newPostId}`,
        1080,
        (fullImageUrl) => {
          uploadToFirebase(
            `posts/${teamId}/${userId}/thumb/${newPostId}`,
            400,
            (thumbImageUrl) => {
              onPostSubmit({
                postId: newPostId,
                userId,
                teamId,
                fullImageUrl,
                thumbImageUrl,
                description,
                includeInNewsletter,
              });
              onClose();
            }
          );
        }
      );
    }
  };

  const onFieldKeyDown = (e) => {
    if (e.nativeEvent.metaKey && e.nativeEvent.code === "Enter") {
      onSubmit();
    }
  };

  return (
    <>
      <Modal
        width={660}
        height={730}
        onClose={onClose}
        modalClassname="post-submit-modal"
      >
        <div className="post">
          {!imagePreview && (
            <div className={c("post-image-dropzone", isDragActive && "active")}>
              <div className="drag-and-drop">Drag and Drop</div>
              <div className="dnd-or">or</div>
              <button className="button-wrapper file-button-wrapper post-image-select-file">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="file-input"
                  accept="image/x-png,image/gif,image/jpeg,.jpeg,.jpg,.png"
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
          )}
          {imagePreview && (
            <div
              ref={imagePreviewDiv}
              className="post-image"
              style={{ backgroundImage: `url(${imagePreview.src})` }}
            ></div>
          )}
          <textarea
            ref={textarea}
            className="textarea description-textarea"
            rows="3"
            placeholder="Description"
            onChange={onTextareaChange}
            onKeyDown={onFieldKeyDown}
          >
            {description}
          </textarea>
          {teamNewsletter && (
            <div className="newsletter-checkbox-wrapper">
              <label className="newsletter-checkbox-label" htmlFor="newsletter">
                Include in newsletter
                <input
                  id="newsletter"
                  type="checkbox"
                  checked={includeInNewsletter}
                  onChange={() => {
                    setIncludeInNewsletter(!includeInNewsletter);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          )}
          <div className="form-buttons">
            <button
              className="button-wrapper"
              onClick={onSubmit}
              ref={submitButton}
            >
              <span
                className={c(
                  "button button-primary",
                  !imagePreview && "disabled"
                )}
                tabIndex="-1"
              >
                {imagePreview && <ButtonShine />}
                Submit
              </span>
            </button>
            <button className="button-wrapper" onClick={onClose}>
              <span className="button button-secondary" tabIndex="-1">
                Cancel
              </span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostSubmitModal;
