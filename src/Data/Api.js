import { create } from 'axios'

const baseURL = 'http://sismo-api.herokuapp.com/'

/**
 * Create a new API instance
 */
const api = create({
  baseURL,
  timeout: 10000,
})

/**
 * Define functions that call the api. The goal is to provide a wrapper
 * of the api layer, by providing nicer functions rather than get, post, etc.
 */

const loginRequest = data => api.post('login', data)
const registerRequest = data => api.post('register', data)

const getNeeds = id => api.get(`needs/${id}`)
const createNeed = (id, data) => api.post(`needs/${id}`, data)
const updateNeed = (id, data) => api.patch(`needs/${id}`, data)
const removeNeed = id => api.delete(`needs/${id}`)

const getOrders = id => api.get(`orders/${id}`)
const createOrder = (id, data) => api.post(`orders/${id}`, data)
const updateOrder = (id, data) => api.patch(`orders/${id}`, data)
const removeOrder = id => api.delete(`orders/${id}`)

/**
 * Create a collection of the previous functions to be exposed
 */
export default {
  login: {
    loginRequest,
    registerRequest,
  },
  needs: {
    get: getNeeds,
    create: createNeed,
    update: updateNeed,
    remove: removeNeed,
  },
  orders: {
    get: getOrders,
    create: createOrder,
    update: updateOrder,
    remove: removeOrder,
  },
}
