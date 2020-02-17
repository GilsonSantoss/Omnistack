import axios from 'axios'
const url = 'http://localhost:3333'
const android  = '10.0.2.2:3333'

const api = axios.create({
  baseURL: url
})

export default api