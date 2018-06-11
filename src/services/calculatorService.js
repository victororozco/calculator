import api from '@/services/api'

export default {
  histories (token) {
    return api().get('api/v1/rest-auth/histories/', token)
  },
  save (data) {
    return api().post('api/v1/rest-auth/histories/', data)
  }
}
