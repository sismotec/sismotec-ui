import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { NeedsRedux } from '../Redux/NeedsRedux'

const crudObservable = createCRUDObservable({
  mainRedux: NeedsRedux,
  reduxPath: 'needs',
})

// For testing
export const observables = Object.assign({}, crudObservable.observables, {})

export default combineEpics(
  crudObservable.epic,
)
