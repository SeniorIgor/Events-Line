import { useCallback, useReducer } from 'react';

import { changeNotification } from '@/src/store/features/notification';

import useTypedDispatch from '../useTypedDispatch';

import reducer, { initialState } from './useMutate.state';
import { UseMutateHandler, UseMutateParams, UseMutateResponseError, UseMutateResult } from './useMutate.types';
import { formatMutateStateError } from './useMutate.utils';

/**
 * Занимается управлением состоянием запроса
 *
 * @param params - Объект с параметрами
 * @param params.requestHandler - Метод для отправки запроса
 * @param params.onSuccess - Метод вызывается в успешной отправки запроса
 * @param params.onError - Метод вызывается в случае ошибки отправки запроса
 *
 * @returns result - Состояние и метод
 * @returns result.state - Состояние запроса
 * @returns result.onMutate - Метод для вызова запроса
 */
export const useMutate = <T extends UseMutateHandler>({
  notification,
  onSuccess,
  requestHandler,
  onError,
}: UseMutateParams<T>): UseMutateResult<T> => {
  const dispatch = useTypedDispatch();

  const [state, localDispatch] = useReducer(reducer, initialState);

  const onMutate: UseMutateResult<T>['onMutate'] = useCallback(
    async (...args) => {
      localDispatch({ type: 'SUBMIT_FORM_REQUEST' });
      dispatch(changeNotification(notification.pending()));

      const { data, status } = await requestHandler(...args);

      if (status && status < 300) {
        localDispatch({ type: 'SUBMIT_FORM_SUCCESS' });
        dispatch(changeNotification(notification.success()));

        if (onSuccess) {
          onSuccess(data as Awaited<ReturnType<T>>['data']);
        }

        return undefined;
      }

      const error = formatMutateStateError(data as UseMutateResponseError, status);

      localDispatch({ type: 'SUBMIT_FORM_FAILURE', payload: error });
      dispatch(changeNotification(notification.error(error.message)));

      if (onError) {
        onError(error);
      }

      return undefined;
    },
    [notification, requestHandler, onSuccess, onError, dispatch],
  );

  const onResetErrors = useCallback(() => localDispatch({ type: 'SUBMIT_FORM_RESET' }), []);

  return { state, onMutate, onResetErrors };
};

export * from './useMutate.types';
