import React from "react";
import ContentLoader from "react-content-loader";

import styles from "./PizzaBlock.module.scss";

export const PizzaBlockSkeleton: React.FC = (props) => (
  <div className={styles.item}>
    <ContentLoader speed={2} width={282} height={513} viewBox="0 0 282 513" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
      <circle cx="139" cy="139" r="139" />
      <rect x="0" y="286" rx="10" ry="10" width="100%" height="27" />
      <rect x="0" y="322" rx="10" ry="10" width="100%" height="88" />
      <rect x="0" y="455" rx="10" ry="10" width="118" height="30" />
      <rect x="164" y="419" rx="30" ry="30" width="118" height="92" />
    </ContentLoader>
  </div>
);
