import api from '@/services/api'

export default {
  signup (credentials) {
    return api().post('api/v1/rest-auth/registration/', credentials)
  },
  login (credentials) {
    return api().post('api/v1/rest-auth/login/', credentials)
  },
  logout () {
    return api().post('api/v1/rest-auth/logout/')
  }
}
