import { get } from 'jquery'
import Vue from 'vue'
import httpClient from '../services/basic/httpClient.js'

import {
  LOGIN,
  VERİFY,
  SEND_TOKEN,
  IS_AUTH,
  GET_PROFIL,
  REFRESH_PROFILE,
  OUT,
  EDIT_PROFILE,
  CHANGE_PASSWORD,
  UPDATE_AVATAR,
  UPDATE_IDENTITY,
  SEND_VERİFY,
  FORGET_PASSWORD,
} from './actions.type.js'
const userModule = {
  state: () => ({
    profileModel: {
      id: 0,
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      identificationNumber: '',
      address: '',
      birthday: null,
      password: '',
      aboutMe: '',
      avatar: '',
      taxNumber: '',
      taxType: false,
      phoneTwo: '',
      companyName: '',
      rosette: '',
      dtInsert: null,
      spokenLanguage: [],
      iban: '',
    },
    autModel: {
      token: '',
      email: '',
      password: '',
      error: '',
    },
    routerToApp: true,
  }),
  mutations: {
    setAutModel(state, autModel) {
      state.autModel = autModel
    },
    setProfileModel(state, profileModel) {
      state.profileModel = profileModel
    },
    setProfileEdit(state, value) {
      state.profileModel = value
    },
    setRouterToApp(state, value) {
      state.routerToApp = value;
    }
  },
  getters: {
    getAutModel: (state) => {
      return state.autModel
    },
    getProfileEdit(state, value) {
      state.profileModel = value
    },
    getProfileModel: (state) => {
      if (state.profileModel.id > 0) {
        return state.profileModel
      } else {
        var data = JSON.parse(localStorage.getItem('profileModel') || ' {}')
        if (data.id != undefined) {
          state.profileModel = data
        }

        return state.profileModel
      }
    },
    getRouterToApp:(state) => {
      return state.routerToApp;
    }
  },
  actions: {
    [LOGIN]: async function ({ state }, value) {
      var authResult = await Vue.prototype.$autService.auth(value)
      if (authResult.error) {
        return authResult
      } else {
        var profileResult = await Vue.prototype.$profileService.getProfil()
        if (profileResult.error == true) {
          return {
            error: true,
            message:
              'Kullanıcı profiline erişilemedi!. Lütfen sistem yöneticisine başvurun',
          }
        } else {
          state.profileModel = profileResult.data
          this._vm.$socket.client.emit('joinRoom', profileResult.data.id)
          this._vm.$socket.$subscribe('backmessage', (payload) => {
            value.fn(payload)
          })

          localStorage.setItem(
            'profileModel',
            JSON.stringify(state.profileModel),
          )
          return { error: false, message: 'İşlem başarılı' }
        }
      }
    },
    [VERİFY]: async function ({ state }, code) {
      return await Vue.prototype.$autService.verify(code)
    },
    [SEND_VERİFY]: async function ({ state }) {
      return await Vue.prototype.$autService.sendToken()
    },
    [GET_PROFIL]: async function ({ state }) {
      Vue.prototype.$profileService.getProfil()
    },
    [REFRESH_PROFILE]: async function ({ state }) {
      var profileResult = await Vue.prototype.$profileService.getProfil()
      if (profileResult.error == true) {
        return {
          error: true,
          message:
            'Kullanıcı profiline erişilemedi!. Lütfen sistem yöneticisine başvurun',
        }
      } else {
        state.profileModel = profileResult.data
        state.profileModel.name = profileResult.data.name

        localStorage.setItem('profileModel', JSON.stringify(state.profileModel))
        return { error: false, message: 'İşlem başarılı' }
      }
    },
    [OUT]: async function ({ state }) {
      window.localStorage.removeItem('profileModel')
      window.localStorage.removeItem('token')
      httpClient.token = ''
      state.profileModel = {
        id: 0,
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        identificationNumber: '',
        address: '',
        birthday: null,
        password: '',
        aboutMe: '',
        avatar: '',
        taxNumber: '',
        taxType: false,
        phoneTwo: '',
        companyName: '',
        rosette: '',
        dtInsert: null,
        spokenLanguage: [],
        iban: '',
      }
    },
    [EDIT_PROFILE]: async function ({ state }, body) {
      return await Vue.prototype.$profileService.editProfile(body)
    },
    [CHANGE_PASSWORD]: async function ({ state }, body) {
      return await Vue.prototype.$profileService.changePassword(body)
    },
    [UPDATE_AVATAR]: async function ({ state }, body) {
      return await Vue.prototype.$profileService.updateAvatar(body)
    },
    [UPDATE_IDENTITY]: async function ({ state }, body) {
      return await Vue.prototype.$profileService.updateIdentity(body)
    },
    [FORGET_PASSWORD]: async function ({ state }, body) {
      return await Vue.prototype.$autService.forgetPassword(body)
    },
  },
}
export default userModule
