import { isLlamifyDotCom } from "../utils";

export default () => {
  if (!isLlamifyDotCom()) {
    return null;
  }
  return (
    <a
      href="https://www.producthunt.com/posts/llamify?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-llamify"
      target="_blank"
      className="product-hunt-button"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=270709&theme=light"
        alt="Llamify - a place to share your off-work moments with colleagues | Product Hunt"
        style={{ width: 250, height: 54 }}
        width="250"
        height="54"
      />
    </a>
  );
};
