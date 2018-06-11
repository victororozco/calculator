import api from '@/services/api'

export default {
  histories () {
    return api().get('api/v1/rest-auth/operations/')
  },
  save (data) {
    return api().post('api/v1/rest-auth/operations/', data)
  }
}
