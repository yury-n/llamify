import c from "classnames";

const NewPostsToggle = ({ timeframe, onSetTimeframe }) => {
  const toggle = () => {
    if (timeframe) {
      onSetTimeframe(null);
    } else {
      onSetTimeframe("week");
    }
  };
  return (
    <div className="new-posts-toggle">
      <div
        className={c("toggle-control", timeframe && "active")}
        onClick={toggle}
      ></div>
      <div className="label-inline" onClick={toggle}>
        Show only new posts
      </div>
      <button
        className={c("timeframe-tag", timeframe === "week" && "active")}
        onClick={() => onSetTimeframe("week")}
      >
        Week
      </button>
      <button
        className={c("timeframe-tag", timeframe === "month" && "active")}
        onClick={() => onSetTimeframe("month")}
      >
        Month
      </button>
    </div>
  );
};

export default NewPostsToggle;
