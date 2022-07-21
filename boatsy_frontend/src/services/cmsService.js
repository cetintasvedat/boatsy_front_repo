class profileService {
  /**
   *
   * @param {httpClient} client
   */

  constructor(client) {
    this.client = client
  }

  async getCaptainList(body) {
    var res = await this.client.post('api/cms/captain/list', body)
    return res
  }
  async getBoatList(body) {
    var res = await this.client.post('api/cms/boat/list', body)
    return res
  }
  async dowlandFile(url) {
    var res = await this.client.file(url)

    return res
  }
  async setEditUser(data) {
    var res = await this.client.post('api/cms/edit/profile', data)
    return res
  }
  //https://beta.boatsy.net/cms/approve/boat/524
  async approve(id) {
    var res = await this.client.post('api/cms/approve/boat/' + id)
    return res
  }
  async reject(id) {
    var res = await this.client.post('api/cms/reject/boat/' + id)
    return res
  }
  async setBoat(body) {
    var res = await this.client.post('api/business/captain/v1/boat/set', body)
    return res
  }
  async setBoatRules(body) {
    var res = await this.client.post('api/business/captain/v1/files/boat/rules/set',body)
    return res
  }
  async setBoatFeatures(body) {
    var res = await this.client.post('api/business/captain/v1/features/group/set', body)
    return res
  }
  async getAllBookings(body) {
    var res = await this.client.post('api/business/bookings',body)
    return res
  }
}

export default profileService
