import React from "react";
import IconsSVG from "./icons.svg";

function Icons({ name, color, size, className }) {
  return (
    <svg
      className={`${className}`}
      fill={color}
      stroke={color}
      width={size}
      height={size}
    >
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  );
}

export default Icons;
