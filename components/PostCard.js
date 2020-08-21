import { useState } from "react";
import RemoveConfirmationModal from "./Modals/RemoveConfirmationModal";

const PostCard = ({ post, onPostRemove }) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  if (!post) {
    return <div className="post-thumb post-thumb-empty"></div>;
  }
  return (
    <>
      <div className="post-thumb">
        <div
          className="post-thumb-remove"
          onClick={() => setShowRemoveModal(true)}
        >
          <img src="/icons/x.svg" />
        </div>
        <div
          className="post-thumb-image"
          style={{ backgroundImage: `url(${post.thumbImageUrl})` }}
        ></div>
        <div className="post-thumb-description">{post.description}</div>
      </div>
      {showRemoveModal && (
        <RemoveConfirmationModal
          onClose={() => setShowRemoveModal(false)}
          onRemove={() => {
            setShowRemoveModal(false);
            onPostRemove(post.postId);
          }}
        />
      )}
    </>
  );
};

export default PostCard;
