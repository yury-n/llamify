import React from "react";

function EditIcon({ style, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      style={style}
      className={className}
    >
      <path d="M14 2L18 6 7 17 3 17 3 13 14 2z"></path>
      <path d="M3 22L21 22"></path>
    </svg>
  );
}

export default EditIcon;
