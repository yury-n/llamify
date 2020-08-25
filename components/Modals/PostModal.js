const { default: Modal } = require("./Modal");
const { default: CommentsArea } = require("../CommentsArea");

const PostModal = ({ post, onClose }) => {
  return (
    <Modal width={860} height={630} onClose={onClose}>
      <div className="post post-view">
        <div
          className="post-image"
          style={{
            backgroundImage: `url(${post.fullImageUrl})`,
          }}
        ></div>
        <div className="post-sidebar">
          <div className="post-sidebar-top">
            <div className="post-author-block">
              <div
                className="post-author-avatar"
                style={{
                  backgroundImage: `url(${post.author?.avatarThumbUrl})`,
                }}
              />
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
            <CommentsArea postId={post.postId} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
