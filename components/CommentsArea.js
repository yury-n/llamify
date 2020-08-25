import "firebase/firestore";
import database from "firebase/database";
import firebase from "firebase/app";
import { useState, useRef, useContext, useEffect } from "react";
import { ActionsContext, TeamContext, CurrentUserContext } from "../pages";

const firestore = firebase.firestore();

const CommentsArea = ({ postId }) => {
  const { onCommentSubmit } = useContext(ActionsContext);
  const { teamId } = useContext(TeamContext);
  const { currentUser } = useContext(CurrentUserContext);
  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [comments, setComments] = useState([]);

  console.log({ currentUser });

  useEffect(() => {
    fetchComments();
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
    onCommentSubmit({ newComment, teamId, postId });
    setComments([...comments, newComment]);
    clearAndBlurTextarea();
  };

  return (
    <div className="comments-area">
      <div className="comments">
        {comments.map((comment) => (
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
            <div className="comment-reply-button">Reply</div>
          </div>
        ))}
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
  );
};

export default CommentsArea;
