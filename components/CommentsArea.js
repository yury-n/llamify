import "firebase/firestore";
import "firebase/database";
import c from "classnames";
import firebase from "firebase/app";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { ActionsContext, TeamContext, CurrentUserContext } from "../pages/app";
import RemoveConfirmationModal from "./Modals/RemoveConfirmationModal";
import { getNextSubtleColor } from "../utils";

const firestore = firebase.firestore();

const CommentsArea = ({ post, withLoadedComments: withLoadedCommentsProp }) => {
  const { submitComment, removeComment } = useContext(ActionsContext);
  const { teamId } = useContext(TeamContext);
  const currentUser = useContext(CurrentUserContext);
  const textareaRef = useRef(null);
  const [withLoadedComments, setWithLoadedComments] = useState(
    !post.commentCount ? true : withLoadedCommentsProp
  );
  const [textareaValue, setTextareaValue] = useState("");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [comments, setComments] = useState([]);
  const [collapsedCommentCount, setCollapsedCommentCount] = useState(
    Number.isInteger(post.commentCount) ? post.commentCount : null
  );
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState();
  const [currentReplyToUser, setCurrentReplyToUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    withLoadedComments && post.commentCount && fetchComments();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.keyCode === 13 && e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [textareaValue, comments]);

  useEffect(() => {
    if (isTextareaFocused) {
      const postModal = document.querySelector(".post-modal");
      const isInModal = postModal && postModal.contains(textareaRef.current);
      if (isInModal) {
        setTimeout(() => {
          const modal = textareaRef.current.closest(".modal-overlay");
          modal.scrollTop = modal.scrollHeight - modal.offsetHeight;
        }, 100);
      }
    }
  }, [isTextareaFocused]);

  const fetchComments = () => {
    setWithLoadedComments(true);
    setIsLoading(true);
    firestore
      .collection(`/teams/${teamId}/postComments/${post.postId}/comments`)
      .get()
      .then((commentsSnapshot) => {
        const fetchedComments = [];
        commentsSnapshot.forEach((comment) => {
          fetchedComments.push(comment.data().commentData);
        });
        setComments(fetchedComments);
        setIsLoading(false);
      });
  };

  const onTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    if (currentReplyToUser) {
      if (e.target.value.indexOf(`@${currentReplyToUser.firstName}`) !== 0) {
        setCurrentCommentId(null);
        setCurrentReplyToUser(null);
      }
    }
  };

  const clearAndBlurTextarea = () => {
    setTextareaValue("");
    setIsTextareaFocused(false);
    textareaRef.current.blur();
  };

  const onCancel = () => {
    clearAndBlurTextarea();
    setCurrentCommentId(null);
    setCurrentReplyToUser(null);
  };

  const onSubmit = () => {
    const db = firebase.database();
    const commentsRef = db.ref(
      `/teams/${teamId}/postComments/${post.postId}/comments`
    );
    const commentId = commentsRef.push().key;
    const comment = {
      commentId,
      content: textareaValue,
      author: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      },
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (currentUser.avatarThumbUrl) {
      comment.author.avatarThumbUrl = currentUser.avatarThumbUrl;
    }

    const newCommentCount =
      (withLoadedComments ? comments.length : post.commentCount) + 1;

    const params = {
      comment,
      newCommentCount,
      teamId,
      post,
    };
    if (currentReplyToUser) {
      params.comment.replyToCommentId = currentCommentId;
      params.replyToUser = currentReplyToUser;
    }
    submitComment(params);
    if (withLoadedComments) {
      setComments([...comments, comment]);
    } else {
      setCollapsedCommentCount(newCommentCount);
    }
    clearAndBlurTextarea();
  };

  const onClickReply = (comment) => {
    setCurrentCommentId(comment.commentId);
    setCurrentReplyToUser(comment.author);
    setTextareaValue(`@${comment.author.firstName}, `);
    textareaRef.current.focus();
  };

  const onCommentRemoveHandler = () => {
    removeComment({
      teamId,
      post,
      commentId: currentCommentId,
      newCommentCount: comments.length - 1,
    });
    setComments(comments.filter((c) => c.commentId !== currentCommentId));
    setShowRemoveModal(false);
    setCurrentCommentId(null);
  };

  return (
    <>
      <div
        className={c("comments-area", isTextareaFocused && "textarea-focused")}
      >
        {!withLoadedComments &&
          collapsedCommentCount &&
          !comments.length &&
          !isLoading && (
            <div className="post-comments-collapsed">
              <button className="button-wrapper" onClick={fetchComments}>
                <span
                  className="button icon-button button-secondary button-white"
                  tabIndex="-1"
                >
                  <img className="icon" src="/icons/comment.svg" />
                  {collapsedCommentCount}{" "}
                  {collapsedCommentCount === 1 ? "Comment" : "Comments"}
                </span>
              </button>
            </div>
          )}
        {isLoading && (
          <div className="comments">
            {new Array(collapsedCommentCount)
              .fill(null)
              .map((comment, index) => (
                <div key={index} className="comment loading-comment">
                  <div className="comment-author-avatar" />
                  <div className="comment-content"></div>
                </div>
              ))}
          </div>
        )}
        {comments.length > 0 && (
          <div className="comments">
            {comments.map((comment) => {
              const isCommentAuthor = comment.author.id == currentUser.id;
              const color = isCommentAuthor ? currentUser.color : getNextSubtleColor();
              return (
                <div key={comment.commentId} className="comment">
                  <div
                    className="comment-author-avatar"
                    style={{
                      backgroundImage:
                        comment.author.avatarThumbUrl &&
                        `url(${comment.author.avatarThumbUrl})`,
                      backgroundColor: !comment.author.avatarThumbUrl ? color : undefined,
                    }}
                  />
                  <div className="comment-content">
                    <span className="comment-author-name">
                      {comment.author.firstName}
                    </span>
                    <span>{comment.content}</span>
                  </div>
                  {isCommentAuthor && (
                    <div
                      className="comment-action-button"
                      onClick={() => {
                        setCurrentCommentId(comment.commentId);
                        setShowRemoveModal(true);
                      }}
                    >
                      Remove
                    </div>
                  )}
                  {!isCommentAuthor && (
                    <div
                      className="comment-action-button"
                      onClick={() => onClickReply(comment)}
                    >
                      Reply
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className="comment-textarea-wrapper">
          <textarea
            ref={textareaRef}
            className={c(
              "textarea comment-textarea",
              isTextareaFocused && "focused"
            )}
            placeholder="Add a comment"
            onFocus={() => setIsTextareaFocused(true)}
            value={textareaValue}
            onChange={onTextareaChange}
          />
          {isTextareaFocused && (
            <div className="form-buttons">
              <button className="button-wrapper" onClick={onSubmit}>
                <span className="button button-primary" tabIndex="-1">
                  Submit
                </span>
              </button>
              <button className="button-wrapper" onClick={onCancel}>
                <span className="button button-secondary" tabIndex="-1">
                  Cancel
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {showRemoveModal && (
        <RemoveConfirmationModal
          text="Are you sure you want to remove this comment?"
          onClose={() => setShowRemoveModal(false)}
          onRemove={onCommentRemoveHandler}
        />
      )}
    </>
  );
};

export default CommentsArea;
