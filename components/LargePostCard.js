import { useState } from "react";
import RemoveConfirmationModal from "./Modals/RemoveConfirmationModal";
import CommentsArea from "./CommentsArea";
import { showThisImageOnLoad } from "../utils";

const LargePostCard = ({ post, onPostRemove }) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  return (
    <>
      <div className="large-post-thumb post-view">
        <div className="post-image post-image-lazy">
          <a target="_blank" href={post.fullImageUrl}>
            <img
              src={post.fullImageUrl}
              loading="lazy"
              onLoad={showThisImageOnLoad}
            />
          </a>
        </div>
        <div className="post-sidebar">
          <div className="post-sidebar-top">
            <div className="post-author-block">
              {post.author?.avatarThumbUrl && (
                <div
                  className="post-author-avatar"
                  style={{
                    backgroundImage: post.author?.avatarThumbUrl
                      ? `url(${post.author?.avatarThumbUrl})`
                      : undefined,
                  }}
                />
              )}
              <div className="post-author-name-wrapper">
                <div className="post-author-name">
                  {post.author.firstName} {post.author.lastName}
                </div>
                {post.author.role && (
                  <div className="post-author-role">{post.author.role}</div>
                )}
              </div>
            </div>
            <div className="post-description">{post.description}</div>
          </div>
          <div className="post-sidebar-bottom">
            <CommentsArea post={post} />
          </div>
        </div>
      </div>
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

export default LargePostCard;
