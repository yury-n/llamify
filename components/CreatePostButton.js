import { useState } from "react";

const CreatePostButton = ({ onShowPostSubmitModal }) => {
  return (
    <>
      <div className="post-thumb" onClick={onShowPostSubmitModal}>
        <div className="post-thumb-add-button">
          <img src="/icons/plus.svg" />
          <span>Submit a Post</span>
        </div>
      </div>
    </>
  );
};

export default CreatePostButton;
