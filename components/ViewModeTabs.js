import c from "classnames";
import ListIcon from "./Icons/ListIcon";
import FeedIcon from "./Icons/FeedIcon";
import GridIcon from "./Icons/GridIcon";

const ViewModeTabs = ({ viewMode, setViewMode }) => {
  return (
    <div className="view-mode-tabs">
      <div
        className={c(
          "view-mode-tab",
          "view-mode-tab-list",
          viewMode === "list" && "active"
        )}
        onClick={() => setViewMode("list")}
      >
        <ListIcon /> Directory
      </div>
      <div
        className={c(
          "view-mode-tab",
          "view-mode-tab-grid",
          viewMode === "grid" && "active"
        )}
        onClick={() => setViewMode("grid")}
      >
        <GridIcon /> Grid
      </div>
      <div
        className={c(
          "view-mode-tab",
          "view-mode-tab-feed",
          viewMode === "feed" && "active"
        )}
        onClick={() => setViewMode("feed")}
      >
        <FeedIcon /> Feed
      </div>
    </div>
  );
};

export default ViewModeTabs;
