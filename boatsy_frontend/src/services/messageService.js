class messageService {
    /**
     *
     * @param {httpClient} client
     */
    constructor(client) {
        this.client = client;
    }

    async getRooms(body) {
        return this.client.post("api/business/captain/v1/chat/room/list",body);
    }

    async getMessages(body) {
        return this.client.post("api/business/captain/v1/chat/message/list",body)
    }
    async setMessages(body) {
        return this.client.post("api/business/captain/v1/chat/message/send",body)
    }
    async setMessageForBoatSupport(body) {
        return this.client.post("api/business/captain/v1/message/setmessageforboatsupport",body)
    }

}

export default messageService;
