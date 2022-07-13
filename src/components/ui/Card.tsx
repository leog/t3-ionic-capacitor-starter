import React from "react";

const Card = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <div {...props} className={`max-w-xl ${className}`}>
    <div className="bg-white shadow-md rounded-b-xl dark:bg-black">
      {children}
    </div>
  </div>
);

export default Card;
