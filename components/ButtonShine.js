const ButtonShine = () => (
  <svg
    className="button-shine"
    width="187"
    height="33"
    viewBox="0 0 187 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f)">
      <path
        d="M177 16.5C177 20.0898 139.616 23 93.5 23C47.3842 23 10 20.0898 10 16.5C10 12.9101 47.3842 10 93.5 10C139.616 10 177 12.9101 177 16.5Z"
        fill="url(#paint0_radial)"
      />
    </g>
    <ellipse cx="80" cy="23" rx="41" ry="3" fill="url(#paint1_radial)" />
    <defs>
      <filter
        id="filter0_f"
        x="0"
        y="0"
        width="187"
        height="33"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur" />
      </filter>
      <radialGradient
        id="paint0_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(100.5 19.1093) rotate(90) scale(10.1111 129.889)"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="paint1_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(80 23) rotate(90.0001) scale(2.5 34.1667)"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export default ButtonShine;
