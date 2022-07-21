<template>
  <div
    class="container payment-page"
    style="margin-top: 130px; text-align: start; min-height: 100vh"
    v-if="getBoatDetailLoading == false"
  >
    <div class="payment-page-left">
      <div class="payment-header">
        <h3 style="font-size:27px; margin-bottom:72px;">
          {{ $t("boat_reservation_outline_wishlist") }}
        </h3>
      </div>

      <TravelInformation
        :currencyValue="getBoatDetail.currencyvalue"
        :dateAndPriceList="dateAndPriceList"
        :boatDetail="getBoatDetail"
      ></TravelInformation>

      <BookingNoteCard :captainDetail="getCaptainDetail"></BookingNoteCard>

      <div class="row paymnet-online" style="padding: 0 0 40px 0">
        <RequestButton
          :captainId="getBoatDetail.userid"
          :boatId="getBoatDetail.id"
          :totalAmount="totalAmount"
        ></RequestButton>
        <div
          class="col-12 reservation-info-header"
          style="padding-bottom: 10px; padding-top: 24px"
        >
          <h4
            style="margin:0;
                  font-size: 18px;
                  font-style: italic;
                  color: rgb(155, 155, 155); "
          >
            {{ $t("booking_detail_canceled_polit") }}
          </h4>
        </div>
        <div class="col-12 cancellation-policy-content">
          <p
            style="margin:0;
                  font-size: 18px;
                  font-style: italic;
                  color: rgb(155, 155, 155);"
          >
            {{ $t("reservation_confirm_explain") }}
          </p>
        </div>
      </div>
    </div>
    <div class="payment-page-right">
      <BookingDetailCard
        :totalAmount="totalAmount"
        :boatDetail="getBoatDetail"
      ></BookingDetailCard>
    </div>
  </div>
  <div class="loading-payment-page" v-else>
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import {
  FETCH_BOAT_DETAIL,
  FETCH_DISABLED_DATES,
} from "../../store/actions.type.js";
import { mapGetters } from "vuex";
import BookingDetailCard from "./components/BookingDetailCard.vue";
import TravelInformation from "./components/TravelInformation.vue";
import BookingNoteCard from "./components/BookingNoteCard.vue";
import RequestButton from "./components/RequestButton.vue";

