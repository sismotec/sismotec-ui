import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Api from '../Api'
import LoginEpic from './LoginObservable'

const rootEpic = combineEpics(
  LoginEpic,
);

export default createEpicMiddleware(rootEpic, {
  dependencies: { Api },
});
