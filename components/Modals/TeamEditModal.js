import { useState, useRef } from "react";
import Modal from "./Modal";

const TeamEditModal = ({ teamName: teamNameProp, onSubmit, onClose }) => {
  const [teamName, setTeamName] = useState(teamNameProp);
  return (
    <Modal onClose={onClose}>
      <div className="new-team form">
        <div className="modal-title">Edit Team</div>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Name
          </label>
          <input
            className="input"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="form-buttons buttons">
          <button
            className="button-wrapper"
            onClick={() => {
              onSubmit({
                teamName,
              });
            }}
          >
            <span className="button button-primary" tabIndex="-1">
              Submit
            </span>
          </button>
          <button className="button-wrapper" onClick={() => onClose()}>
            <span className="button button-secondary" tabIndex="-1">
              Cancel
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TeamEditModal;
