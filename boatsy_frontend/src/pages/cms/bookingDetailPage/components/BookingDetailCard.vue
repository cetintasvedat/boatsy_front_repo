<template>
  <div class="book-detail-right-page">
    <div class="payment-boat-detail-card" style="border: none">
      <div class="row payment-boat-detail-card-header">
        <BoatCardWithLoading
          v-if="booking.boatid != undefined"
          :boatData="booking"
        ></BoatCardWithLoading>
        <div class="col-12 payment-boat-detail-card-content">
          <hr class="top-divider"/>
          <br />
          <div class="book-detail-date-info">
            <div
              class="col-6 book-detail-date-content"
              style="border-right: 1px solid #ddd"
            >
              <span>Check-in</span><br />
              <span>{{ booking.startdate.split(" ")[0] }}</span>
            </div>
            <div class="col-6 book-detail-date-content">
              <span>Check-out</span>
              <br />
              <span>{{ booking.enddate.split(" ")[0] }}</span>
            </div>
          </div>
          <br />
          <hr class="bottom-divider" />
          <div
            class="book-detail-header"
            style="padding-top: 10px; padding-bottom: 10px; text-align: center"
          >
            <h3>{{$t('booking_detail_card_detail-header')}}</h3>
          </div>
          <div class="col book-detail-date-content">
            <span>{{$t('booking_detail_card_totalAmount')}}</span>
            <span data-v-0d76398c="" style="font-weight: 100"
              >{{ convertCurrency(totalAmount, currencyvalue) }}
            </span>
          </div>
          <div class="col book-detail-date-content">
            <span>{{$t('booking_detail_card_advance_total')}}.</span>
          </div>
          <div class="col book-detail-date-content">
            <span>{{$t('booking_detail_card_day_total')}} </span>
            <span data-v-0d76398c="" style="font-weight: 100">
              {{ convertCurrency(totalAmount * 0.4, currencyvalue) }}</span
            >
          </div>
          <div class="col book-detail-date-content">
            <span>{{$t('booking_detail_card_remainder')}} </span>
            <span data-v-0d76398c="" style="font-weight: 100">
              {{ convertCurrency(totalAmount * 0.6, currencyvalue) }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BoatCardWithLoading from './BoatCardWithLoading.vue'
export default {
  props: ["booking", "totalAmount", "currencyvalue"],
  data() {
    return {
      selectedCurrency: 1,
    };
  },
  components: {
    BoatCardWithLoading
  },
  methods: {
    defaultImage(image) {
      if (image == null || image == undefined || image == "") {
        return "";
      } else {
        return image.split(";")[0];
      }
    },
    convertCurrency(price, currencyValue) {
      var boatPrice = price * currencyValue;
      var currencyList = this.$store.state.boat.currency;
      if (currencyList.length > 0) {
        return (
          Math.round(boatPrice / currencyList[this.selectedCurrency - 1].value) +
          " " +
          currencyList[this.selectedCurrency - 1].symbol
        );
      } else {
        return boatPrice + " ₺";
      }
    },
  },
  mounted() {
    this.selectedCurrency = this.$store.getters.getSelectedCurrency;
  },
};
</script>
<style>
hr {
  margin: 0px !important;
  border-top: 1px solid #bbb;
}
.payment-boat-detail-card-header{
  justify-content: center;
}
</style>
