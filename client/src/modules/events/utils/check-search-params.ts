import { EventFilter } from '@/src/types';

export const checkSearchParams = ({ year, month }: EventFilter) => {
  return !(Number.isNaN(year) || Number.isNaN(month) || year > 2030 || year < 2022 || month < 1 || month > 12);
};
