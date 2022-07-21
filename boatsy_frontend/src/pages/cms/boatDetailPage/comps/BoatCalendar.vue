<template>
  <div>
    <div class="row" style="margin: 0px 0px 15px 25px">
      <div
        class="boat-detail-calender col-6"
        id="datepicker"
        style="0px 0px 0px 30px !important"
      >
        <div class="col-12 calender" style="padding: 0 0 15px 0">
          <h4 class="card-des-calender" style="text-align: start">
            Tenke Takvimi
          </h4>
        </div>
        <div
          class="datepicker-container"
          id="datepicker-container"
          tab
          index="-1"
        >
          <v-date-picker
            v-model="range"
            :columns="$screens({ default: 1, lg: 2 })"
            :disabled-dates="this.getDisabledDates"
            :attributes="this.getAttributesDatePickerCMS"
            @dayclick="onDayClick"
            color="red"
            is-range
            is-expanded
          />
        </div>
      </div>
      <div
        class="boat-detail-calender col-5"
        id="datepicker"
        style="margin: 50px 0px !important"
      >
        <h5>
          Teknenin normal Fİyatı:
          {{ getBoatDetail.dailyprice + " " + getBoatDetail.currencysymbol }}
        </h5>
        <br />
        <h5>Seçili Tarihler: {{ getDate() }}</h5>
        <br />
        <div
          v-if="selectedBlockDateList.length < 1"
          class="col-12 cms-save-button"
          style="text-align: start"
        >
          <button
            style="background: black; font-weight: bold"
            @click="setBlocksDay"
          >
            Seçili günleri blokla
          </button>
        </div>
        <div v-else class="col-12 cms-save-button" style="text-align: start">
          <button
            style="background: black; font-weight: bold"
            @click="deleteBlocksDay"
          >
            Seçili günlerin blokloğunu kaldır
          </button>
        </div>
        <br />
        <div class="col-12 cms-save-button" style="text-align: start">
          <button style="font-weight: bold" @click="show('price-modal')">
            Seçili günlerin fiyatını değiştir
          </button>
        </div>
        <br />
        <div class="col-12 cms-save-button" style="text-align: start">
          <button style="font-weight: bold" @click="show('add-new-booking-modal')">
            Rezervasyon oluştur
          </button>
        </div>
      </div>
    </div>
    <add-new-booking-modal :dates="getDate()" :dailyPrice="getBoatDetail.dailyprice"></add-new-booking-modal>
    <modal name="price-modal" :height="500" :width="500">
      <div class="modal-header">
        <h5>Lütfen Fiyat Girin</h5>
        <i class="fas fa-times" @click="hide('price-modal')"></i>
      </div>
      <div class="modal-body" style="max-height: 500px">
        <h5>Seçili Tarihler: {{ getDate() }}</h5>
        <br />
        <input
          type="number"
          v-model="differentPrice"
          placeholder="Fiyat"
          class="form-control form-control-lg"
        />
        <br />
        <div class="col-12 cms-save-button" style="text-align: start">
          <button style="font-weight: bold" @click="setCustomPrice">
            Seçili günlerin fiyatını değiştir
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import format from "date-fns/format";
import { mapGetters } from "vuex";
import addDays from "date-fns/add_days";
import newBookingModal from "./NewBookingModal.vue"
import {
  FETCH_DISABLED_DATES_CMS,
  SET_BLOCKS_DAY_CMS,
  DELETE_BLOCKS_DAY_CMS,
  SET_CUSTOM_PRICE_CMS,
} from "../../../../store/actions.type.js";
import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import Vue from "vue";
Vue.component("v-calendar", Calendar);
Vue.component("v-date-picker", DatePicker);
export default {
  components: {
    Calendar,
    DatePicker,
    "add-new-booking-modal": newBookingModal
  },
  props: ["boatId"],

  data() {
    return {
      range: {
        start: new Date(),
        end: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 5
        ),
      },
      dateFormat: "YYYY-MM-DD",
      dateOne: "",
      dateTwo: "",
      disabledDates: [],
      todayDate: format(addDays(new Date(), -1), this.dateFormat),
      differentPrice: 0,
      selectedBlockDateList: [],
    };
  },

  computed: {
    ...mapGetters([
      "getDisabledDates",
      "getOptionalDates",
      "getAttributesDatePickerCMS",
      "getBoatDetail",
      "getStartDate",
      "getEndDate",
    ]),
  },
  mounted: function () {
    this.disabledDates = this.getDisabledDates;
    //Opsiyonel günlerin takvimde turuncu nokta ile gösterilmesi için
    if (this.getOptionalDates.lenght > 0) {
      this.attributes = [
        // Attributes for todos
        ...this.getOptionalDates.forEach((element) => ({
          dates: element.date,
          dot: {
            color: "orange",
          },
          popover: {
            label:
              element.type == "OPTIONAL_DAY"
                ? "Bu tarihte başka bir misafir tarafından rezervasyon talebi gönderilmiş fakat tekne sahibi tarafından henüz kabul edilmemiş."
                : "",
            visibility: "hover",
            hideIndicator: true,
          },
        })),
      ];
    }
  },
  methods: {
    show(ModalName) {
      this.$modal.show(ModalName);
    },
    hide(ModalName) {
      this.$modal.hide(ModalName);
    },
    async setBlocksDay() {
      var result = await this.$store.dispatch(SET_BLOCKS_DAY_CMS);
      if (!result.error) {
        this.$toast.success("Günler bloklandı", {
          icon: "far fa-check-circle",
          timeout: 1500,
        });
        this.$store.dispatch(FETCH_DISABLED_DATES_CMS, this.boatId);
      } else {
        this.$toast.error(result.errorMessage, {
          icon: "far fa-check-circle",
          timeout: 1500,
        });
      }
    },
    async deleteBlocksDay() {
      var body = {
        id: this.selectedBlockDateList[0].id,
      };
      var result = await this.$store.dispatch(DELETE_BLOCKS_DAY_CMS, body);
      if (!result.error) {
        this.$toast.success("Günlerin bloğu kaldırıldı", {
          icon: "far fa-check-circle",
          timeout: 1500,
        });
        this.$store.dispatch(FETCH_DISABLED_DATES_CMS, this.boatId);
      } else {
        this.$toast.error(result.errorMessage, {
          icon: "far fa-check-circle",
          timeout: 1500,
        });
      }
    },
    async setCustomPrice() {
   
      var dateList = [];
      var dayDiff = parseInt(
        (this.range.end - this.range.start) / (1000 * 60 * 60 * 24),
        10
      );
      var tempDate = new Date(this.range.start);
      dateList.push({
        active_date: format(new Date(tempDate), this.dateFormat),
        boat_id: this.boatId,
        price: parseFloat(this.differentPrice),
      });
      for (var i = 0; i < dayDiff; i++) {
        tempDate = new Date(
          tempDate.getFullYear(),
          tempDate.getMonth(),
          tempDate.getDate() + 1
        );
        dateList.push({
          active_date: format(new Date(tempDate), this.dateFormat),
          boat_id: this.boatId,
          price: parseFloat(this.differentPrice),
        });
      }

      var result = await this.$store.dispatch(SET_CUSTOM_PRICE_CMS, dateList);
      if (!result.error) {
        this.$toast.success("Seçili günlerin fiyatları güncellendi", {
          icon: "far fa-check-circle",
          timeout: 1500,
        });
        this.$store.dispatch(FETCH_DISABLED_DATES_CMS, this.boatId);
        this.hide('price-modal')
      } else {
        this.$toast.error(result.errorMessage, {
          icon: "far fa-check-circle",
          timeout: 1500,
        });
      }
    },

    getDate() {
      return (
        format(this.getStartDate, this.dateFormat) +
        " / " +
        format(this.getEndDate, this.dateFormat)
      );
    },
    onDayClick(day) {
      this.$store.commit(
        "setStartDate",
        format(this.range.start, this.dateFormat)
      );
      this.$store.commit("setEndDate", format(this.range.end, this.dateFormat));
      var blockDateId = 0;
      this.selectedBlockDateList = [];
      if (
        day.attributes[0] != undefined &&
        day.attributes[0].popover.customData.id != undefined
      ) {
        blockDateId = day.attributes[0].popover.customData.id;
        this.getAttributesDatePickerCMS.forEach((element) => {
          if (element.popover.customData.id == blockDateId) {
            this.selectedBlockDateList.push({
              data: element.dates,
              id: element.popover.customData.id,
            });
          }
        });
      }
    },
  },

  async created() {
    this.$store.dispatch(FETCH_DISABLED_DATES_CMS, this.boatId);
    var startDate = new Date(this.getStartDate);
    var endDate = new Date(this.getEndDate);
    this.range.start = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    this.range.end = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );
  },

  mounted: function () {
    this.disabledDates = this.getDisabledDates;
    if (this.getOptionalDates.lenght > 0) {
      this.attributes = [
        // Attributes for todos
        ...this.getOptionalDates.forEach((element) => ({
          dates: element.date,
          dot: {
            color: "orange",
          },
          popover: {
            label:
              element.type == "OPTIONAL_DAY"
                ? "Bu tarihte başka bir misafir tarafından rezervasyon talebi gönderilmiş fakat tekne sahibi tarafından henüz kabul edilmemiş."
                : "",
            visibility: "hover",
            hideIndicator: true,
          },
        })),
      ];
    }
  },
};
</script>

