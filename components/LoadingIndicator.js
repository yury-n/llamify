const { useRef, useEffect } = require("react");

const LoadingIndicator = ({ showWithDelay, withWrapper }) => {
  const spinnerDiv = useRef(null);
  useEffect(() => {
    if (showWithDelay) {
      setTimeout(() => {
        if (spinnerDiv.current) {
          spinnerDiv.current.style.opacity = 1;
        }
      }, 1500);
    }
  }, [showWithDelay]);

  const spinner = (
    <div
      ref={spinnerDiv}
      className="spinner-box"
      style={{ opacity: showWithDelay ? 0 : 1 }}
    >
      <div className="circle-border">
        <div className="circle-core"></div>
      </div>
    </div>
  );

  return withWrapper ? (
    <div className="spinner-box-wrapper">{spinner}</div>
  ) : (
    spinner
  );
};

export default LoadingIndicator;
