import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'leaflet/dist/leaflet.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'leaflet/dist/leaflet.css'
import 'flag-icon-css/css/flag-icon.min.css'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './navigation/router'
Vue.use(VueMeta)
import Prototype from './prototype/Prototype'
import store from './store/store.js'

//---------> CSS IMPORT <---------------
import '../public/styles/blog.css'
import '../public/styles/bootstrap.css'
import '../public/styles/bootstrap.min.css'
import '../public/styles/color-aqua.css'
import '../public/styles/color-beige.css'
import '../public/styles/color-blue.css'
import '../public/styles/color-gray.css'
import '../public/styles/color-green.css'
import '../public/styles/color-green-2.css'
import '../public/styles/color-navy.css'
import '../public/styles/color-orange.css'
import '../public/styles/color-peach.css'
import '../public/styles/color-purple.css'
import '../public/styles/color-red.css'
import '../public/styles/color-violet.css'
import '../public/styles/custom.css'
import '../public/styles/daterangepicker.css'
import '../public/styles/flexslider.css'
import '../public/styles/jquery.mmenu.all.css'
import '../public/styles/leaflet.css'
import '../public/styles/style.css'
import '../public/styles/header.css'
import '../public/styles/tables.css'
import '../public/styles/vendors.css'
import '../public/styles/vendors.unminified.css'
import '../public/styles/icon_fonts/css/all_icons.css'
import '../public/styles/icon_fonts/css/all_icons.min.css'
import '../public/styles/icon_fonts/css/fontello-codes.css'
import '../public/styles/icon_fonts/css/icon_set_1.css'
import '../public/styles/icon_fonts/css/icon_set_2.css'
import '../public/styles/icon_fonts/css/icon_set_3.css'
import '../public/styles/icon_fonts/css/icon_set_4.css'
import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import Multiselect from 'vue-multiselect'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@morioh/v-lightbox/dist/lightbox.css'
import 'vue-select/dist/vue-select.css';

import VueSweetalert2 from 'vue-sweetalert2'
Vue.use(VueSweetalert2)

import Notifications from 'vue-notification'
Vue.use(Notifications)

window.$ = window.jQuery = require('jquery')

import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
Vue.use(VModal, { dialog: true })

//----------- COMPONENT IMPORT ------------------------
import Footers from './layouts/Footers.vue'
Vue.component('footers', Footers)

import Headers from './layouts/Headers.vue'
Vue.component('headers', Headers)

import BoatCardVertical from './components/BoatCardVertical.vue'
Vue.component('boat-card-vertical', BoatCardVertical)

import BoatCardsHorizontal from './components/BoatCardsHorizontal.vue'
Vue.component('boat-cards-horizontal', BoatCardsHorizontal)

import CreateAccount from './components/CreateAccount.vue'
Vue.component('create-account-card', CreateAccount)

import LoginCard from './components/LoginCard.vue'
Vue.component('login-card', LoginCard)

import NonAuthSendBookingModal from './components/LoginCard.vue'
Vue.component('non-auth-send-booking', NonAuthSendBookingModal)

import VerifyCard from './components/VerifyCodeCard.vue'
Vue.component('verify-code-card', VerifyCard)

import InformationModal from './components/InformationModal.vue'
Vue.component('information-modal', InformationModal)

import vSelect from 'vue-select'

Vue.component('v-select', vSelect) 

import BoatDatepicker from './components/BoatDetailDatepicker.vue'
Vue.component("BoatDatepicker",BoatDatepicker)

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Lightbox from '@morioh/v-lightbox'
Vue.use(Lightbox)
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

Vue.component('vue-phone-number-input', VuePhoneNumberInput)

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

import tdColor from './pages/cms/captainList/comps/tdColor.vue'

