const { default: Modal } = require("./Modal");
import { TeamContext } from "../../pages/app";
import { useContext } from "react";

const InviteModal = ({ onClose }) => {
  const team = useContext(TeamContext);
  const teamId = team?.teamId;
  return (
    <Modal onClose={onClose}>
      <div class="alert">
        <div class="modal-title">Invite</div>
        <input
          class="input"
          type="text"
          value={`http://${window?.location?.hostname}/app?team=${teamId}`}
          style={{ width: 330 }}
          readOnly
        />
        <div class="form-buttons">
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
