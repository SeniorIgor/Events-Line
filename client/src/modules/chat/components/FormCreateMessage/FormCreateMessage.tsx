import { ChangeEventHandler, FC, FormEventHandler, memo, useCallback, useState } from 'react';

import Button from '@/src/components/button';
import useTypedDispatch from '@/src/hooks/useTypedDispatch';
import { sendMessage } from '@/src/store/features/chat';

import styles from './FormCreateMessage.module.scss';

interface FormCreateMessageProps {
  className?: string;
}

export interface FormCreateMessageState {
  message: string;
}

const initialState: FormCreateMessageState = {
  message: '',
};

const FormCreateMessage: FC<FormCreateMessageProps> = ({ className }) => {
  const [state, setState] = useState<FormCreateMessageState>(initialState);

  const dispatch = useTypedDispatch();

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    const { name, value } = event.target;

    setState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      if (state.message) {
        dispatch(sendMessage(state.message));
        setState({ message: '' });
      }
    },
    [state.message, dispatch],
  );

  return (
    <form className={cn(styles.root, className)} onSubmit={handleSubmit}>
      <div className={styles.control}>
        <label htmlFor="message">Your message</label>
        <textarea id="message" name="message" rows={5} value={state.message} onChange={handleChange} />
      </div>
      <Button as="button" type="submit" color="white" className={styles.button}>
        Send
      </Button>
    </form>
  );
};

export default memo(FormCreateMessage);
