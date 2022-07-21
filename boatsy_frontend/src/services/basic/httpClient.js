import Vue from 'vue'

class httpClient {

  constructor(axios) {
    this.axios = axios
    this.baseURI =
      process.env.NODE_ENV !== 'production' ? 'https://localhost:8001' : ''
  }
  static token = ''
  async get(action, isAdmin = false) {
    var responseData = null
    try {
      var patname = '/' + action
      var requestURI = this.baseURI + patname
      var res = await this.axios.get(requestURI, { withCredentials: false })
      this._validateURI(patname, res.request.responseURL)
      responseData = res.data
      if (responseData.throw != null) {
        console.log(responseData.throw)
      }
    } catch (e) {
      Vue.notify({
        group: 'notification',
        type: 'error',
        title: 'Bir Hata Oluştu!',
        text: 'Lütfen Yöneticinizle İletişime Geçiniz!',
      })
      console.error('Error => ' + e.toString())
    } finally {
      Vue.prototype.$globalConfigs.loading = false

    }

    return responseData
  }
 async file(action){
  this._initRequest()
  try {
    var patname = '/' + action
    var requestURI = this.baseURI + patname
    var res = await this.axios.get(requestURI,{
      responseType: 'blob',
      validateStatus: function (status) {
        return status >= 200 && status < 501
      },

    })
    return res
  } catch (e) {
    return e
  }
 }
  async post(action, data, setCooki = false) {
    this._initRequest(setCooki)
    try {
      var responseData = {
        error: false,
        errorMessage: '',
        data: 7,
        count: 0,
        total: null,
        throw: null,
      }

      var patname = '/' + action
      var requestURI = this.baseURI + patname
      var res = await this.axios
        .post(requestURI, data, { withCredentials: false })
        .catch((error) => {
          return {
            error: true,
            errorMessage: 'invalit password error',
            data: 7,
            count: 0,
            total: null,
            throw: null,
          }
        })
      if (res.status == 302) {
        httpClient.boatsyUserAuthToken = ''
      }
      this._validateURI(patname, res.request.responseURL)
    } catch (e) {}

    try {
      if (res.data.data != undefined) {
        if (res.data.data.data != undefined) {
          var e = false
          if (res.data.data.error == undefined) {
            e = res.data.error
          } else {
            e = res.data.data.error
          }
          res.data = res.data.data
          res.data.error = e
        }
      }

      if (res.data.data == undefined) {
        res.data.data = res.data
      }

      responseData.error = res.data.error ?? true
      responseData.errorMessage = res.data.errorMessage
      responseData.data = res.data.data
      responseData.headers = res.headers
      responseData.count = res.data.count
      responseData.total = res.data.total
      responseData.throw = res.data.throw
      if (responseData.throw != null) {
        console.log(responseData.throw)
      }

      if (res.status == 401) {
      window.localStorage.removeItem('profileModel')
      window.localStorage.removeItem('token')
      this.token = '';
      
        responseData.error = true
        responseData.errorMessage = 'Geçersiz kimlik bilgileri.'

      }
    } catch (e) {
      console.log(e)
    }
    return responseData
  }
  async basicPost(action, data) {
    this._initRequest()

    try {
      var patname = '/' + action
      var requestURI = this.baseURI + patname
      var res = await this.axios.post(requestURI, data, {
        validateStatus: function (status) {
          return status >= 200 && status < 501
        },
      })
      return res
    } catch (e) {
      return e
    }
  }
  _initRequest() {
    if (httpClient.token == '') {
      var token = window.localStorage.getItem('token')
      if (token != null && token != undefined && token != '') {
        httpClient.token = token
      }
    }
    if (httpClient.token != '') {
      this.axios.defaults.headers = {
        Authorization: `Bearer ${httpClient.token}`,
      }
    }
  }

  _validateURI(requestPathName, responseURI) {
    var responseURI = new URL(responseURI)
    if (requestPathName != responseURI.pathname) {
      if (new URL(responseURI).pathname == '/api/login_check') {
        window.location = this.baseURI + '/api/login_check'
      }
    }
  }
}

export default httpClient
