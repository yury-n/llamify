import c from "classnames";
import { useState, useContext } from "react";
import RemoveConfirmationModal from "./Modals/RemoveConfirmationModal";
import PostModal from "./Modals/PostModal";
import { CurrentUserContext, TimeframeContext } from "../pages";

const PostCard = ({ post, onPostRemove, morePostsCount }) => {
  const { timeframe, fromTimestamp } = useContext(TimeframeContext);
  const { currentUser } = useContext(CurrentUserContext);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  if (!post) {
    return (
      <div
        className={c(
          "post-thumb post-thumb-empty",
          timeframe && "post-before-timeframe"
        )}
      ></div>
    );
  }

  const isOwner = currentUser.id === post?.author?.id;
  const isAfterTimestamp = fromTimestamp
    ? post.timestamp.seconds > fromTimestamp
    : true;

  const onImageLoad = (e) => {
    e.target.style.opacity = 1;
  };

  return (
    <>
      <div
        className={c(
          "post-thumb",
          (!isAfterTimestamp || morePostsCount) && "post-before-timeframe",
          morePostsCount && "post-thumb-disabled"
        )}
        onClick={() => setShowPostModal(true)}
      >
        {isOwner && (
          <div
            className="post-thumb-remove"
            onClick={(e) => {
              e.stopPropagation();
              setShowRemoveModal(true);
            }}
          >
            <img src="/icons/x.svg" />
          </div>
        )}
        <div className="post-thumb-image">
          <img
            key={`thumb-${post.postId}`}
            src={post.thumbImageUrl}
            loading="lazy"
            onLoad={onImageLoad}
          />
        </div>
        {(post.description || post.commentCount > 0) && (
          <div className="post-thumb-details">
            {post.description && (
              <div className="post-thumb-description">{post.description}</div>
            )}
            {post.commentCount > 0 && (
              <div className="post-thumb-comments">
                <img className="icon" src="/icons/comment.svg" />
                {post.commentCount}
              </div>
            )}
          </div>
        )}
        {!!morePostsCount && (
          <div class="post-thumb-more-button">
            <span>+</span>
            {morePostsCount}
          </div>
        )}
      </div>
      {showPostModal && (
        <PostModal post={post} onClose={() => setShowPostModal(false)} />
      )}
      {showRemoveModal && (
        <RemoveConfirmationModal
          text="Are you sure you want to remove this post?"
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
