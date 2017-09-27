import { combineEpics } from 'redux-observable'
import { LoginRedux } from '../Redux/LoginRedux'

const loginRequestEpic = (action$, store, { Api }) =>
  action$
    .ofType(LoginRedux.loginRequest)
    .mergeMap(({ data }) => (
      Api.login.loginRequest(data)
        .then(response => response)
        .then(result => LoginRedux.loginSuccess(result))
        .catch(error => LoginRedux.loginError(error))
    ))

const registerRequestEpic = (action$, store, { Api }) =>
  action$
    .ofType(LoginRedux.registerRequest)
    .mergeMap(({ data }) => (
      Api.login.registerRequest(data)
        .then(response => response)
        .then(result => LoginRedux.registerSuccess(result))
        .catch(error => LoginRedux.registerError(error))
    ))

// For testing
export const observable = Object.assign({}, {
  loginRequestEpic,
  registerRequestEpic,
})

export const epic = combineEpics(
  loginRequestEpic,
  registerRequestEpic,
)
