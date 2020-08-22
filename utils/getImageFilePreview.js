const getImageFilePreview = (file) => {
  const objectURL = URL.createObjectURL(file);
  return {
    src: objectURL,
    type: file.type.split("/")[1],
  };
};

export default getImageFilePreview;
