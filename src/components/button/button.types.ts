import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { LinkProps } from 'next/link';

type BaseProps = {
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as: 'button';
  };

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: 'link';
  };

type ButtonAsExternal = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: 'external';
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsExternal;