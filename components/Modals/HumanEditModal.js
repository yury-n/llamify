import { useState } from "react";
import Modal from "./Modal";

const HumanEditModal = ({
  name: nameProp,
  role: roleProp,
  onHumanEditSubmit,
  onClose,
}) => {
  const [name, setName] = useState(nameProp);
  const [role, setRole] = useState(roleProp);
  const onSubmit = (e) => {
    e.preventDefault();
    onHumanEditSubmit({
      name,
      role,
    });
  };
  return (
    <Modal onClose={onClose}>
      <form className="new-team form" onSubmit={onSubmit}>
        <div className="modal-title">Edit</div>
        <div className="form-group">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            className="input"
            type="text"
            value={name}
            autoFocus={true}
            autoComplete="false"
            spellCheck={false}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role" className="label">
            Role
          </label>
          <input
            id="role"
            className="input"
            type="text"
            value={role}
            autoFocus={true}
            autoComplete="false"
            spellCheck={false}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="form-buttons buttons">
          <button className="button-wrapper" onClick={onSubmit}>
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
      </form>
    </Modal>
  );
};

export default HumanEditModal;
