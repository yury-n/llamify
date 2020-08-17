import c from "classnames";

const NewPostsToggle = ({ timeframe, onSetTimeframe }) => {
  return (
    <div className="new-posts-toggle">
      <div
        className={c("toggle-control", timeframe && "active")}
        onClick={() => {
          if (timeframe) {
            onSetTimeframe(null);
          } else {
            onSetTimeframe("week");
          }
        }}
      ></div>
      <div className="label-inline">Show only new posts</div>
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
