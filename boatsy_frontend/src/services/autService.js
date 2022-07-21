import httpClient from '../services/basic/httpClient'
class autService {
  /**
   *
   * @param {httpClient} client
   */

  constructor(client) {
    this.client = client
  }

  async auth(body) {
    var res = await this.client.basicPost('api/login_check', body)
    if (res.status == 200) {
      httpClient.token = res.data.token
      window.localStorage.setItem('token', res.data.token)
      return { error: false, message: 'İşlem başarılı' }
    } else if (res.status == 401) {
      return { error: true, message: 'Geçersiz kimlik bilgileri.' }
    } else if (res.status == 500) {
      return { error: true, message: 'İşleminiz gerçekleştirilemiyor.' }
    } else if (res.status == 500) {
      return {
        error: true,
        message: 'Bu işlemi gerçekleştirmek için yetkiniz yok.',
      }
    } else {
      return { error: true, message: 'Beklenmedik bir hata oluştu.' }
    }
  }

  async sendToken() {
    var data = await this.client.post('api/business/phone/send/token', '')
    return data
  }

  async verify(code) {
    var data = await this.client.post('api/business/phone/verify', {
      code: code,
    })
    return data
  }

  async forgetPassword(body) {
    return await this.client.post('forgetpasswrd', body)
  }
}

export default autService
