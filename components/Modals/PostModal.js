import { showThisImageOnLoad } from "../../utils";
const { default: Modal } = require("./Modal");
const { default: CommentsArea } = require("../CommentsArea");

const PostModal = ({ post, onClose }) => {
  return (
    <Modal
      modalClassname="post-modal"
      width={880}
      height={630}
      onClose={onClose}
    >
      <div className="post post-view">
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
            <CommentsArea post={post} withLoadedComments />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
