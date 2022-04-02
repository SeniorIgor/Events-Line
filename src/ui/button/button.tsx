import cn from "classnames";
import Link from "next/link";
import { FC, memo } from "react";

import { ButtonProps } from "./button.types";

import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  if (props.as === 'link') {
    return (
      <Link {...props}>
        <a className={cn(styles.btn, className)}>{children}</a>
      </Link>
    );
  } else if (props.as === 'external') {
    return (
      <a
        className={cn(styles.btn, className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button {...props} className={cn(styles.btn, className)}>
      {children}
    </button>
  );
};

export default memo(Button);
