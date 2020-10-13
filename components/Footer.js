import { isLlamifyDotMe } from "../utils";

const Footer = ({ showPostsForNewsletter }) => {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <div className="footer">
      <div className="llamify-com">{window?.location?.hostname}</div>
      <div className="footer-buttons">
        {isLlamifyDotMe() && (
          <a onClick={showPostsForNewsletter}>for newsletter</a>
        )}
        <a href="https://github.com/yury-n/llamify" target="_blank">
          github
        </a>
        <a
          href="https://docs.google.com/forms/d/1925mzlkhLEle8P7uF14645l9izpuhfCrsrEhBPPtVT0/"
          target="_blank"
        >
          contact
        </a>
      </div>
    </div>
  );
};

export default Footer;
