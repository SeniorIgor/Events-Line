import { FC, FormEventHandler, memo } from 'react';

import styles from './form-newsletter.module.scss';

const FormNewsletter: FC = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.control}>
          <input type="email" id="email" placeholder="Your email" aria-label="Your email" />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};

export default memo(FormNewsletter);
