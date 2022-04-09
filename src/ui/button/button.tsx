import cn from "classnames";
import Link from "next/link";
import { FC, memo } from "react";

import { ButtonProps } from "./button.types";

import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  if (props.as === 'link') {
    const { as, ...otherProps } = props;
    return (
      <Link {...otherProps}>
        <a className={cn(styles.btn, className)}>{children}</a>
      </Link>
    );
  } else if (props.as === 'external') {
    const { as, ...otherProps } = props;
    return (
      <a
        className={cn(styles.btn, className)}
        target="_blank"
        rel="noopener noreferrer"
        {...otherProps}
      >
        {children}
      </a>
    );
  }

  const { as, ...otherProps } = props;

  return (
    <button {...otherProps} className={cn(styles.btn, className)}>
      {children}
    </button>
  );
};

export default memo(Button);
