import { FC, memo } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { ButtonProps } from './button.types';

import styles from './button.module.scss';

const Button: FC<ButtonProps> = ({ className, children, color = 'green', ...props }) => {
  if (props.as === 'link') {
    const { as: _, ...otherProps } = props;
    return (
      <Link {...otherProps}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={cn(styles.btn, styles[`${color}Color`], className)}>{children}</a>
      </Link>
    );
  } else if (props.as === 'external') {
    const { as: _1, ...otherProps } = props;
    return (
      <a
        className={cn(styles.btn, styles[`${color}Color`], className)}
        target="_blank"
        rel="noopener noreferrer"
        {...otherProps}
      >
        {children}
      </a>
    );
  }

  const { as: _2, ...otherProps } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button {...otherProps} className={cn(styles.btn, styles[`${color}Color`], className)}>
      {children}
    </button>
  );
};

export default memo(Button);
