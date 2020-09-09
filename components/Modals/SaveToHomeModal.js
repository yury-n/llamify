const SaveToHomeModal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal save-to-home-modal">
        <img className="modal-x" src="/icons/x.svg" onClick={() => onClose()} />
        <div className="save-to-home-header">
          <img src="/images/logo.svg" />
          <div class="modal-title">Save to Home screen</div>
        </div>
        <div>
          Tap the <img src="/icons/ios-share.svg" className="ios-share-icon" />{" "}
          icon at the bottom of your browser and choose “Add to Home Screen”
        </div>
      </div>
    </div>
  );
};

export default SaveToHomeModal;
