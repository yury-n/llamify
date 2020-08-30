import c from "classnames";
import { useState } from "react";
import CreatePostButton from "./CreatePostButton";
import PostCard from "./PostCard";
import FullAvatarModal from "./Modals/FullAvatarModal";
import { RECENT_POSTS_COUNT } from "../utils/consts";
const { default: HumanEditModal } = require("./Modals/HumanEditModal");

const Human = ({
  human,
  teamId,
  isOwner,
  onHumanEditSubmit,
  onShowPostSubmitModal,
  onPostRemove,
  searchString,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  let requiredNumOfCards = isOwner
    ? RECENT_POSTS_COUNT - 1
    : RECENT_POSTS_COUNT;
  const posts = (human.postIds || [])
    .map((postId) => human.posts[postId])
    .slice(0, requiredNumOfCards);

  const emptyPostCardsToAdd = requiredNumOfCards - posts.length;
  for (var i = 0; i < emptyPostCardsToAdd; i++) {
    posts.push(null);
  }

  const name = `${human.firstName} ${human.lastName}`;

  const nameParts = name.split(new RegExp(searchString, "i"));
  const regexp = name.match(new RegExp(searchString, "i"));
  const highlightedNamePart = regexp && regexp[0];

  const onAvatarClick = () => {
    isOwner ? setShowEditModal(true) : setShowAvatarModal(true);
  };

  const onEditClick = () => {
    if (isOwner) {
      setShowEditModal(true);
    }
  };

  const onImageLoad = (e) => {
    e.target.style.opacity = 1;
  };

  return (
    <>
      <div key={human.id} className="human">
        <div className={c("name-wrapper", isOwner && "owner-name-wrapper")}>
          <div
            className={c("avatar", !human.avatarThumbUrl && "no-avatar")}
            onClick={onAvatarClick}
          >
            {human.avatarThumbUrl && (
              <img
                src={human.avatarThumbUrl}
                loading="lazy"
                onLoad={onImageLoad}
              />
            )}
          </div>
          <div className="name" onClick={onEditClick}>
            {highlightedNamePart ? (
              <>
                {nameParts[0]}
                <span>{highlightedNamePart}</span>
                {nameParts[1]}
              </>
            ) : (
              name
            )}
            <div
              className="human-has-updates"
              style={{ backgroundColor: "#86fc3c" }}
            ></div>
          </div>
          {human.role && <div className="role">{human.role}</div>}
          {isOwner && (
            <img className="icon" src="/icons/edit.svg" onClick={onEditClick} />
          )}
        </div>
        <div className="posts-stream">
          {isOwner && (
            <CreatePostButton onShowPostSubmitModal={onShowPostSubmitModal} />
          )}
          {posts.map((post, index) => (
            <PostCard
              key={`${index}-${post?.id}`}
              post={post}
              onPostRemove={onPostRemove}
            />
          ))}
        </div>
      </div>
      {showEditModal && (
        <HumanEditModal
          userId={human.id}
          teamId={teamId}
          firstName={human.firstName}
          lastName={human.lastName}
          role={human.role}
          avatarThumbUrl={human.avatarThumbUrl}
          onHumanEditSubmit={(payload) => {
            onHumanEditSubmit(payload);
            setShowEditModal(false);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showAvatarModal && (
        <FullAvatarModal
          avatarFullUrl={human.avatarFullUrl}
          onClose={() => setShowAvatarModal(false)}
        />
      )}
    </>
  );
};

export default Human;
