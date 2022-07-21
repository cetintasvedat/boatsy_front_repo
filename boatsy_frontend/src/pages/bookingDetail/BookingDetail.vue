<template>
  <div>
    <div class="container book-detail-page" v-if="getBoatRulesLoading == false">
      <div class="book-detail-left-page">
        <div class="book-detail-page-header">
          <h3>{{$t('booking_details_info')}}</h3>
        </div>
        <BookingDetailBoatRules
          :boatRules="getBoatRules[0]"
          :personCapacity="getBookingDetail.personcapacity"
        ></BookingDetailBoatRules>

        <PaymentInformation
          :booking="getBookingDetail"
          :dateAndPriceList="dateAndPriceList"
        ></PaymentInformation>

        <BookingMap :booking="getBookingDetail"></BookingMap>

        <BookingCaptainDetail
          :captain="getCaptainDetail"
          :captainId="getBookingDetail.captainid"
        ></BookingCaptainDetail>

        <BookingDetailBottom :booking="getBookingDetail"></BookingDetailBottom>
      </div>

      <BookingDetailCard
        :booking="getBookingDetail"
        :currencyvalue="getBookingDetail.currencyvalue"
        :totalAmount="totalAmount"
      ></BookingDetailCard>
      <modal name="cancel-request-modal" :height="330" :width="600">
        <information-modal></information-modal>
      </modal>
    </div>
    <div class="loading-payment-page" v-else>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  FETCH_BOOKING_DETAIL,
  FETCH_CAPTAIN_DETAIL,
  FETCH_BOAT_RULES,
  GET_BOOKING_COMMENT,
  FETCH_DISABLED_DATES,
} from "../../store/actions.type.js";
import { mapGetters } from "vuex";
import BookingDetailCard from "./components/BookingDetailCard.vue";

import BookingDetailBoatRules from "./components/BookingDetailBoatRules";
import PaymentInformation from "./components/PaymentInformation.vue";
import BookingMap from "./components/BookingMap.vue";
import BookingCaptainDetail from "./components/BookingCaptainDetail.vue";
import BookingDetailBottom from "./components/BookingDetailBottom.vue";

export default {
  data() {
    return {
      loadingButton: false,
      bookingNote: "",
      loading: "none",
      ratingNote: "",
      rate: 0,
      animation: "",
      isComment: false,
      dateAndPriceList: [],
      totalAmount: 0,
    };
  },
  components: {
    BookingDetailCard,
    PaymentInformation,
    BookingMap,
    BookingCaptainDetail,
    BookingDetailBottom,
    BookingDetailBoatRules,
  },
  methods: {
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    },
    differentPriceChecker() {
      this.totalAmount = 0;
      this.dateAndPriceList = [];
      var startDate = new Date(this.getBookingDetail.startdate);
      var endDate = new Date(this.getBookingDetail.enddate);
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
            price: parseInt(this.getBookingDetail.dailyprice),
            date: bookingDayListElement,
          });
          this.totalAmount =
            this.totalAmount + parseInt(this.getBookingDetail.dailyprice);
        }
      });
    },
  },
  computed: {
    ...mapGetters([
      "getBookingDetail",
      "getCaptainDetail",
      "getBoatRules",
      "getBoatRulesLoading",
      "getDifferencePriceList",
    ]),
  },
  async created() {
    var bookingId = this.$router.history.current.params["bookId"];
    this.$store.commit("setBoatRulesLoading", true);
    this.$store.commit("setBookingId", bookingId);
    var data = await this.$store.dispatch(FETCH_BOOKING_DETAIL);

    // farklı fiyatlı günlerin servisi
    await this.$store.dispatch(FETCH_DISABLED_DATES, data.boatid);
    this.differentPriceChecker();
    await this.$store.dispatch(FETCH_CAPTAIN_DETAIL, data.captainid);
    var requestModel = {
      userId: data.captainid,
      boatId: data.boatid,
    };
    this.$store.commit("setBoatRulesRequestModel", requestModel);
    this.$store.dispatch(FETCH_BOAT_RULES, data.boatid);
    this.$store.dispatch(GET_BOOKING_COMMENT);
  },
};
</script>
<style>
.leaflet-container {
  background-color: transparent !important;
}
.book-detail-page {
  padding-top: 120px;
  text-align: start;
  display: grid;
  grid-template-columns: 50% 50%;
}
.book-detail-body {
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
}
.book-detail-content {
  justify-content: space-between;
  padding-bottom: 10px;
}
.book-detail-content-text {
  align-items: center;
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
  font-weight: 600;
}
.book-detail-page .map-container {
  padding-right: 0;
}
.book-detail-page
  .vue2leaflet-map.leaflet-container.leaflet-touch.leaflet-fade-anim.leaflet-grab.leaflet-touch-drag.leaflet-touch-zoom {
  margin-left: 15px;
  position: relative;
}
.map-container {
  padding-bottom: 15px;
}
.book-detail-captain-info-image {
  width: 15%;
}
.book-detail-captain-info-image img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
}
.book-detail-right-page {
  margin-left: 50px;
  width: 75%;
}
.book-detail-date-info {
  align-items: center;
  display: flex;
  text-align: center;
}
.book-detail-date-content {
  font-size: 16px;
  font-weight: 600;
}
.payment-detail.boat-type:hover span {
  text-decoration: underline;
}
.rating-stars {
  font-size: 24px;
  margin-bottom: 10px;
  padding-right: 5px;
}
.rating-stars i:hover {
  color: #ff3;
}
.rating-stars i {
  color: #ddd;
}
@keyframes shake-animation {
  0% {
    transform: translate(0, 0);
  }
  1.78571% {
    transform: translate(5px, 0);
  }
  3.57143% {
    transform: translate(0, 0);
  }
  5.35714% {
    transform: translate(5px, 0);
  }
  7.14286% {
    transform: translate(0, 0);
  }
  8.92857% {
    transform: translate(5px, 0);
  }
  10.71429% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@media (max-width: 991px) {
  .book-detail-page {
    grid-template-columns: 100%;
  }
  .book-detail-right-page {
    order: -1;
    margin: 0;
    padding-bottom: 20px;
    width: 100%;
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
  .book-detail-header {
    text-align: start !important;
    padding-left: 15px;
  }
  .book-detail-date-content {
    padding: 0 15px;
  }
}
@media (max-width: 575px) {
  .book-detail-body {
    border-bottom: 10px solid rgb(221, 221, 221) !important;
  }
  .top-divider,
  .bottom-divider {
    border-top: 10px solid rgb(221, 221, 221) !important;
  }
  .payment-boat-detail-card-content,
  .payment-boat-detail-card-image {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
  .payment-boat-detail-card-image img {
    aspect-ratio: 4/3 !important;
  }
  .payment-boat-detail-card .payment-boat-detail-card-header {
    padding-bottom: 30px;
  }
  .book-detail-right-page .book-detail-header {
    padding-top: 30px !important;
  }
}
</style>
