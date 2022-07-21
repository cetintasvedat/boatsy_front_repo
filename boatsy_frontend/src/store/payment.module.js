import Vue from 'vue'

import { CALCULATE_PAYMENT, PAYMENT } from './actions.type.js'
const paymentModule = {
  state: () => ({
    calculatePaymentRequestModel: [],
    installments: [
      {
        InstallmentNumber: 1,
        PerInstallmentAmount: 0,
      },
    ],
    paymentRequestModel: [],
  }),
  mutations: {
    setCalculatePaymentRequestModel(state, value) {
      state.calculatePaymentRequestModel = value
    },
    setPaymentRequestModel(state, value) {
      state.paymentRequestModel = value
    },
  },
  getters: {
    getInstallments: (state) => {
      return state.installments
    },
  },
  actions: {
    [CALCULATE_PAYMENT]: async function ({ state }) {
      var val = await Vue.prototype.$paymentService.calculatePayment(
        state.calculatePaymentRequestModel,
      )
      if (!val.error) {
        state.installments = val.data
      } else {
        if (val.errorMessage == "Kart sanal pos için uygun değil!") {
          Vue.swal.fire( "Girmiş olduğunuz karta taksit imkanı yoktur. Lütfen tek çekim yapınız")

        }else{
          Vue.swal.fire('Hata!', val.errorMessage, 'error')

        }
      }
    },
    [PAYMENT]: async function ({ state }) {
      var val = await Vue.prototype.$paymentService.payment(
        state.paymentRequestModel,
      )
      return val
    },
  },
}
export default paymentModule
