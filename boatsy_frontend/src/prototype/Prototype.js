import Vue from 'vue'
import axios from 'axios'
import httpClient from '../services/basic/httpClient'
import boatService from '../services/boatService'
import profileService from '../services/profileService'
import notificationService from '../services/notificationService'
import cmsService from '../services/cmsService'
import autService from '../services/autService'
import bookService from '../services/bookService'
import paymentService from '../services/paymentService'
import messageService from '../services/messageService'
//import GlobalVariables from '../config/GlobalVariables'
import GlobalConfigs from '../config/GlobalConfigs'
import GlobalFunctions from '../config/GlobalFunctions'

import utils from './../vendor/utils'

class Prototype {
  async init() {
    Vue.prototype.$globalFunctions = GlobalFunctions
    Vue.prototype.$globalConfigs = GlobalConfigs
    //Vue.prototype.$globalVariables = GlobalVariables
    Vue.prototype.$utils = utils
    // basic service configire ediliyor.
    var basicService = new httpClient(axios)
    Vue.prototype.$boatService = new boatService(basicService)
    Vue.prototype.$profileService = new profileService(basicService)
    Vue.prototype.$autService = new autService(basicService)
    Vue.prototype.$bookService = new bookService(basicService)
    Vue.prototype.$notificationService = new notificationService(basicService)
    Vue.prototype.$paymentService = new paymentService(basicService)
    Vue.prototype.$messageService = new messageService(basicService)
    Vue.prototype.$cmsService = new cmsService(basicService)
  }
}

export default new Prototype()
