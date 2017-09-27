import { createActions, createState, createReducer } from 'reduxsauce-crud';

/* ------------- Types and Action Creators ------------- */

export const LoginRedux = createActions({
  loginRequest: ['data'],
  loginSuccess: ['result'],
  loginError: ['error'],
  registerRequest: ['data'],
  registerSuccess: ['result'],
  registerError: ['error'],
  logout: null,
}, {
  prefix: 'LOGIN_',
});

const { Types, Creators } = LoginRedux;
export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({
  fetching: false,
  userId: null,
  isCollectionCenter: false,
  authToken: null,
  error: null,
});

/* ------------- Reducers ------------- */

const request = state => state.merge({ fetching: true });
const success = (state, { userId, isCollectionCenter }) => state.merge({ fetching: false, userId, isCollectionCenter, error: null });
const error = (state, { error }) => state.merge({ fetching: false, error });
const logout = state => state.merge({ userId: null, });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.loginRequest]: request,
  [Types.loginSuccess]: success,
  [Types.loginError]: error,
  [Types.registerRequest]: request,
  [Types.registerSuccess]: success,
  [Types.registerError]: error,
  [Types.logout]: logout,
});
