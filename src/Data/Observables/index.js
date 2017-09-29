import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Api from '../Api'
import LoginEpic from './LoginObservable'
import NeedsEpic from './NeedsObservable'
import OrdersEpic from './OrdersObservable'
import ResourcesEpic from './ResourcesObservable'

const rootEpic = combineEpics(
  LoginEpic,
  NeedsEpic,
  OrdersEpic,
  ResourcesEpic,
);

export default createEpicMiddleware(rootEpic, {
  dependencies: { Api },
});
