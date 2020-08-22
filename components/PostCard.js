import { useState } from "react";
import RemoveConfirmationModal from "./Modals/RemoveConfirmationModal";

const PostCard = ({ post, onPostRemove }) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  if (!post) {
    return <div className="post-thumb post-thumb-empty"></div>;
  }
  const onImageLoad = (e) => {
    e.target.style.opacity = 1;
  };
  return (
    <>
      <div className="post-thumb">
        <div
          className="post-thumb-remove"
          onClick={() => setShowRemoveModal(true)}
        >
          <img src="/icons/x.svg" />
        </div>
        <div className="post-thumb-image">
          <img src={post.thumbImageUrl} loading="lazy" onLoad={onImageLoad} />
        </div>
        {post.description && (
          <div className="post-thumb-description">{post.description}</div>
        )}
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
