import c from "classnames";

const TimeframeToggle = ({ timeframe, setTimeframe }) => {
  const toggle = () => {
    if (timeframe) {
      setTimeframe(null);
    } else {
      setTimeframe("week");
    }
  };
  return (
    <div className="timeframe-toggle">
      <div
        className={c("toggle-control", timeframe && "active")}
        onClick={toggle}
      ></div>
      <div className="label-inline" onClick={toggle}>
        Show only new posts
      </div>
      {timeframe && (
        <>
          <button
            className={c("timeframe-tag", timeframe === "week" && "active")}
            onClick={() =>
              timeframe === "week" ? setTimeframe(null) : setTimeframe("week")
            }
          >
            Week
          </button>
          <button
            className={c("timeframe-tag", timeframe === "month" && "active")}
            onClick={() =>
              timeframe === "month" ? setTimeframe(null) : setTimeframe("month")
            }
          >
            Month
          </button>
        </>
      )}
    </div>
  );
};

export default TimeframeToggle;
