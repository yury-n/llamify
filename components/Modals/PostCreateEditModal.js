import c from "classnames";
import { useRef, useState } from "react";
import useImageUpload from "../../utils/hooks/useImageUpload";
const { default: Modal } = require("./Modal");
import firebase from "firebase/app";
import database from "firebase/database";
import initFirebase from "../../utils/auth/initFirebase";
import "firebase/firestore";
import ButtonShine from "../ButtonShine";

const PostCreateEditModal = ({
  postId,
  userId,
  teamId,
  description: descriptionProp,
  isDragActive,
  onClose,
  onPostSubmit,
}) => {
  const submitButton = useRef(null);
  const imagePreviewDiv = useRef(null);
  const textarea = useRef(null);
  const { imagePreview, onFileChange, uploadToFirebase } = useImageUpload(
    undefined
  );
  const [description, setDescription] = useState(descriptionProp);

  console.log({ imagePreview });

  const onSubmit = (e) => {
    submitButton.current.childNodes[0].classList.add("busy");
    imagePreviewDiv.current.classList.add("busy");
    textarea.current.readOnly = true;
    e.preventDefault();
    if (!postId) {
      initFirebase();
      const db = firebase.database();
      const postsRef = db.ref(`/teams/${teamId}/teamMembers/${userId}/posts`);
      const newPostId = postsRef.push().key;
      console.log({ newPostId });
      uploadToFirebase(
        `posts/${teamId}/full/${userId}/${newPostId}`,
        1080,
        (fullImageUrl) => {
          uploadToFirebase(
            `posts/${teamId}/thumb/${userId}/${newPostId}`,
            400,
            (thumbImageUrl) => {
              onPostSubmit({
                postId: newPostId,
                userId,
                teamId,
                fullImageUrl,
                thumbImageUrl,
                description,
              });
              onClose();
            }
          );
        }
      );
    }
  };

  return (
    <>
      <Modal width={660} height={730} onClose={onClose}>
        <div className="post">
          {!imagePreview && (
            <div className={c("post-image-dropzone", isDragActive && "active")}>
              <div>Drag and Drop</div>
              <div>or</div>
              <button className="button-wrapper file-button-wrapper post-image-select-file">
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
            onChange={(e) => setDescription(e.target.value)}
          >
            {description}
          </textarea>
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
            <button className="button-wrapper">
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

export default PostCreateEditModal;
