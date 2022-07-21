class notificationService {
    /**
     *
     * @param {httpClient} client
     */
    constructor(client) {
        this.client = client;
    }

  
    
    async getNotification(){
      return this.client.post("api/business/notification/getall")
    }

    async getUnreadMessageCount(){
      return this.client.post("api/business/notification/unreadmessagecount")

    }
    async getNotificationSetting(){
      return this.client.post("api/business/notificationsetting/get")

    }
    async setNotificationSetting(body) {
      return this.client.post("api/business/notificationsetting/set", body);
    }

}

export default notificationService;