export default {
  data() {
    return {
      dateAndPriceList: [],
      totalAmount: 0,
    };
  },
  components: {
    BookingDetailCard,
    TravelInformation,
    BookingNoteCard,
    RequestButton,
  },
  computed: {
    ...mapGetters([
      "getBoatDetail",
      "getCaptainDetail",
      "getStartDate",
      "getEndDate",
      "getDifferencePriceList",
      "getBoatDetailLoading",
    ]),
  },
  watch: {
    getStartDate: function() {
      this.differentPriceChecker();
    },
    getEndDate: function() {
      this.differentPriceChecker();
    },
  },
  methods: {
    differentPriceChecker() {
      this.totalAmount = 0;
      this.dateAndPriceList = [];
      var startDate = new Date(this.getStartDate);
      var endDate = new Date(this.getEndDate);
      var dayDiff = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10);
      var tempDate = new Date(startDate);
      var bookingDayList = [tempDate];
      //this.getDifferencePriceList.forEach((element) => {
      //  debugger;
      //});
      for (var i = 0; i < dayDiff; i++) {
        tempDate = new Date(
          tempDate.getFullYear(),
          tempDate.getMonth(),
          tempDate.getDate() + 1
        );
        bookingDayList.push(new Date(tempDate));
      }
      bookingDayList.forEach((bookingDayListElement) => {
        var resultFind = this.getDifferencePriceList.find(
          (x) =>
            x.date.getFullYear() +
              "" +
              x.date.getMonth() +
              "" +
              x.date.getDate() ==
            bookingDayListElement.getFullYear() +
              "" +
              bookingDayListElement.getMonth() +
              "" +
              bookingDayListElement.getDate()
        );
        if (resultFind != undefined) {
          this.dateAndPriceList.push({
            price: resultFind.price,
            date: resultFind.date,
          });
          this.totalAmount = this.totalAmount + parseInt(resultFind.price);
        } else {
          this.dateAndPriceList.push({
            price: parseInt(this.getBoatDetail.dailyprice),
            date: bookingDayListElement,
          });
          this.totalAmount =
            this.totalAmount + parseInt(this.getBoatDetail.dailyprice);
        }
      });
    },
  },
  async created() {
    var boatId = this.$router.history.current.params["boatId"];
    var startDate = this.$router.history.current.params["startDate"];
    var endDate = this.$router.history.current.params["endDate"];

    this.$store.commit("setBoatDetailId", boatId);
    this.$store.commit("setStartDate", startDate);
    this.$store.commit("setEndDate", endDate);
    // farklı fiyatlı günlerin servisi
    await this.$store.dispatch(FETCH_DISABLED_DATES, boatId);
    await this.$store.dispatch(FETCH_BOAT_DETAIL, boatId);
    this.differentPriceChecker();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap");

.container .payment-page {
  font-family: "Montserrat", sans-serif !important;
}

table {
  border-collapse: collapse;
}

td,
th {
  text-align: left;
  padding: 4px;
}
.vc-container.vc-red.vc-is-expanded {
  border: none !important;
}
.reservation-panel-dropdown-content {
  top: 80px !important;
}
.reservation-panel-dropdown-content .qtyInc,
.reservation-panel-dropdown-content .qtyDec {
  width: 30px;
  height: 30px;
  font-size: 2rem;
  z-index: 1;
}
.reservation-captain-info-text {
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
}
.reservation-captain-info {
  display: flex;
  padding-bottom: 15px;
  align-items: center;
}
.reservation-captain-info-image img {
  width: 100%;
  border-radius: 50%;
  aspect-ratio: 1;
  object-fit: cover;
}
.reservation-captain-info-image {
  width: 15%;
}
.reservation-info-content {
  padding: 15px;
  justify-content: space-between;
  font-size: 16px;
}
.payment-page {
  display: grid;
  grid-template-columns: 55% 45%;
}
.reservation-info-button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 600;
}
.payment-header h3 {
  font-weight: 600;
}
.payment-page .modal-body {
  display: flex;
  align-items: center;
  justify-content: center;
}
.payment-online .card-info input {
  width: 100%;
  padding: 30px 0 5px 10px;
  font-size: 16px !important;
  letter-spacing: 1px;
}
.payment-online .card-info span {
  padding-left: 15px;
}
.card-expiration input {
  border-top: none;
  border-right: none;
  border-bottom-left-radius: 12px;
}
.card-cvv input {
  border-top: none;
  border-bottom-right-radius: 12px;
}
.card-number input {
  border-radius: 12px 12px 0 0;
}
.cancellation-policy-content p {
  font-size: 16px !important;
  line-height: 20px !important;
}
.payment-boat-detail-card-image img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 8px;
}
.payment-boat-detail-card-content {
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  padding: 0 !important;
}
.payment-boat-detail-card {
  padding: 15px;
  border-radius: 8px;
  top: 120px;
}
.payment-page .modal-body-text {
  padding-left: 30px;
}

.price-table th,
.price-table td {
  padding: 3px 15px;
}
.reservation-info-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.reservation-panel-dropdown-content .qtyButtons {
  padding: 0 !important;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
@media (min-width: 700px) {
  .payment-page .vm--modal {
    width: 700px !important;
    height: auto !important;
  }
}
@media (min-width: 768px) {
  .payment-page-right {
    margin-left: 60px;
  }
}
@media (max-width: 992px) {
  .payment-page {
    grid-template-columns: 100%;
  }
  .payment-boat-detail-card{
    border: none !important;
    box-shadow: none !important;
  }
  .payment-page-right {
    order: -1;
    margin: 0;
    padding-bottom: 20px;
  }
  .payment-boat-detail-card {
    position: relative;
    top: 0;
    border: none;
    padding: 0 !important;
  }
  .payment-detail.boat-score span,
  .payment-detail.boat-type span {
    font-size: 16px !important;
  }
}
@media (max-width: 768px) {
  .reservation-info-button,
  .payment-boat-detail-price {
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }
}
@media (max-width: 575px) {
  .paymnet-online-captain-info {
    border-top: none !important;
  }
}
</style>
