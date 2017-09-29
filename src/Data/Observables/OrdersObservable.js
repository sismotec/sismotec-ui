import { combineEpics } from 'redux-observable';
import { OrdersRedux } from '../Redux/OrdersRedux';
import 'rxjs/add/operator/mergeMap';

const ordersRequestEpic = (action$, store, { Api }) =>
  action$
    .ofType(OrdersRedux.Types.getOneRequest)
    .mergeMap(({ id }) => (
      Api.orders.getOne(id)
        .then(response => response.data)
        .then(result => OrdersRedux.Creators.getOneSuccess(result))
        .catch(error => OrdersRedux.Creators.getOneError(error))
    ))

const ordersCreateEpic = (action$, store, { Api }) =>
  action$
    .ofType(OrdersRedux.Types.createRequest)
    .mergeMap(({ data }) => (
      Api.orders.create(data)
        .then(response => response.data)
        .then(result => OrdersRedux.Creators.createSuccess(result))
        .catch(error => OrdersRedux.Creators.createError(error))
    ))

// For testing
export const observable = Object.assign({}, {
  ordersRequestEpic,
  ordersCreateEpic,
})

export default combineEpics(
  ordersRequestEpic,
  ordersCreateEpic,
)
