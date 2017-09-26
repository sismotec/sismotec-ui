import { createStore, applyMiddleware } from 'redux'

// creates the store
export default (rootReducer, middlewares) => {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
    applyMiddleware(...middlewares),
  )

  return store
}
