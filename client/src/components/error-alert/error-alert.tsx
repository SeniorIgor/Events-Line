import { FC, memo } from 'react';

import { ErrorAlertProps } from './error-alert.types';

import styles from './error-alert.module.scss';

const ErrorAlert: FC<ErrorAlertProps> = ({ children }) => {
  return <div className={styles.alert}>{children}</div>;
};

export default memo(ErrorAlert);
