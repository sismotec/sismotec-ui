import { combineEpics } from 'redux-observable';
import { ResourcesRedux } from '../Redux/ResourcesRedux';
import 'rxjs/add/operator/mergeMap';

const resourcesRequestEpic = (action$, store, { Api }) =>
  action$
    .ofType(ResourcesRedux.Types.getRequest)
    .mergeMap(() => (
      Api.resources.get()
        .then(response => response.data)
        .then(result => ResourcesRedux.Creators.getSuccess(result))
        .catch(error => ResourcesRedux.Creators.getError(error))
    ))

export default combineEpics(
  resourcesRequestEpic,
)
