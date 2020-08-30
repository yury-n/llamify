import { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import getImageFilePreview from "../getImageFilePreview";

const useImageUpload = (initImagePreview, initImageFile) => {
  // ^ these props are to inject a file that arrived from DnD
  const [imageFile, setImageFile] = useState(initImageFile);
  const [imagePreview, setImagePreview] = useState(initImagePreview);

  const onFileButtonClick = (e) => {
    e.currentTarget.children[0].click();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(getImageFilePreview(file));
    e.preventDefault();
    e.stopPropagation();
  };

  const uploadToFirebase = (path, maxSize = 50, callback) => {
    var reader = new FileReader();
    reader.onload = function (readerEvent) {
      var image = new Image();
      image.onload = function () {
        // Resize the image
        var canvas = document.createElement("canvas"),
          max_size = maxSize,
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
          const imageType = (imagePreview || initImagePreview).type;
          const logoFileRef = storageRef.child(`${path}.${imageType}`);
          logoFileRef.put(blob).then(() => {
            logoFileRef.getDownloadURL().then((url) => {
              callback(url);
            });
          });
        });
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(initImageFile || imageFile);
  };

  return {
    imageFile: imageFile || initImageFile,
    imagePreview: imagePreview || initImagePreview,
    onFileChange,
    uploadToFirebase,
    standardFileUploadButtonWithPreview: (
      <div className="image-field-form-wrapper">
        {imagePreview && (
          <div
            className="image-field-form-preview"
            style={{ backgroundImage: `url(${imagePreview.src})` }}
          />
        )}
        <button
          className="button-wrapper file-button-wrapper"
          onClick={onFileButtonClick}
        >
          <input
            type="file"
            name="file"
            id="file"
            className="file-input"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={onFileChange}
            tabIndex="-1"
          />
          <span className="button button-secondary button-white" tabIndex="-1">
            Select Image
          </span>
        </button>
      </div>
    ),
  };
};

export default useImageUpload;
