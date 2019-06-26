import Api from '@/services/Api'

export default {
  scoreModel_NN (params) {
    return Api().post('scoreNN', params)
  },
  scoreModel_LR (params) {
    return Api().post('scoreLR', params)
  }
}
