<template>
  <div
    class="payment-boat-detail-card"
    style="border: 1px solid rgb(216 216 216 / 90%);
    border-radius: 10px;
    box-shadow: 1px 1px 20px rgb(216 216 216 / 10%);"
  >
    <div
      class="row payment-boat-detail-card-header"
    >
      <BoatCardWithLoading
        v-if="boatDetail.id != undefined"
        :boatData="boatDetail"
      ></BoatCardWithLoading>
    </div>
    <hr style="border-top:1px solid #d8d8d8; width:100%; margin: 15px 15px 15px 0;"></hr>
    <div class="row payment-boat-detail-card-body" style="padding-top: 0">
      <div class="col-12 payment-boat-detail-card-body-header">
        <h5 style="margin:0; padding-bottom: 20px; padding-top: 5px; font-weight: 600;">{{ $t("public_payment_detail") }}</h5>
      </div>
      <div class="col-12 book-detail-date-content" style="display:flex; justify-content: space-between; align-items: flex-end;">
        <span>{{ $t("booking_detail_card_totalAmount") }} </span>
        <span data-v-0d76398c="" style="font-weight: 500; font-size: 18px;"
          >{{ convertCurrency(totalAmount*(boatDetail.isdaily==0?hourCount:1), boatDetail.currencyvalue) }}
        </span>
      </div>
      <div class="col-12 book-detail-date-content" style="display:flex; justify-content: space-between; align-items: flex-end;">
        <span>{{ $t("booking_detail_card_remainder") }} </span>
        <span data-v-0d76398c="" style="font-weight: 500; font-size: 18px;">
          {{
            convertCurrency(totalAmount * 0.6*(boatDetail.isdaily==0?hourCount:1), boatDetail.currencyvalue)
          }}</span
        >
      </div>
      <hr style="border-top:1px solid #d8d8d8; width:100%; margin: 15px;"></hr>
      <div class="col-12 book-detail-date-content" style="display:flex; justify-content: space-between; align-items: flex-end;">
        <span style="font-weight: 600;">{{ $t("booking_detail_card_day_total") }} </span>
        <span data-v-0d76398c="" style="font-weight: 700; font-size: 18px;">
          {{
            convertCurrency(totalAmount*(boatDetail.isdaily==0?hourCount:1) * 0.4, boatDetail.currencyvalue)
          }}</span
        >
      </div>
      <div class="col-12 book-detail-date-content">
        <span data-v-0d76398c="" style="font-style: italic; color: rgb(155, 155, 155); font-size: 12px;">
          {{
            $t("booking_detail_card_advance_total")
          }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { IMAGE_URL } from "../../../config/GlobalVariables";
import BoatCardWithLoading from "./BoatCardWithLoading.vue";

import { mapGetters } from "vuex";

export default {
  props: ["totalAmount", "boatDetail"],
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
    };
  },
  components: {
    BoatCardWithLoading,
  },
  computed: {
    ...mapGetters({
      currencyList: "getCurrency",
      selectedCurrency: "getSelectedCurrency",
      hourCount: "getHourCount",
    }),
  },
  methods: {
    convertCurrency(price, currencyValue) {
      var boatPrice = price * currencyValue;

      if (this.currencyList.length > 0) {
        return (
          Math.round(
            boatPrice / this.currencyList[this.selectedCurrency - 1].value
          ) +
          " " +
          this.currencyList[this.selectedCurrency - 1].symbol
        );
      } else {
        return boatPrice + " ₺";
      }
    },
    getBoatImage(images) {
      if (images != undefined) {
        return images.split(";")[0];
      }
    },
  },
};
</script>
