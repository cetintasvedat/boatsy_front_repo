class boatService {
  /**
   *
   * @param {httpClient} client
   */
  constructor(client) {
    this.client = client
  }

  async getBoatByFilter(body) {
    return await this.client.post('public/boat/list', body)
  }
  async getBoatByFilterForCMS(body) {
    return await this.client.post('api/cms/boat/detay', body)
  }

  async set(body) {
    return await this.client.post('api/company/set', body)
  }

  async delete(body) {
    return await this.client.post('api/company/delete', body)
  }

  async getBoatComment(body) {
    return await this.client.post(
      'public/business/comment/v1/filter/getallboatcomment',
      body,
    )
  }

  async getBoatType(body) {
    return await this.client.post(
      'public/business/captain/v1/boattype/list',
      body,
    )
  }
  async uploadImage(body) {
    return await this.client.post(
      'api/business/captain/v1/boat/set/images',
      body,
    )
  }
  async getLocation(body) {
    return await this.client.post('public/business/country/get', body)
  }

  async getCaptainDetail(body) {
    return await this.client.post(
      'public/business/boat/v1/getprofilebyid',
      body,
    )
  }


  async getPopularBoat(body) {
    return await this.client.post('public/boat/popular', body)
  }

  async getBoatFeaturesWithBoatTeypeId(body) {
    return await this.client.post(
      'api/business/captain/v1/features/group/list',
      body,
    )
  }

  async getBoatFeatures(body) {
    return await this.client.post(
      'public/business/captain/v1/features/boat/list',
      body,
    )
  }

  async getBoatRules(body) {
    return await this.client.post(
      'public/business/boat/v1/getboatrulesbyId',
      body,
    )
  }

  async getCaptainComment(body) {
    return await this.client.post(
      'public/business/comment/v1/filter/getallusercomment',
      body,
    )
  }

  async getfilterbookbyallmonththreetange(body) {
    return await this.client.post(
      'public/business/captain/v1/boat/tariff/date/status',
      body,
    )
  }

  async getCaptainRate(body) {
    return await this.client.post(
      'public/business/comment/v1/filter/getallusercomment',
      body
    )
  }

  async getCurrency(body) {
    return await this.client.post('public/currency/getall')
  }
  async getLikedBootByFilter(body) {
    return await this.client.post('api/business/boat/liked/list', body)
  }
  async setLikeBoat(body) {
    return await this.client.post('api/business/user/boat/liked/set', body)
  }
  Î
  async setBoatImages(
    body, onSendProgress, onReceiveProgress) {
    return await this.client.post('api/business/captain/v1/boat/set/images', body, onSendProgress, onReceiveProgress);

  }
  async setImagePath(body) {
    return await this.client.post('api/business/captain/v1/boat/setimagepath', body)

  }

  async deleteImagePath(body) {
    return await this.client.post('api/business/captain/v1/boat/setdeleteimagepath', body)

  }

  async setBlockDay(body) {
    return await this.client.post('api/business/captain/v1/suitableday/set', body)

  }
  async deleteBlockDay(body) {
    return await this.client.post('api/business/captain/v1/suitableday/delete', body)

  }

  async setCustomPrice(body) {
    return await this.client.post('api/business/captain/v1/boat/tariff/set/all', body)

  }

  async getUnapprovedBoatCount() {
    return await this.client.post('api/cms/getunapprovedboatcount')
  }

  async getApprovedBoatCount() {
    return await this.client.post('api/cms/getapprovedboatcount')
  }

  async getBoatsWithMissingDocumentsCount() {
    return await this.client.post('api/cms/getboatswithmissingdocumentscount')
  }

  async getUsersCount() {
    return await this.client.post('api/cms/getuserscount')
  }

  async getCaptainCount() {
    return await this.client.post('api/cms/getcaptaincount')
  }
}

export default boatService
