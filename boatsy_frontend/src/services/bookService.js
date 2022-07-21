class bookService {
    /**
     *
     * @param {httpClient} client
     */
    constructor(client) {
        this.client = client;
    }

    async setBooking(body) {
        return this.client.post("api/business/user/booking/set",body);
    }
    async setNonAuthBooking(body) {
        return this.client.post("public/business/booking/set",body);
    }
    async setNonAuthBookingWithPayment(body) {
        return this.client.post("public/business/booking/set/nonauthwithpayment",body);
    }
    async getAllBooking(body) {
        return this.client.post("api/business/books/getallbooksbyfilter",body)
    }

    async getPublicBookingDetail(body) {
        return this.client.post("public/business/booking/detail",body)
    }

    async cancelRequest(body) {
        return this.client.post("api/business/captain/v1/booking/cancelrequest",body)
    }

    async setBookingComment(body) {
        return this.client.post("api/business/captain/v1/comment/set",body)
    }

    async getBookingComment(body) {
        return this.client.post("api/business/comment/checkcommentforuser",body)
    }

    async getPaidBookingsCount() {
        return this.client.post("api/cms/getpaidbookingscount")
    }

    async getBookingPendingPaymentCount() {
        return this.client.post("api/cms/getbookingpendingpaymentcount")
    }

    async getPendingBookingCount() {
        return this.client.post("api/cms/getpendingbookingcount")
    }
    async editBooking(body) {
        return this.client.post("api/cms/booking/set", body)
    }

}

export default bookService;
