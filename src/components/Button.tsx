import React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

const Button = ({
  children,
  className = "",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
