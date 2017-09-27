import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { OrdersRedux } from '../Redux/OrdersRedux'

const crudObservable = createCRUDObservable({
  mainRedux: OrdersRedux,
  reduxPath: 'orders',
})

// For testing
export const observables = Object.assign({}, crudObservable.observables, {})

export default combineEpics(
  crudObservable.epic,
)
