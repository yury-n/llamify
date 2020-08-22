const { default: Modal } = require("./Modal");

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
                  backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/llamify.appspot.com/o/userAvatars%2F6VeGb1I3PANCkHi4q7EVudv85592%2Fthumb%2FOmDHMXlbFNTWeaqBeabLlie4CaK2.jpeg?alt=media&token=e625ce37-7964-42c5-b0a5-49c595820c6d)`,
                }}
              />
              <div className="post-author-name-wrapper">
                <div className="post-author-name">Yury Nedomolkin</div>
                <div className="post-author-role">UI designer</div>
              </div>
            </div>
            <div className="post-description">{post.description}</div>
          </div>
          <div className="post-sidebar-bottom">
            <textarea
              className="textarea comment-textarea"
              rows="1"
              placeholder="Add a comment"
            ></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
