import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { LinkProps } from 'next/link';

export type ButtonColor = 'white' | 'green';

type ButtonBaseProps = {
  className?: string;
  color?: ButtonColor;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as: 'button';
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<LinkProps, keyof ButtonBaseProps> & {
    as: 'link';
  };

type ButtonAsExternal = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'external';
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsExternal;
