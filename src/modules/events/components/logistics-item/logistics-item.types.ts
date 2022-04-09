import { FC, ReactNode, SVGProps } from 'react';

export interface LogisticsItemProps {
  Icon: FC<SVGProps<SVGElement>>;
  children: ReactNode;
}
