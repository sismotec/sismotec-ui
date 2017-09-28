import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';

// creates the store
export default (rootReducer, middlewares) => {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
    compose(
      applyMiddleware(...middlewares),
      autoRehydrate()
    )
  )

  return store
}
