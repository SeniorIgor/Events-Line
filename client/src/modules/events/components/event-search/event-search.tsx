import { ChangeEventHandler, FC, FormEventHandler, useCallback, useState } from 'react';

import Button from '@/src/components/button';

import { months, years } from './event-search.data';
import { EventSearchProps, EventsSearchParams } from './event-search.types';

import styles from './event-search.module.scss';

const initialState: EventsSearchParams = {
  year: years[0],
  month: months[0].id,
};

const EventsSearch: FC<EventSearchProps> = ({ onSearch }) => {
  const [state, setState] = useState<EventsSearchParams>(initialState);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
    const { name, value } = event.target;

    setState((current) => ({ ...current, [name]: value }));
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      if (state.month && state.year) {
        onSearch(state);
      }
    },
    [state, onSearch],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select id="year" name="year" onChange={handleChange} value={state.year}>
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select id="month" name="month" onChange={handleChange} value={state.month}>
            {months.map(({ id, title }) => (
              <option value={id} key={id}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button as="button">Find Events</Button>
    </form>
  );
};

export default EventsSearch;
