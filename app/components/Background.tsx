import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Background = ({ children, ...props }: Props) => {
  return <div {...props}>{children}</div>;
};

export default Background;
