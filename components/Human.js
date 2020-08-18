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
          <div
            className="avatar"
            style={{
              backgroundImage:
                "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/37abb01e-9eb0-4ceb-8e7f-c247caed05a6/d96i0vx-888f4459-94d0-4c24-882f-0e72900baa0e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMzdhYmIwMWUtOWViMC00Y2ViLThlN2YtYzI0N2NhZWQwNWE2XC9kOTZpMHZ4LTg4OGY0NDU5LTk0ZDAtNGMyNC04ODJmLTBlNzI5MDBiYWEwZS5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.89-tSG7QtvR9u8wk9S_jZ0O2lBgnrf3imxIFjFpcu7I)",
            }}
          ></div>
          <div className="name">
            {human.name}
            <div
              className="human-has-updates"
              style={{ backgroundColor: "#86fc3c" }}
            ></div>
          </div>
          {isOwner && <img className="icon" src="/icons/edit.svg" />}
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
