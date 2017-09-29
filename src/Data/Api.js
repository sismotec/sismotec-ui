import { create } from 'axios'

const baseURL = 'http://private-58094-sismotecapi.apiary-mock.com/'

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

const loginRequest = data => api.post('iniciar-sesion', data)
const registerRequest = data => api.post('crear-cuenta', data)

const getOneNeeds = data => {
  if(data) {
    return api.get(`necesidades?lat=${data.lat}&lon=${data.lon}`);
  }
  return api.get('necesidades');
}
const createNeed = (id, data) => api.post(`beneficiarios/necesidades`, {
  id_beneficiarios: id,
  recursos: data,
})
const updateNeed = (id, data) => api.put(`beneficiarios/necesidades`, {
  id_beneficiarios: id,
  recursos: data,
})

const getOneOrders = id => api.get(`centros-acopio/ordenes-envio/${id}`)
const createOrder = (id, data) => api.post(`centros-acopio/ordenes-envio`, data)
const removeOrder = id => api.delete(`centros-acopio/ordenes-envio/`, {
  id_orden: id,
})

const getResources = () => api.get('recursos')

/**
 * Create a collection of the previous functions to be exposed
 */
export default {
  login: {
    loginRequest,
    registerRequest,
  },
  needs: {
    getOne: getOneNeeds,
    create: createNeed,
    update: updateNeed,
  },
  orders: {
    getOne: getOneOrders,
    create: createOrder,
    remove: removeOrder,
  },
  resources: {
    get: getResources,
  },
}
