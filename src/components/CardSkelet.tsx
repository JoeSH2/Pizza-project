import React, { FC } from "react";
import ContentLoader from "react-content-loader";

const CardSkelet: FC = (props) => (
  <ContentLoader
    className="menu__block"
    speed={2}
    width={275}
    height={472}
    viewBox="0 0 275 472"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="235" y="258" rx="0" ry="0" width="1" height="1" />
    <circle cx="138" cy="120" r="120" />
    <rect x="21" y="280" rx="5" ry="5" width="239" height="26" />
    <rect x="0" y="330" rx="10" ry="10" width="275" height="80" />
    <rect x="166" y="435" rx="5" ry="5" width="108" height="31" />
    <rect x="0" y="435" rx="5" ry="5" width="108" height="31" />
  </ContentLoader>
);

export default CardSkelet;
