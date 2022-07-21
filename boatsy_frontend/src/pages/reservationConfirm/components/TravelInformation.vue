<template>
  <div
    class="row payment-reservation-info"
    style="padding: 0 0 20px 0;"
  >
    <div class="col-12 reservation-info-header">
      <h4 style="margin-bottom: 0;">{{ $t("travel_ınformation_travel") }}</h4>
    </div>

    <div class="col-12 row reservation-info-content" style="padding: 14px 0 20px 15px;">
      <div class="col-6 reservation-info-header">
        <span style="font-weight: 600">{{ $t("publicPayment_dates") }}</span
        ><br />
      </div>
      <div class="col-3 reservation-info-button" style="justify-content: end; padding-right:0">
        <a @click="show('payment-datepicker')">{{
          $t("travel_ınformation_edit")
        }}</a>
      </div>
    </div>
    <div class="col-12 row reservation-info-content" style="padding-top:0">
      <table class="price-table">
        <tr>
          <th style="padding-top:0; padding-bottom: 6px; padding-right: 32px">{{ $t("payment_ınformation_day")}}</th>
          <th style="padding-top:0; padding-bottom: 6px; padding-left: 32px; border-left: 1px solid #ddd;">
          {{boatDetail.isdaily == 0 ?$t("boat_reservation_hourly"):'' }} {{ $t("payment_ınformation_price") }}
          </th>
        </tr>
        <tr v-for="(element, index) in dateAndPriceList" :key="index">
          <td class="" style="padding-top:0; padding-right: 32px">
            {{
              element.date.getDate() +
              "/" +
              (element.date.getMonth() + 1) +
              "/" +
              element.date.getFullYear()
            }}
          </td>
          <td style="padding-top:0; padding-left: 32px; border-left: 1px solid #ddd;">
            {{ convertCurrency(element.price, currencyValue) }}
          </td>
        </tr>
      </table>
    </div>
    <div v-if="boatDetail.isdaily ==0" class="col-12 row reservation-info-content">
      <table class="price-table">
        <tr>
          <th style="font-weight: bold"></th>
          <th style="font-weight: bold; padding-left: 50px;white-space:nowrap">
            {{ $t("boat_reservation_total_price") }}
          </th>
        </tr>
        <tr v-for="(element, index) in dateAndPriceList" :key="index">
          <td class="col-9">
           
          </td>
          <td style="padding-left: 50px">
            {{ convertCurrency(hourCounter * element.price, currencyValue) }}
          </td>
        </tr>
      </table>
    </div>
    <div
      v-if="boatDetail.isdaily == 0"
      class="col-12 row reservation-info-content"
    >
      <div class="col reservation-info-header">
        <span style="font-weight: 600">
          {{ $t("filter_header_number_hour_count") }} </span
        ><br />
        <div class="reservation-panel-dropdown-content">
          <div class="qtyButtons">
            <div class="qtyDec" @click="guestDec"></div>
            <input type="text" name="qtyInput" v-model="hourCounter" />
            <div class="qtyInc" @click="guestInc"></div>
          </div>
        </div>
      </div>
    </div>
    <modal name="payment-datepicker" class="modal-datepicker">
      <div class="modal-header">
        <h4>{{ $t("travel_ınformation_date") }}</h4>
        <i class="fas fa-times" @click="hide('payment-datepicker')"></i>
      </div>
      <SingleDatePicker
        v-if="boatDetail.isdaily == 0"
        style="padding-top: 20px"
      ></SingleDatePicker>
      <BoatDatepicker v-else style="padding-top: 20px"></BoatDatepicker>
      <div class="col-12 payment-button" style="text-align: end">
        <button
          style="margin: 10px 0"
          @click="hide('payment-datepicker'), changeDate()"
        >
          {{ $t("travel_ınformation_approve") }}
        </button>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SingleDatePicker from "./SingleDatePicker.vue";
export default {
  props: ["dateAndPriceList", "currencyValue", "boatDetail"],
  components: {
    SingleDatePicker,
  },
  data() {
    return {
      hourCounter: 2,
    };
  },
  computed: {
    ...mapGetters({
      currencyList: "getCurrency",
      selectedCurrency: "getSelectedCurrency",
      startDate: "getStartDate",
      endDate: "getEndDate",
    }),
  },
  methods: {
    guestInc() {
      if (this.hourCounter) {
        this.hourCounter++;
        this.$store.commit("setHourCount", this.hourCounter);
      }
    },
    guestDec() {
      if (this.hourCounter > 2) {
        this.hourCounter--;
        this.$store.commit("setHourCount", this.hourCounter);
      }
    },
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
    changeDate() {
      this.$router.push({
        name: "UserBookConfirm",
        params: {
          boatId: this.boatDetail.id,
          startDate: this.startDate,
          endDate: this.endDate,
        },
      });
    },
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    },
  },
};
</script>