<style>
.boat-detail-calender .asd__wrapper {
  left: 0 !important;
  width: 100% !important;
  border-radius: 20px !important;
  border: none;
  top: 25px !important;
  position: relative !important;
}
.boat-detail-calender .asd__month--hidden {
  width: 0 !important;
}
.boat-detail-calender .asd__inner-wrapper {
  margin-left: 0 !important;
}
.boat-detail-calender .asd__days-legend {
  margin: 0 30px !important;
}
.boat-detail-calender .form-control.radius-style {
  width: 60% !important;
  text-align: center !important;
  font-weight: 600 !important;
  padding: 0 !important;
  border: 1px solid #000 !important;
  border-radius: 8px !important;
}
.asd__day--disabled .asd__day-button {
  text-decoration: line-through;
}
@media (max-width: 1200px) {
  .boat-detail-calender .asd__wrapper {
    width: 78% !important;
  }
  .boat-detail-calender .form-control.radius-style {
    width: 78% !important;
  }
  .boat-detail-calender {
    width: 100% !important;
  }
}
@media (max-width: 990px) {
  .boat-detail-calender .asd__wrapper {
    width: 100% !important;
  }
}
@media (max-width: 770px) {
  .boat-detail-calender .asd__days-legend {
    margin-left: calc((100% - 300px) / 2) !important;
  }
  .boat-detail-calender .form-control.radius-style {
    width: 200px !important;
  }
}
</style>
