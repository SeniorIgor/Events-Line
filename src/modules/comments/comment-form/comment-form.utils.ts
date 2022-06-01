import { CommentFormState } from './comment-form.types';

type Validate = (value: string) => boolean;

export const textFieldIsValid: Validate = (text) => {
  return Boolean(text && text.trim());
};

export const emailIsValid: Validate = (email) => {
  return textFieldIsValid(email) && email.includes('@');
};

const fieldsCheck: Record<keyof CommentFormState, Validate> = {
  email: emailIsValid,
  name: textFieldIsValid,
  message: textFieldIsValid,
};

export const checkAllFields = (state: CommentFormState): boolean => {
  return (Object.entries(state) as Entries<CommentFormState>).reduce<boolean>((res, [name, value]) => {
    return res && fieldsCheck[name as keyof CommentFormState](value);
  }, true);
};
