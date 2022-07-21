  <template>
  <div>
    <v-date-picker
      v-model="range"
      :masks="masks"
      :columns="$screens({ default: 1, lg: 2 })"
      :disabled-dates="blockDateList"
      @dayclick="onDayClick"
      color="red"
      is-range
      is-expanded
    >
      <template v-slot="{ inputValue, inputEvents }">
        <div class="col-md-6"  style="text-align-last: left;">
          <div class="date_picker_title" style="padding-left: 25px;float:left">Tarih</div>
          <input
            readonly="readonly"
            class="form-radius-style date_picker_date"
            style="height: auto !important; background: transparent"
            :value="inputValue.start + ' - ' + inputValue.end"
            v-on="inputEvents.start"
          />
        </div>
      </template>
    </v-date-picker>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import format from "date-fns/format";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import Vue from "vue";
Vue.component("v-date-picker", DatePicker);

export default {
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
      blockDateList: [
        {
          start: null,
          end: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 1
          ),
        },
      ],
      masks: {
        input: "D MMMM",
      },
      dateFormat: "YYYY-MM-DD",
      dateOne: "",
      dateTwo: "",
    };
  },
  computed: {
    ...mapGetters(["getStartDate"]),
  },

  methods: {
    onDayClick(day) {
      this.$store.commit(
        "setStartDate",
        format(this.range.start, this.dateFormat)
      );
      this.$store.commit("setEndDate", format(this.range.end, this.dateFormat));
    },
    getDate() {
      return new Date(this.getStartDate).toLocaleDateString("tr-TR", {
        month: "long",
        day: "2-digit",
      });
    },
  },
};
</script>

<style>
.asd__wrapper {
  left: -100% !important ;
  width: 400% !important ;
  border-radius: 20px !important ;
  border: none;
}

.asd__change-month-button > button {
  background-color: #fff;
  border: 1px solid #fff !important;
}

.asd__day--enabled {
  border: 1px solid #fff;
}

.asd__month-name {
  margin: 7px 0 30px !important;
}
.asd__day--selected {
  border-radius: 100% !important;
  border: none !important;
}

.asd__day--hovered,
.asd__day--in-range {
  border-radius: 100% !important;
  border: none !important;
}

.asd__action-buttons,
.asd__keyboard-shortcuts-trigger {
  display: none !important;
}

.asd__month {
  color: #555 !important;
}

.asd__month--hidden {
  height: 100% !important;
}

@media (min-width: 991px) {
  .asd__inner-wrapper {
    margin-left: -150px !important;
  }
  .asd__days-legend {
    margin: 0 150px !important;
  }
  .form-control.radius-style {
    padding-top: 21px !important;
  }
}

@media (max-width: 991px) {
  .asd__wrapper {
    border: 1px solid rgba(0, 0, 0, 0) !important;
    left: 0 !important;
    width: 100% !important;
  }

  .asd__inner-wrapper {
    margin-left: -250px !important;
  }
  .asd__change-month-button > button {
    background-color: #fff;
    border: 1px solid #fff !important;
  }

  .asd__day--enabled {
    border: 1px solid #fff;
  }

  .asd__month-name {
    margin: 7px 0 30px !important;
  }
  .asd__day--selected {
    border-radius: 100% !important;
    border: none !important;
  }

  .asd__day--hovered,
  .asd__day--in-range {
    border-radius: 100% !important;
    border: none !important;
  }

  .asd__action-buttons,
  .asd__keyboard-shortcuts-trigger {
    display: none !important;
  }

  .asd__month {
    color: #555 !important;
  }

  .asd__month--hidden {
    height: 100% !important;
  }

  .asd__days-legend {
    margin: 0 50px !important;
  }
  .form-control.radius-style {
    padding-top: 15px !important;
  }
}

@media (max-width: 770px) {
  .asd__month--hidden {
    height: 0 !important;
    padding: 0 !important;
    width: 0 !important ;
  }
  .asd__inner-wrapper {
    width: 100% !important;
    margin-left: 0 !important;
  }
  .asd__days-legend {
    margin-left: calc((100% - 300px) / 2) !important;
  }
}

.date_picker_title {
  color: black;
  font-weight: 500;
  font-size: 13px;
  padding-top: 20px;
  white-space: nowrap;
}
.date_picker_date {
  background: white;
  font-weight: 600 !important;
  font-size: 16px !important;
}
</style>
