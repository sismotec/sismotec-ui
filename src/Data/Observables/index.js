import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Api from '../Api';

const rootEpic = combineEpics(
  require('./LoginObservable').epic,
);

export default createEpicMiddleware(rootEpic, {
  dependencies: { Api },
});
