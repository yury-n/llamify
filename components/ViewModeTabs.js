import c from "classnames";

const ViewModeTabs = ({ viewMode, setViewMode }) => {
  return (
    <div className="view-mode-tabs">
      <div
        className={c("view-mode-tab", viewMode === "list" && "active")}
        onClick={() => setViewMode("list")}
      >
        Directory
      </div>
      <div
        className={c("view-mode-tab", viewMode === "feed" && "active")}
        onClick={() => setViewMode("feed")}
      >
        Feed
      </div>
    </div>
  );
};

export default ViewModeTabs;
