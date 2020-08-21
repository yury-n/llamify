import { useState } from "react";
import PostCreateEditModal from "./Modals/PostCreateEditModal";

const CreatePostButton = ({ userId, teamId, onPostSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="post-thumb" onClick={() => setShowModal(true)}>
        <div className="post-thumb-add-button">
          <img src="/icons/plus.svg" />
        </div>
      </div>
      {showModal && (
        <PostCreateEditModal
          userId={userId}
          teamId={teamId}
          onPostSubmit={onPostSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CreatePostButton;
