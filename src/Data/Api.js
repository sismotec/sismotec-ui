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

const getNeeds = id => api.get(`needs/${id}`)
const createNeed = (id, data) => api.post(`needs/${id}`, data)
const updateNeed = (id, data) => api.patch(`needs/${id}`, data)
const removeNeed = id => api.delete(`needs/${id}`)

/**
 * Create a collection of the previous functions to be exposed
 */
export default {
  needs: {
    get: getNeeds,
    getOne: getNeed,
    create: createNeed,
    update: updateNeed,
    remove: removeNeed,
  },
}
