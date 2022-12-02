import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={260}
      height={350}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <rect x="11" y="30" rx="2" ry="2" width="400" height="208" />
      <rect x="85" y="248" rx="0" ry="0" width="232" height="31" />
      <rect x="15" y="305" rx="0" ry="0" width="410" height="69" />
      <rect x="18" y="408" rx="0" ry="0" width="89" height="26" />
      <rect x="119" y="408" rx="0" ry="0" width="94" height="27" />
      <rect x="267" y="405" rx="0" ry="0" width="164" height="37" />
    </ContentLoader>
  );
};
