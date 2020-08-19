import c from "classnames";
import { useState } from "react";
const { default: HumanEditModal } = require("./Modals/HumanEditModal");

const Human = ({ human, isOwner, onHumanEditSubmit }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const openModal = () => isOwner && setShowEditModal(true);
  return (
    <>
      <div key={human.id} className="human">
        <div className={c("name-wrapper", isOwner && "owner-name-wrapper")}>
          <div
            className="avatar"
            style={{
              backgroundImage: human.avatar
                ? `url(${human.avatar})`
                : undefined,
            }}
            onClick={openModal}
          ></div>
          <div className="name" onClick={openModal}>
            {human.name}
            <div
              className="human-has-updates"
              style={{ backgroundColor: "#86fc3c" }}
            ></div>
          </div>
          {human.role && <div className="role">{human.role}</div>}
          {isOwner && (
            <img className="icon" src="/icons/edit.svg" onClick={openModal} />
          )}
        </div>
        <div className="posts-stream">
          <div className="post-thumb post-thumb-empty"></div>
          <div className="post-thumb post-thumb-empty"></div>
          <div className="post-thumb post-thumb-empty"></div>
          <div className="post-thumb post-thumb-empty"></div>
          <div className="post-thumb post-thumb-empty"></div>
          <div className="post-thumb post-thumb-empty"></div>
        </div>
      </div>
      {showEditModal && (
        <HumanEditModal
          id={human.id}
          name={human.name}
          role={human.role}
          avatar={human.avatar}
          onHumanEditSubmit={(payload) => {
            onHumanEditSubmit(payload);
            setShowEditModal(false);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default Human;
