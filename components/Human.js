import c from "classnames";
import { useState, useContext } from "react";
import CreatePostButton from "./CreatePostButton";
import PostCard from "./PostCard";
import FullAvatarModal from "./Modals/FullAvatarModal";
import { RECENT_POSTS_COUNT } from "../utils/consts";
const { default: ProfileEditModal } = require("./Modals/ProfileEditModal");
import {
  CurrentUserContext,
  TimeframeContext,
  ActionsContext,
} from "../pages/app";
import { showThisImageOnLoad, getNextSubtleColor } from "../utils";

const Human = ({ human, onShowPostSubmitModal, searchString }) => {
  const { timeframe, fromTimestamp } = useContext(TimeframeContext);
  const { showProfileEditModal } = useContext(ActionsContext);
  const currentUser = useContext(CurrentUserContext);
  const isOwner = human.id === currentUser.id;
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  if (!isOwner && !human.recentPostIds?.length) {
    return null;
  }

  const color = isOwner ? currentUser.color : getNextSubtleColor();

  let requiredNumOfCards = isOwner
    ? RECENT_POSTS_COUNT - 1
    : RECENT_POSTS_COUNT;
  const recentPosts = (human.recentPostIds || [])
    .map((recentPostId) => human.recentPosts[recentPostId])
    .slice(0, requiredNumOfCards);

  const isAnyPostAfterTimestamp = recentPosts.some((post) => {
    return post.timestamp.seconds > fromTimestamp;
  });

  if (!isAnyPostAfterTimestamp && !isOwner && timeframe) {
    return null;
  }

  let morePostsCount = human.totalPostCount - recentPosts.length;
  if (morePostsCount > 0) {
    morePostsCount++; // because the last one will have an overlay above it
  }

  const emptyPostCardsToAdd = requiredNumOfCards - recentPosts.length;
  for (var i = 0; i < emptyPostCardsToAdd; i++) {
    recentPosts.push(null);
  }

  const name = `${human.firstName} ${human.lastName}`;

  let nameParts = [];
  let highlightedNamePart;
  if (searchString) {
    nameParts = name.split(new RegExp(searchString, "i"));
    const nameRegexp = name.match(new RegExp(searchString, "i"));
    highlightedNamePart = nameRegexp && nameRegexp[0];
  }

  let roleParts = [];
  let highlightedRolePart;
  if (!highlightedNamePart && searchString && human.role) {
    roleParts = human.role.split(new RegExp(searchString, "i"));
    const roleRegexp = human.role.match(new RegExp(searchString, "i"));
    highlightedRolePart = roleRegexp && roleRegexp[0];
  }

  const onAvatarClick = () => {
    isOwner ? showProfileEditModal() : setShowAvatarModal(true);
  };

  return (
    <>
      <div key={human.id} className="human">
        <div
          className={c(
            "name-wrapper",
            human.role && "name-with-role-wrapper",
            human.avatarThumbUrl && "name-with-avatar-wrapper"
          )}
        >
          <div
            className={c("avatar")}
            style={{ backgroundColor: color }}
            onClick={onAvatarClick}
          >
            {human.avatarThumbUrl && (
              <img
                src={human.avatarThumbUrl}
                loading="lazy"
                onLoad={showThisImageOnLoad}
              />
            )}
          </div>
          <div className="name">
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
          {human.role && (
            <div className="role">
              {highlightedRolePart ? (
                <>
                  {roleParts[0]}
                  <span>{highlightedRolePart}</span>
                  {roleParts[1]}
                </>
              ) : (
                human.role
              )}
            </div>
          )}
        </div>
        <div className="posts-stream">
          {isOwner && (
            <CreatePostButton onShowPostSubmitModal={onShowPostSubmitModal} />
          )}
          {recentPosts.map((post, index) => (
            <PostCard
              key={`${index}-${post?.id}`}
              post={post}
              morePostsCount={
                index === recentPosts.length - 1 ? morePostsCount : undefined
              }
            />
          ))}
        </div>
      </div>
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
