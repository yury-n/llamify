import "firebase/firestore";
import database from "firebase/database";
import firebase from "firebase/app";
import { useState, useRef, useContext, useEffect } from "react";
import { ActionsContext, TeamContext, CurrentUserContext } from "../pages";
import RemoveConfirmationModal from "./Modals/RemoveConfirmationModal";

const firestore = firebase.firestore();

const CommentsArea = ({ postId, postAuthorId, loadComments, commentCount }) => {
  const { onCommentSubmit, onCommentRemove } = useContext(ActionsContext);
  const { teamId } = useContext(TeamContext);
  const { currentUser } = useContext(CurrentUserContext);
  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [comments, setComments] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState();

  useEffect(() => {
    loadComments && fetchComments();
    const onKeyDown = (e) => {
      if (e.keyCode === 13 && e.metaKey) {
        e.preventDefault();
        onSubmit();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const fetchComments = () => {
    firestore
      .collection(`/teams/${teamId}/postComments/${postId}/comments`)
      .get()
      .then((commentsSnapshot) => {
        const fetchedComments = [];
        commentsSnapshot.forEach((comment) => {
          fetchedComments.push(comment.data().commentData);
        });
        setComments(fetchedComments);
      });
  };

  const clearAndBlurTextarea = () => {
    setTextareaValue("");
    setIsTextareaFocused(false);
    textareaRef.current.blur();
  };

  const onCancel = () => {
    clearAndBlurTextarea();
  };

  const onSubmit = () => {
    const db = firebase.database();
    const commentsRef = db.ref(
      `/teams/${teamId}/postComments/${postId}/comments`
    );
    const commentId = commentsRef.push().key;
    const newComment = {
      commentId,
      content: textareaValue,
      author: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        avatarThumbUrl: currentUser.avatarThumbUrl,
      },
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log({ newComment });
    onCommentSubmit({
      newComment,
      newCommentCount: comments.length + 1,
      teamId,
      postId,
      postAuthorId,
    });
    setComments([...comments, newComment]);
    clearAndBlurTextarea();
  };

  const onCommentRemoveHandler = () => {
    onCommentRemove({
      teamId,
      postId,
      postAuthorId,
      commentId: currentCommentId,
      newCommentCount: comments.length - 1,
    });
    setComments(comments.filter((c) => c.commentId !== currentCommentId));
    setShowRemoveModal(false);
    setCurrentCommentId(null);
  };

  return (
    <>
      <div className="comments-area">
        {!loadComments && commentCount && (
          <div className="post-comments-collapsed">
            <button class="button-wrapper" title="Show comments">
              <span
                class="button icon-button button-secondary button-white"
                tabIndex="-1"
              >
                <img className="icon" src="/icons/comment.svg" />
                {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
              </span>
            </button>
          </div>
        )}
        <div className="comments">
          {comments.map((comment) => {
            const isCommentAuthor = comment.author.id == currentUser.id;
            return (
              <div key={comment.commentId} className="comment">
                <div
                  className="comment-author-avatar"
                  style={{
                    backgroundImage:
                      comment.author.avatarThumbUrl &&
                      `url(${comment.author.avatarThumbUrl})`,
                  }}
                />
                <div>
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
                  <div className="comment-action-button">Reply</div>
                )}
              </div>
            );
          })}
        </div>
        <div className="comment-textarea-wrapper">
          <textarea
            ref={textareaRef}
            className="textarea comment-textarea"
            rows={isTextareaFocused ? 2 : 1}
            placeholder="Add a comment"
            onFocus={() => setIsTextareaFocused(true)}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
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
