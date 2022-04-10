import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  memo,
  useCallback,
  useState
} from "react";

import { CommentFormProps, CommentFormState } from "./comment-form.types";
import { checkAllFields } from "./comment-form.utils";

import styles from "./comment-form.module.scss";

const initialFormState: CommentFormState = {
  message: '',
  email: '',
  name: '',
};

const CommentForm: FC<CommentFormProps> = ({ onAddComment }) => {
  const [formState, setFormState] =
    useState<CommentFormState>(initialFormState);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((event) => {
    const { name, value } = event.target;

    setFormState((state) => ({ ...state, [name]: value }));
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      if (!checkAllFields(formState)) {
        setIsInvalid(true);
        return;
      }

      onAddComment(formState);
    },
    [formState, onAddComment]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
        </div>
        <div className={styles.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
        </div>
      </div>
      <div className={styles.control}>
        <label htmlFor="message">Your comment</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          onChange={handleChange}
        />
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Save comment</button>
    </form>
  );
};

export default memo(CommentForm);
