import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-immutable';
import rootReducer from './reducers';
import sagas from './sagas';

// Redux console logger
const logger = createLogger({ collapsed: true });

// Redux DevTools Extension for Chrome and Firefox
/* eslint-disable no-underscore-dangle */
const reduxDevTool = () =>
  typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

export default function configureStore(initialState) {
  const isDev = process.env.NODE_ENV === 'development';
  const sagaMiddleware = createSagaMiddleware();
  const initialReducer = combineReducers(rootReducer);
  let middlewares = [sagaMiddleware];
  let composedStoreEnhancer = null;

  if (isDev) {
    middlewares = applyMiddleware(...middlewares.concat([logger]));
    composedStoreEnhancer = compose(
      middlewares,
      reduxDevTool()
    );
  } else {
    middlewares = applyMiddleware(...middlewares);
  }

  const store = composedStoreEnhancer
    ? composedStoreEnhancer(createStore)(initialReducer, initialState)
    : createStore(initialReducer, initialState, middlewares);

  if (isDev && module.hot) {
    module.hot.accept('./store', () => {
      /* eslint-disable-next-line */
      const nextRootReducer = require('./store');
      store.replaceReducer(nextRootReducer);
    });
  }
  sagaMiddleware.run(sagas);
  return store
}
