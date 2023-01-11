import { FormCommentState } from './FormComment.types';

type Validate = (value: string) => boolean;

type CheckedField = Omit<FormCommentState, 'eventId' | 'isError' | 'isLoading'>;

export const textFieldIsValid: Validate = (text) => {
  return Boolean(text && text.trim());
};

export const emailIsValid: Validate = (email) => {
  return textFieldIsValid(email) && email.includes('@');
};

const fieldsCheck: Record<keyof CheckedField, Validate> = {
  email: emailIsValid,
  name: textFieldIsValid,
  message: textFieldIsValid,
};

export const checkAllFields = (state: FormCommentState): boolean => {
  return (Object.entries(state) as Entries<CheckedField>).reduce<boolean>((res, [name, value]) => {
    const fieldName = name as keyof CheckedField;

    return res && (!fieldsCheck[fieldName] || fieldsCheck[fieldName](value));
  }, true);
};

export const getInitialFormState = (eventId: string): FormCommentState => ({
  eventId,
  message: '',
  email: '',
  name: '',
});
