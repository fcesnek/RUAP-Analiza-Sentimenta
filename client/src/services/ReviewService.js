import Api from '@/services/Api'

export default {
  saveReview (params) {
    return Api().post('saveReview', params)
  },
  getReviews () {
    return Api().get('getReviews')
  }
}
