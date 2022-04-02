type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface MonthItem {
  id: string;
  title: Month;
}

export interface EventsSearchParams {
  year: string;
  month: string;
}

export type SearchEventHandler = (params: EventsSearchParams) => void;

export interface EventSearchProps {
  onSearch: SearchEventHandler;
}
