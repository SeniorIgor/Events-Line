import { UseMutateState, UseMutateStateError } from './useMutate.types';

interface SubmitFormRequest {
  type: 'SUBMIT_FORM_REQUEST';
}

interface SubmitFormSuccess {
  type: 'SUBMIT_FORM_SUCCESS';
}

interface SubmitFormFailure {
  type: 'SUBMIT_FORM_FAILURE';
  payload: UseMutateStateError;
}

interface SubmitFormReset {
  type: 'SUBMIT_FORM_RESET';
}

export type Actions = SubmitFormRequest | SubmitFormSuccess | SubmitFormFailure | SubmitFormReset;

export const initialState: UseMutateState = { error: null, isLoading: false, isSuccess: false };

const reducer = (state: UseMutateState, action: Actions): UseMutateState => {
  switch (action.type) {
    case 'SUBMIT_FORM_REQUEST':
      return { ...initialState, isLoading: true, error: null };

    case 'SUBMIT_FORM_SUCCESS':
      return { ...state, isLoading: false, isSuccess: true };

    case 'SUBMIT_FORM_FAILURE':
      return { ...state, isLoading: false, error: action.payload };

    case 'SUBMIT_FORM_RESET':
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
