import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import userModule from './user.module.js'
import boatModule from './boat.module.js'
import bookModule from './book.module.js'
import messageModule from './message.module'
import notificationModule from './notification.module'
import paymentModule from './payment.module'
import cmsModule from './cms.module'

export default new Vuex.Store({
  modules: {
    boat: boatModule,
    user: userModule,
    book: bookModule,
    notification: notificationModule,
    payment: paymentModule,
    message: messageModule,
    cms: cmsModule
  },
  state: () => ({
    selectedLang: null
  }),
  mutations: {
    setSelectedLang(state, lang) {
      state.selectedLang = lang;
    },
  },
  getters: {
    getSelectedLang: (state) => {
      return state.selectedLang;
    },
  }
})
