import React from "react";

function InviteIcon({ style, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      style={style}
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
      <path d="M12 8L12 16"></path>
      <path d="M8 12L16 12"></path>
    </svg>
  );
}

export default InviteIcon;
