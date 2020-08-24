import { useState, useRef, useContext } from "react";
import { ActionsContext } from "../pages";

const CommentsArea = () => {
  const { onCommentSubmit } = useContext(ActionsContext);
  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const onCancel = () => {
    setTextareaValue("");
    setIsTextareaFocused(false);
    textareaRef.current.blur();
  };

  const onSubmit = () => {
    onCommentSubmit();
  };

  return (
    <div className="comments-area">
      <div className="comments">
        <div className="comment">
          <div
            className="comment-author-avatar"
            style={{
              backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/llamify.appspot.com/o/userAvatars%2F6VeGb1I3PANCkHi4q7EVudv85592%2Fthumb%2FOmDHMXlbFNTWeaqBeabLlie4CaK2.jpeg?alt=media&token=e625ce37-7964-42c5-b0a5-49c595820c6d)`,
            }}
          />
          <div>
            <span className="comment-author-name">Yury</span>
            <span>hello my friend of mine</span>
          </div>
          <div className="comment-reply-button">Reply</div>
        </div>
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
