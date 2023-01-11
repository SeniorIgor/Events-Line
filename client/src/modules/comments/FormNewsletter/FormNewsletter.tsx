import { ChangeEventHandler, FC, FormEventHandler, memo, useCallback, useEffect, useState } from 'react';

import Loader from '@/src/components/loader/Loader';
import { useMutate } from '@/src/hooks';
import { subscribeNewsletter } from '@/src/services/newsletter';

import { notification } from './FormNewsletter.data';
import { FormNewsletterState } from './FormNewsletter.types';

import styles from './FormNewsletter.module.scss';

const initialState: FormNewsletterState = {
  email: '',
  error: null,
  message: null,
};

const FormNewsletter: FC = () => {
  const [state, setState] = useState<FormNewsletterState>(initialState);

  const { onMutate } = useMutate({
    notification,
    requestHandler: subscribeNewsletter,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const { name, value } = event.target;

    setState((prev) => ({ ...prev, [name]: value, error: null }));
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      if (!state.email) {
        return;
      }

      onMutate(state.email);
    },
    [state.email, onMutate],
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state.message) {
      timer = setTimeout(() => setState((prev) => ({ ...prev, message: null })), 5000);
    }

    return () => clearTimeout(timer);
  }, [state.message]);

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      {/* {state.error && <p className={styles.error}>{state.error}</p>} */}
      {/* {state.message && <p className={styles.success}>{state.message}</p>} */}

      <form onSubmit={handleSubmit}>
        <div className={styles.control}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            aria-label="Your email"
            value={state.email}
            onChange={handleChange}
          />
          <button type="submit" className={styles.button} disabled={state.isLoading}>
            Register
            {state.isLoading && <Loader />}
          </button>
        </div>
      </form>
    </section>
  );
};

export default memo(FormNewsletter);
