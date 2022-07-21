class profileService {
  /**
   *
   * @param {httpClient} client
   */

  constructor(client) {
    this.client = client
  }

  async getProfil() {
    return await this.client.post('api/business/captain/v1/profile', null)
  }
  async editProfile(body) {
    return await this.client.post('api/business/user/profile/edit', body)
  }
  async changePassword(body) {
    return await this.client.post('api/business/user/password/change', body)
  }
  async updateAvatar(body) {
    return await this.client.post(
      'api/business/captain/v1/profile/avatar/set',
      body,
    )
  }

  async updateIdentity(body) {
    return await this.client.post(
      'api/business/captain/v1/files/profile/identitycard',
      body,
    )
  }

  async setProfil(body) {
    return await this.client.post('public/user/profile/set', body)
  }
}

export default profileService
