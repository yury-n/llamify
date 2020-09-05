import { SECONDS_IN_WEEK, SECONDS_IN_MONTH } from "./consts";

const getFromTimestamp = (timeframe) => {
  const currentTimestamp = +new Date() / 1000;
  const fromTimestamp =
    timeframe === "week"
      ? currentTimestamp - SECONDS_IN_WEEK
      : currentTimestamp - SECONDS_IN_MONTH;
  return fromTimestamp;
};

export default getFromTimestamp;