import thFilter from './pages/cms/captainList/comps/thFilter.vue'
import tdEmail from './pages/cms/captainList/comps/tdEmail.vue'
import tdCreatetime from './pages/cms/captainList/comps/tdCreatetime.vue'
import thCreatetime from './pages/cms/captainList/comps/thCreatetime.vue'
import tdOpt from './pages/cms/captainList/comps/tdOpt.vue'
import tdBoatOpt from './pages/cms/captainList/comps/tdBoatOpt.vue'
import tdBoatDocuments from './pages/cms/captainList/comps/tdBoatDocuments.vue'
import nestedDisplayRow from './pages/cms/captainList/comps/nested-DisplayRow.vue'
import tdStatus from './pages/cms/captainList/comps/tdStatus.vue'
import tdBoatStatus from './pages/cms/captainList/comps/tdBoatStatus.vue'
import thFilterStatus from './pages/cms/captainList/comps/thFilterStatus.vue'
import thFilterBoatStatus from './pages/cms/captainList/comps/thFilterBoatStatus.vue'
import thFilterInt from './pages/cms/captainList/comps/thFilterInt.vue'
import thFilterDateRange from './pages/cms/captainList/comps/thFilterDateRange.vue'
import tdDesc from './pages/cms/captainList/comps/tdDesc.vue'
import tdBoatPersonerType from './pages/cms/captainList/comps/tdBoatPersonerType.vue'
import tdBoatType from './pages/cms/captainList/comps/tdBoatType.vue'
import thFilterSelectBox from './pages/cms/captainList/comps/thFilterSelectBox.vue'
import tdPersoncapacity from './pages/cms/captainList/comps/tdPersoncapacity.vue'
import CMSCaptainProfileCard from './pages/cms/captainList/comps/CMSCaptainProfileCard.vue'
import thFilterBookingStatus from './pages/cms/captainList/comps/thFilterBookingStatus.vue'
import tdBookingStatus from './pages/cms/captainList/comps/tdBookingStatus.vue'
import tdBookOpt from './pages/cms/captainList/comps/tdBookOpt.vue'
import VueCardFormat from 'vue-credit-card-validation';
Vue.use(VueCardFormat);
import boatList from './pages/cms/captainList/boatList.vue'
Vue.component('tdColor', tdColor)
Vue.component('tdOpt', tdOpt)
Vue.component('tdBoatOpt', tdBoatOpt)
Vue.component('thCreatetime', thCreatetime)
Vue.component('tdCreatetime', tdCreatetime)
Vue.component('tdEmail', tdEmail)
Vue.component('thFilter', thFilter)
Vue.component('DisplayRow', nestedDisplayRow)
Vue.component('tdStatus', tdStatus)
Vue.component('thFilterStatus', thFilterStatus)
Vue.component('thFilterInt', thFilterInt)
Vue.component('thFilterDateRange', thFilterDateRange)
Vue.component('CMSCaptainProfileCard', CMSCaptainProfileCard)
Vue.component('BoatTable', boatList)
Vue.component('tdBoatDocuments', tdBoatDocuments)
Vue.component('tdDesc', tdDesc)
Vue.component('tdBoatPersonerType', tdBoatPersonerType)
Vue.component('thFilterSelectBox', thFilterSelectBox)
Vue.component('tdBoatType', tdBoatType)
Vue.component('tdPersoncapacity', tdPersoncapacity)
Vue.component('tdBoatStatus', tdBoatStatus)
Vue.component('thFilterBoatStatus', thFilterBoatStatus)
Vue.component('tdBookingStatus', tdBookingStatus)
Vue.component('thFilterBookingStatus', thFilterBookingStatus)
Vue.component('tdBookOpt', tdBookOpt)

import Datatable from 'vue2-datatable-component'

import  btnStyleAirBnb  from './pages/boatAddOrEdit/comps/btnStyleAirBnb.vue'
import  inputStyleAirBnb  from './pages/boatAddOrEdit/comps/inputStyleAirBnb.vue'
import  boatType  from './pages/boatAddOrEdit/comps/boatType.vue'
import  boatInfo  from './pages/boatAddOrEdit/comps/boatInfo.vue'
import  locationsSelect  from './pages/boatAddOrEdit/comps/locationsSelect.vue'
import  imageUpload  from './pages/boatAddOrEdit/comps/imageUpload.vue'
Vue.component('btnStyleAirBnb', btnStyleAirBnb)
Vue.component('inputStyleAirBnb', inputStyleAirBnb)
Vue.component('boatType', boatType)
Vue.component('boatInfo', boatInfo)
Vue.component('locationsSelect', locationsSelect)
Vue.component('imageUpload', imageUpload)
Vue.use(Datatable)

const options = {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.62,
  showCloseButtonOnHover: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

Vue.use(Toast, options)
import VCalendar from 'v-calendar'
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',
})

import VueI18n from "vue-i18n";
Vue.use(VueI18n);
import i18n from "./plugins/i18n.js";

Vue.use(VueI18n);
// Socket
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

const socket = io('wss://boatsy.net:8091')

Vue.use(VueSocketIOExt, socket)



import ScrollLoader from 'vue-scroll-loader'
Vue.use(ScrollLoader)
Prototype.init().then(() => {
  new Vue({
    i18n,
    store,
    sockets: {
      connect() {
        this.$socket.$subscribe('message', (payload) => {
       
        })
        if (localStorage.getItem('profileModel') != null) {
          this.$socket.client.emit(
            'joinRoom',
            JSON.parse(localStorage.getItem('profileModel')).id,
          )
          this.$socket.$subscribe('backmessage', (payload) => {
            payload.this = this
            this.$store.commit('addMessageforSocket', payload)
          })
        }
      },
      customEmit(val) {
        console.log(
          'this method was fired by the socket server. eg: io.emit("customEmit", data)',
        )
      },
      methods: {
        clickButton(val) {
          // this.$socket.client is `socket.io-client` instance
          //this._vm.$socket.client.emit('messageBackgound', val)
          //console.log(this._vm.$socket.client.emit('messageBackgound', val))
        },
      },
    },
    mounted() {},
    created() {},
    destroyed() {},
    router,
    render: (h) => h(App),
  }).$mount('#app')
})
