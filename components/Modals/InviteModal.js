const { default: Modal } = require("./Modal");

const InviteModal = ({ teamId, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div class="alert">
        <div class="modal-title">Invite</div>
        <input
          class="input"
          type="text"
          value={`http://llamify.com/?team=${teamId}`}
          style={{ width: 330 }}
        />
        <div class="form-buttons buttons">
          <button class="button-wrapper" onClick={onClose}>
            <span class="button button-primary" tabIndex="-1">
              Close
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;