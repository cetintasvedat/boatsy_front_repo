<template>
  <div class="datepicker-container" id="datepicker-container" tab index="-1">
    <v-date-picker
      v-model="range"
      :columns="$screens({ default: 1, lg: 2 })"
      :disabled-dates="this.getDisabledDates"
      :attributes="this.getAttributesDatePicker"
      @dayclick="onDayClick"
      color="red"
      is-range
      is-expanded
    />
  </div>
</template>
<script>
import format from "date-fns/format";
import { mapGetters } from "vuex";
import addDays from "date-fns/add_days";
import { FETCH_DISABLED_DATES } from "../store/actions.type.js";
import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import Vue from "vue";
Vue.component("v-calendar", Calendar);
Vue.component("v-date-picker", DatePicker);
export default {
  components: {
    Calendar,
    DatePicker,
  },

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
      attributes: [],
    };
  },

  computed: {
    ...mapGetters([
      "getDisabledDates",
      "getStartDate",
      "getEndDate",
      "getOptionalDates",
      "getAttributesDatePicker",
    ]),
  },
    watch: {
    getStartDate: function () {
      this.onChangeRange();
    },
    getEndDate: function () {
      this.onChangeRange();
    },
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
    this.range = {
      start: new Date(this.getStartDate),
      end: new Date(this.getEndDate),
    };
  },
  methods: {
        onChangeRange() {
      this.range = {
        start: new Date(this.getStartDate),
        end: new Date(this.getEndDate),
      };
    },
    onDayClick(day) {
      this.$store.commit(
        "setStartDate",
        format(this.range.start, this.dateFormat)
      );
      this.$store.commit("setEndDate", format(this.range.end, this.dateFormat));
      
    },
  },

  async created() {
    this.$store.dispatch(FETCH_DISABLED_DATES);
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
