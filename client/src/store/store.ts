import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import { configureStore, EnhancedStore, Middleware } from '@reduxjs/toolkit';

import { base } from '@/src/constants';
import { isDev } from '@/src/utils';

import rootReducer from './features/rootReducer';
import rootSaga from './features/rootSaga';

export interface SagaStore extends EnhancedStore {
  sagaTask: Task;
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Array<Middleware> = [sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat([...middlewares]),
    devTools: isDev ? { name: base.PROJECT_NAME } : false,
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

const wrapperStore = createWrapper<AppStore>(makeStore);

export type { RootState } from './features/rootReducer';

export default wrapperStore;
