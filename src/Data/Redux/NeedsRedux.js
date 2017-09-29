import { createActions, createState, createReducer } from 'reduxsauce-crud';

/* ------------- Types and Action Creators ------------- */

export const NeedsRedux = createActions({}, {
  prefix: 'NEEDS_',
  defaultActions: {
    get: true,
    getOne: true,
    create: true,
    update: true,
    reset: true,
    remove: true,
  },
})

const { Types, Creators } = NeedsRedux
export const NeedsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({}, {
  get: true,
  getOne: true,
  create: true,
  update: true,
  remove: true,
})

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {}, {
  defaultActions: {
    get: true,
    getOne: true,
    create: true,
    update: true,
    remove: true,
    reset: true,
  },
  Types,
})
