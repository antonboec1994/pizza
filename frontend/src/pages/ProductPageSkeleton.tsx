import React from "react";
import ContentLoader from "react-content-loader";

export const ProductPageSkeleton: React.FC = (props) => (
  <ContentLoader speed={2} width={900} height={513} viewBox="0 0 800 513" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
    <circle cx="150" cy="150" r="150" />
    <rect x="320" y="0" rx="10" ry="10" width="400" height="30" />
    <rect x="320" y="47" rx="30" ry="30" width="400" height="100" />
    <rect x="279" y="275" rx="0" ry="0" width="5" height="1" />
    <rect x="160" y="269" rx="0" ry="0" width="0" height="2" />
    <rect x="320" y="163" rx="10" ry="10" width="100" height="30" />
    <rect x="320" y="215" rx="21" ry="21" width="130" height="44" />
    <rect x="17" y="317" rx="20" ry="20" width="700" height="100" />
  </ContentLoader>
);
