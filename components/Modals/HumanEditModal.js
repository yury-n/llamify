import { useState } from "react";
import Modal from "./Modal";

const HumanEditModal = ({
  name: nameProp,
  onSubmit: onSubmitProp,
  onClose,
}) => {
  const [name, setName] = useState(nameProp);
  const onSubmit = (e) => {
    onSubmitProp({
      name,
    });
    e.preventDefault();
  };
  return (
    <Modal onClose={onClose}>
      <form className="new-team form" onSubmit={onSubmit}>
        <div className="modal-title">Edit</div>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Name
          </label>
          <input
            className="input"
            type="text"
            value={name}
            autoFocus={true}
            autoComplete="false"
            spellCheck={false}
            onChange={(e) => setName(e.target.value)}
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
