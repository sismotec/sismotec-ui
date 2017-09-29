import { createActions, createState, createReducer } from 'reduxsauce-crud';

/* ------------- Types and Action Creators ------------- */

export const ResourcesRedux = createActions({}, {
  prefix: 'RESOURCES_',
  defaultActions: {
    get: true,
  },
})

const { Types, Creators } = ResourcesRedux
export const ResourcesTypes = Types
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
