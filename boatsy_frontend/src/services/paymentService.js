class paymentService {
    /**
     *
     * @param {httpClient} client
     */
    constructor(client) {
        this.client = client;
    }

   async calculatePayment(body) {
    return this.client.post("business/calculatepayment", body);
    }

   
    async payment(body) {
        return this.client.post( "business/payloadmobil", body);
        }
}

export default paymentService;
