import { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";

const useImageUpload = (initImage) => {
  const [imageFile, setImageFile] = useState();
  const [imagePreview, setImagePreview] = useState(
    initImage ? { src: initImage } : null
  );

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview({
      src: objectURL,
      type: file.type.split("/")[1],
    });
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
          const logoFileRef = storageRef.child(`${path}.${imagePreview.type}`);
          logoFileRef.put(blob).then(() => {
            logoFileRef.getDownloadURL().then((url) => {
              callback(url);
            });
          });
        });
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(imageFile);
  };

  return { imageFile, imagePreview, onFileChange, uploadToFirebase };
};

export default useImageUpload;
