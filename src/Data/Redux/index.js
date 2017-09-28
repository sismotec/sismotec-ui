import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import epicMiddleware from '../Observables'

export default (middlewares) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    user: require('./LoginRedux').reducer,
    needs: require('./NeedsRedux').reducer,
    orders: require('./OrdersRedux').reducer,
    resources: require('./ResourcesRedux').reducer,
  })
  
  return configureStore(rootReducer, [epicMiddleware, ...middlewares])
}
