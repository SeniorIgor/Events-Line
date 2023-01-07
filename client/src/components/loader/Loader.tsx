import { FC } from 'react';
import cn from 'classnames';

import { LoaderProps } from './Loader.types';

import styles from './Loader.module.scss';

const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <svg className={styles.svg} viewBox="22 22 44 44">
        <circle className={styles.circle} cx="44" cy="44" r="20" fill="none" />
        <linearGradient id="gradient">
          <stop className={styles.mainStop} offset="0%" />
          <stop className={styles.altStop} offset="100%" />
        </linearGradient>
      </svg>
    </div>
  );
};

export * from './Loader.types';
export default Loader;
