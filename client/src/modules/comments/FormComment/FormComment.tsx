import { ChangeEventHandler, FC, FormEventHandler, memo, useCallback, useEffect, useState } from 'react';

import { FormCommentProps, FormCommentState } from './FormComment.types';
import { checkAllFields, getInitialFormState } from './FormComment.utils';

import styles from './FormComment.module.scss';

const FormComment: FC<FormCommentProps> = ({ eventId, isClearForm, onAddComment }) => {
  const [state, setState] = useState<FormCommentState>(getInitialFormState(eventId));

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => {
    const { name, value } = event.target;

    setState((prev) => ({ ...prev, [name]: value, isError: false }));
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      if (!checkAllFields(state)) {
        setState((prev) => ({ ...prev, isError: true }));
        return;
      }

      onAddComment(state);
    },
    [state, onAddComment],
  );

  useEffect(() => {
    if (isClearForm) {
      setState((prev) => ({ ...prev, email: '', message: '', name: '' }));
    }
  }, [isClearForm]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" name="email" value={state.email} onChange={handleChange} />
        </div>
        <div className={styles.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" value={state.name} onChange={handleChange} />
        </div>
      </div>
      <div className={styles.control}>
        <label htmlFor="message">Your comment</label>
        <textarea id="message" name="message" rows={5} value={state.message} onChange={handleChange} />
      </div>
      {state.isError && <p>Please enter a valid email address and comment!</p>}
      <button type="submit">Save comment</button>
    </form>
  );
};

export default memo(FormComment);
