import { combineEpics } from 'redux-observable';
import { NeedsRedux } from '../Redux/NeedsRedux';
import 'rxjs/add/operator/mergeMap';

const needsRequestEpic = (action$, store, { Api }) =>
  action$
    .ofType(NeedsRedux.Types.getOneRequest)
    .mergeMap(({ id }) => (
      Api.needs.getOne(id)
        .then(response => response.data)
        .then(result => NeedsRedux.Creators.getOneSuccess(result))
        .catch(error => NeedsRedux.Creators.getOneError(error))
    ))

const needsCreateEpic = (action$, store, { Api }) =>
  action$
    .ofType(NeedsRedux.Types.createRequest)
    .mergeMap(({ id, data }) => (
      Api.needs.create(id, data)
        .then(response => response.data)
        .then(result => NeedsRedux.Creators.createSuccess(result))
        .catch(error => NeedsRedux.Creators.createError(error))
    ))

const needsUpdateEpic = (action$, store, { Api }) =>
  action$
    .ofType(NeedsRedux.Types.updateRequest)
    .mergeMap(({ id, data }) => (
      Api.needs.update(id, data)
        .then(response => response.data)
        .then(result => NeedsRedux.Creators.updateSuccess(result))
        .catch(error => NeedsRedux.Creators.updateError(error))
    ))

export default combineEpics(
  needsRequestEpic,
  needsCreateEpic,
  needsUpdateEpic,
)
