class sessionService {
    /**
     *
     * @param {httpClient} client
     */
    constructor(client) {
        this.client = client;
    }

    async getUserRoles(isAdmin=false) {
        return this.client.get("api/session/getroles",isAdmin);
    }

    async getUserDetails(isAdmin=false) {
        return this.client.get("api/session/getuser",isAdmin);
    }

    async getCompanyDetails(isAdmin=false) {
        return this.client.get("api/session/getcompanys",isAdmin);
    }
    

}

export default sessionService;
