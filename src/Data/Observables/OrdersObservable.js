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

// For testing
export const observable = Object.assign({}, {
  ordersRequestEpic,
})

export default combineEpics(
  ordersRequestEpic,
)
