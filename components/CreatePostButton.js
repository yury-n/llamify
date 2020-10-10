import { useState } from "react";
import PlusIcon from "./Icons/PlusIcon";

const CreatePostButton = ({ onShowPostSubmitModal }) => {
  return (
    <>
      <div className="post-thumb" onClick={onShowPostSubmitModal}>
        <div className="post-thumb-add-button">
          <PlusIcon />
          <span>Submit a Post</span>
        </div>
      </div>
    </>
  );
};

export default CreatePostButton;
