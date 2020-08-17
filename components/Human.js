import c from "classnames";
import { useState } from "react";
const { default: HumanEditModal } = require("./Modals/HumanEditModal");

const Human = ({ human, isOwner, onSetName }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      <div key={human.id} className="human">
        <div
          className={c("name-wrapper", isOwner && "owner-name-wrapper")}
          onClick={() => setShowEditModal(true)}
        >
          <div className="name">
            {human.name}
            <div
              className="human-has-updates"
              style={{ backgroundColor: "#86fc3c" }}
            ></div>
          </div>
          {isOwner && <img src="/icons/edit.svg" />}
        </div>
      </div>
      {showEditModal && (
        <HumanEditModal
          name={human.name}
          onSubmit={(payload) => {
            onSetName(payload);
            setShowEditModal(false);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default Human;
