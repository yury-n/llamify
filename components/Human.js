import c from "classnames";
import { useState } from "react";
import CreatePostButton from "./CreatePostButton";
import PostCard from "./PostCard";
const { default: HumanEditModal } = require("./Modals/HumanEditModal");

const Human = ({
  human,
  teamId,
  isOwner,
  onHumanEditSubmit,
  onPostSubmit,
  onPostRemove,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const openModal = () => isOwner && setShowEditModal(true);
  const requiredNumOfCards = isOwner ? 5 : 6;
  const posts = human.postIds
    .map((postId) => human.posts[postId])
    .slice(0, requiredNumOfCards);
  const emptyPostCardsToAdd = requiredNumOfCards - posts.length;
  for (var i = 0; i < emptyPostCardsToAdd; i++) {
    posts.push(null);
  }
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
          {isOwner && (
            <CreatePostButton
              userId={human.id}
              teamId={teamId}
              onPostSubmit={onPostSubmit}
            />
          )}
          {posts.map((post, index) => (
            <PostCard
              key={`${index}-${post?.id}`}
              post={post}
              onPostRemove={(postId) =>
                onPostRemove({ postId, userId: human.id, teamId })
              }
            />
          ))}
        </div>
      </div>
      {showEditModal && (
        <HumanEditModal
          userId={human.id}
          teamId={teamId}
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
