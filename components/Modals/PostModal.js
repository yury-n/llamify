const { default: Modal } = require("./Modal");

const PostModal = ({ image, description }) => {
  return (
    <Modal>
      <div className="post">
        <div
          className="post-image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="post-description">{description}</div>
      </div>
    </Modal>
  );
};

export default PostModal;
