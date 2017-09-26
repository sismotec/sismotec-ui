import { createActions, createState, createReducer } from 'reduxsauce-polymer'

/* ------------- Types and Action Creators ------------- */

export const LoginRedux = createActions({}, {
  prefix: 'LOGIN_',
  defaultActions: {
    get: true,
  },
})

const { Types, Creators } = LoginRedux
export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({}, {
  get: true,
})

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {}, {
  defaultActions: {
    get: true,
  },
  Types,
})
