import Api from '@/services/Api'

export default {
  scoreModel_NN (params) {
    return Api().post('scoreNN', params)
  },
  scoreModel_SVM (params) {
    return Api().post('scoreSVM', params)
  }
}
