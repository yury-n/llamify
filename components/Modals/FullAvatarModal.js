const { default: Modal } = require("./Modal");

const FullAvatarModal = ({ avatarFullUrl, onClose }) => {
  return (
    <Modal
      width={300}
      height={300}
      modalClassname="avatar-modal"
      onClose={onClose}
    >
      <div
        className="avatar-full"
        style={{ backgroundImage: `url(${avatarFullUrl})` }}
      ></div>
    </Modal>
  );
};

export default FullAvatarModal;
