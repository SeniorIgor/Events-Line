import { ChangeEventHandler, FC, FormEventHandler, memo, useCallback, useState } from 'react';

import { CommentFormProps, CommentFormState } from './comment-form.types';
import { checkAllFields, getInitialFormState } from './comment-form.utils';

import styles from './comment-form.module.scss';

const CommentForm: FC<CommentFormProps> = ({ eventId, onAddComment }) => {
  const [state, setState] = useState<CommentFormState>(getInitialFormState(eventId));

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

      const clearForm = await onAddComment(state);

      if (clearForm) {
        setState((prev) => ({ ...prev, email: '', message: '', name: '' }));
      }
    },
    [state, onAddComment],
  );

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

export default memo(CommentForm);
