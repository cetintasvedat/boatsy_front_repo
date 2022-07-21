<template>
  <div class="header-map-filter">
    <div
      class="row col-12 map-filter-header"
      id="map-filter"
      style="margin: auto; justify-content: space-between"
    >
      <div class="map-quick-filter-buttons" style="text-align: center">
        <div class="map-boat-type" style="display: flex">
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
              <div class="" style="text-align-last: center">
                <input
                  readonly="readonly"
                  class="radius-style"
                  style="height: auto !important; background: transparent"
                  :value="returnStartDate() + ' - ' + returnEndDate()"
                  v-on="inputEvents.start"
                />
              </div>
            </template>
          </v-date-picker>

          <div>
            <input
              type="button"
              :value="$t('payment_ınformation_price')"
              @click="priceClick = !priceClick"
            />
            <div class="filter-dropdown-container" v-if="priceClick">
              <div class="range-slider" data-role="rangeslider">
                <div clas="range-slider-header">
                  <h5 class="map-filter-modal-detail">
                    {{ $t("filter_header_price_range") }}
                  </h5>
                </div>
                <vue-slider
                  v-model="rangeSliderValue"
                  :min="0"
                  :max="150000"
                ></vue-slider>
                <div class="range-slider-minmax-card">
                  <div class="maxmin-card min">
                    <div class="maxmin-card-header">
                      {{ $t("filter_header_min") }}
                    </div>
                    {{
                      rangeSliderValue[0] +
                      getCurrency[getSelectedCurrency - 1].symbol
                    }}
                  </div>
                  <div class="maxmin-card max">
                    <div class="maxmin-card-header">
                      {{ $t("filter_header_max") }}
                    </div>
                    {{
                      rangeSliderValue[1] +
                      getCurrency[getSelectedCurrency - 1].symbol
                    }}
                  </div>
                </div>
                <div class="button-map-filter-search">
                  <button @click="filterByPrice()" class="button-content">
                    {{ $t("map_filter_header_apply") }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="hide-item-for-mobil">
            <div
              class="map-boat-type right-filter-button"
              style="display: flex; gap: 10px"
            >
              <div class="select-asc-border">
                <multiselect
                  v-model="boatTypeListItem"
                  :options="boatTypeList"
                  :searchable="false"
                  placeholder="Tekne Seçenekleri"
                  :close-on-select="true"
                  :show-labels="false"
                  :custom-label="customName"
                  @select="filterByBoatType"
                ></multiselect>
              </div>
            </div>
          </div>
          <!--
          <div class="hide-item-for-mobil" style="padding-left: 10px">
            <input
              type="button"
              :value="$t('filter_header_number_guests')"
              @click="guestCounterClick = !guestCounterClick"
            />
            <div
              class="filter-dropdown-container"
              style="z-index=9999999999999 !important"
              v-show="guestCounterClick"
            >
              <div class="guest-info">
                <div class="" style="position: relative">
                  <div class="qtyButtons" style="padding: 6px">
                    <label>{{ $t("map_filter_header_clear") }}</label>
                    <div class="qtyDec" @click="guestDec"></div>
                    <input type="text" name="qtyInput" v-model="guestCounter" />
                    <div class="qtyInc" @click="guestInc"></div>
                  </div>
                </div>
                <div
                  class="button-map-filter-search"
                  style="position: relative left=-20px"
                >
                  <button @click="filtertByGuests()" class="button-content">
                    {{ $t("map_filter_header_apply") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          -->
        </div>
      </div>
      <div
        class="map-boat-type right-filter-button"
        style="display: flex; gap: 10px"
      >
        <div class="select-asc-border">
          <multiselect
            v-model="sortSearchItem"
            :options="sortSearchList"
            :searchable="false"
            placeholder="Sıralama"
            :close-on-select="true"
            :show-labels="false"
            :custom-label="customName"
            @select="onSelect"
          ></multiselect>
        </div>
        <input
          type="button"
          @click="show"
          :value="$t('more_filters')"
          style="margin-right: 0"
        />
      </div>
    </div>
    <div
      class="row col-12 map-filter-header"
      id="map-filter"
      style="margin: auto; gap: 1em"
    >
      <div
        v-if="
          getBoatType != undefined &&
          getBoatType != 'Tüm Tekneler' &&
          getBoatType != ''
        "
        class="delete-filter-item"
      >
        {{ this.$t(getBoatType) }}
        <button
          type="button"
          style="border: none; background: transparent"
          @click="clearBoatType"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>

      <div v-if="guestCounterTempValue > 1" class="delete-filter-item">
        {{ guestCounterTempValue + " " + $t("boat_card_horizontal_boat-city") }}
        <button
          type="button"
          style="border: none; background: transparent"
          @click="clearGuestCounterTempValue"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>
      <div
        v-if="rangeSliderTempValue[0] != 1 || rangeSliderTempValue[1] != 150000"
        class="delete-filter-item"
      >
        {{
          rangeSliderTempValue[0] +
          getCurrency[getSelectedCurrency - 1].symbol +
          " - " +
          rangeSliderTempValue[1] +
          getCurrency[getSelectedCurrency - 1].symbol
        }}
        <button
          type="button"
          style="border: none; background: transparent"
          @click="clearPriceFilter"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>

    <modal name="filter-modal">
      <div class="fixed-header">
        <div class="modal-header">
          <h4>{{ $t("filter_header_filters") }}</h4>
          <i class="fas fa-times" @click="hide()"></i>
        </div>
      </div>
      <div class="radio-group boat-type-radio-group">
        <div class="radio-group-header">
          <h5>{{ $t("filter_header_boat_type") }}</h5>
        </div>
        <div class="boat-type-content">
          <input type="radio" value="Katamaran" v-model="boatTypePicked" />
          <label for="one">{{ $t("filter_header_katamaran") }}</label>
        </div>

        <div class="boat-type-content">
          <input type="radio" value="Gulet" v-model="boatTypePicked" />
          <label for="two">{{ $t("filter_header_gulet") }}</label>
        </div>

        <div class="boat-type-content">
          <input type="radio" value="Motoryat" v-model="boatTypePicked" />
          <label for="two">{{ $t("filter_header_motoryat") }}</label>
        </div>

        <div class="boat-type-content">
          <input type="radio" value="Yelkenli" v-model="boatTypePicked" />
          <label for="two">{{ $t("filter_header_yelkenlı") }}</label>
        </div>

        <div class="boat-type-content">
          <input type="radio" value="Sürat Teknesi" v-model="boatTypePicked" />
          <label for="two">{{ $t("filter_header_surat") }}</label>
        </div>

        <div class="boat-type-content">
          <input type="radio" value="Diğer" v-model="boatTypePicked" />
          <label for="two">{{ $t("filter_header_other") }}</label>
        </div>
        <div class="boat-type-content">
          <input type="radio" value="Tüm Tekneler" v-model="boatTypePicked" />
          <label for="two">{{ $t("map_filter_header_all_boat") }}</label>
        </div>
      </div>
      <!--  Ödeme Politikası
      <div class="radio-group reservation-flexibility-radio-group">
        <div class="radio-group-header">
          <h5>{{ $t("filter_header_payment") }}</h5>
        </div>
        <div class="reservation-flexibility-content">
          <input type="radio" value="0" v-model="picked" />
          <label for="one">{{ $t("filter_header_esnek") }}</label>
        </div>

        <div class="reservation-flexibility-content">
          <input type="radio" value="1" v-model="picked" />
          <label for="two">{{ $t("filter_header_katı") }}</label>
        </div>
      </div>
      -->
      <div class="range-slider" data-role="rangeslider">
        <div clas="range-slider-header">
          <h5>{{ $t("filter_header_price_range") }}</h5>
        </div>
        <vue-slider
          v-model="rangeSliderValue"
          :min="1"
          :max="150000"
        ></vue-slider>
        <div class="range-slider-minmax-card">
          <div class="maxmin-card min">
            <div class="maxmin-card-header">{{ $t("filter_header_min") }}</div>
            {{
              rangeSliderValue[0] + getCurrency[getSelectedCurrency - 1].symbol
            }}
          </div>
          <div class="maxmin-card max">
            <div class="maxmin-card-header">{{ $t("filter_header_max") }}</div>
            {{
              rangeSliderValue[1] + getCurrency[getSelectedCurrency - 1].symbol
            }}
          </div>
        </div>
      </div>
   
      <div class="radio-group is-super-captain-info">
        <div class="radio-group-header">
          <h5>{{ $t("filter_header_boat_rent_type") }}</h5>
        </div>
        <div class="is-super-captain-content">
          <input type="radio" id="oneRadio" value="1" v-model="isCaptain" />
          <label for="oneRadio">{{ $t("filter_header_with_captain") }}</label>
        </div>
        <div class="is-super-captain-content">
          <input type="radio" id="twoRadio" value="0" v-model="isCaptain" />
          <label for="twoRadio">{{
            $t("filter_header_without_captain")
          }}</label>
        </div>
      </div>
      <!--
      <div class="form-check-super-captain form-switch">
        <div class="form-check-super-captain-header">
          <h5>{{ $t("footers_boat_owner") }}</h5>
        </div>
        <div class="check-super-captain-content">
          <input
            class="form-check-super-captain"
            type="checkbox"
            id="flexSwitchCheckDefault"
            v-model="isSuperCaptain"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault">{{
            $t("filter_header_super_captain")
          }}</label>
        </div>
      </div>

      <div class="guest-info">
        <div class="guest-info-header">
          <h5>{{ $t("filter_header_number_guests") }}</h5>
        </div>
        <div class="reservation-panel-dropdown-content">
          <div
            class="qtyButtons"
            style="
              display: flex;
              margin-top: 25px;
              padding: 5px;
              justify-content: flex-start;
              align-content: start;
              align-items: start;
            "
          >
            <div
              class="qtyDec"
              style="width: 30px; height: 30px; font-size: 1.75rem"
              @click="guestDec"
            ></div>
            <input type="text" name="qtyInput" v-model="guestCounter" />
            <div
              class="qtyInc"
              style="width: 30px; height: 30px; font-size: 1.75rem"
              @click="guestInc"
            ></div>
          </div>
        </div>
      </div>

      <div class="checkbox-filter boat-rules">
        <div class="checkbox-filter-header">
          <h5>{{ $t("filter_header_boat_rent_rule") }}</h5>
        </div>
        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="rule1"
            value="br.pet_free"
            v-model="checkedRules"
          />
          <label for="rule1">{{ $t("filter_header_pet") }}</label>
        </div>
        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="rule2"
            value="br.is_food_included"
            v-model="checkedRules"
          />
          <label for="rule2">{{ $t("filter_header_meal_included") }}</label>
        </div>
        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="rule3"
            value="br.is_meal_prep_included"
            v-model="checkedRules"
          />
          <label for="rule3">{{ $t("filter_header_meal_prep") }}</label>
        </div>

        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="rule4"
            value="br.is_alcohol_included"
            v-model="checkedRules"
          />
          <label for="rule4">{{ $t("filter_header_alkol_included") }}</label>
        </div>

        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="rule5"
            value="br.is_the_tip_included"
            v-model="checkedRules"
          />
          <label for="rule5">{{ $t("filter-header_tip_included") }}</label>
        </div>
       
      </div>
      -->
      <!--
      <div class="checkbox-filter captain-language">
        <div class="checkbox-filter-header">
          <h5>{{ $t("filter_header_boat_owner_languages") }}</h5>
        </div>
        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="lang1"
            value="Türkçe"
            v-model="checkedLanguages"
          />
          <label for="lang1">Türkçe</label>
        </div>
        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="lang2"
            value="English"
            v-model="checkedLanguages"
          />
          <label for="lang2">English</label>
        </div>
        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="lang3"
            value="Español"
            v-model="checkedLanguages"
          />
          <label for="lang3">Español</label>
        </div>
        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="lang4"
            value="日本語"
            v-model="checkedLanguages"
          />
          <label for="lang4">日本語</label>
        </div>
        <div class="checkbox-filter-content">
          <input
            type="checkbox"
            id="lang5"
            value="Português"
            v-model="checkedLanguages"
          />
          <label for="lang5">Português</label>
        </div>
      </div>
      -->
      <div class="button-filter-search">
        <button @click="clearFilterBoat()" class="button-content">
          {{ $t("filter_header_clean_all") }}
        </button>
        <button @click="getDetailFilterBoat()" class="button-content">
          {{ $t("filter_header_apply_filter") }}
        </button>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  FETCH_BOAT_TYPE,
  FETCH_FILTER_BOATS,
} from "../../../store/actions.type";
import format from "date-fns/format";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  props: ["changeFunc", "boundsData", "mapController"],
  data() {
    return {
      masks: {
        input: "D MMMM",
      },
      dateFormat: "YYYY-MM-DD",
      range: {
        start: new Date(),
        end: new Date(),
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
      sortSearchList: [
        { name: "suggested_sorting", value: "commentAvarage", asc: 0 },
        { name: "highest_price_first", value: "nativePrice", asc: 0 },
        { name: "lowest_price_first", value: "nativePrice", asc: 1 },
        {
          name: "maximumguest_capacity_first",
          value: "personCapacity",
          asc: 0,
        },
        {
          name: "minimum_guest_capacity_first",
          value: "personCapacity",
          asc: 1,
        },
      ],
      boatTypeList: [
        {
          name: "map_filter_header_all_boat",
          value: "Tüm Tekneler",
        },
        { name: "filter_header_katamaran", value: "Katamaran" },
        { name: "filter_header_gulet", value: "Gulet" },
        { name: "filter_header_motoryat", value: "Motoryat" },
        { name: "filter_header_surat", value: "Sürat Teknesi" },
        {
          name: "filter_header_yelkenlı",
          value: "Yelkenli",
        },
        {
          name: "filter_header_other",
          value: "Diğer",
        },
      ],
      sortSearchItem: { name: "suggested_sorting", value: "commentAvarage" },
      boatTypeListItem: {
        name: "map_filter_header_all_boat",
        value: "Tüm Tekneler",
      },
      checkedRules: [],
      checkedLanguages: [],
      guestCounter: 1,
      guestCounterTempValue: 1,
      isSuperCaptain: "",
      isCaptain: null,
      priceFilter: [],
      picked: "",
      boatTypePicked: "Tüm Tekneler",
      rangeSliderValue: [1, 150000],
      rangeSliderTempValue: [1, 150000],
      priceClick: false,
      boatTypeClick: false,
      guestCounterClick: false,
      page: 1,
      startDate:
        this.$router.history.current.params["startDate"] ??
        format(new Date(), "YYYY-MM-DD"),
      endDate:
        this.$router.history.current.params["endDate"] ??
        format(new Date(), "YYYY-MM-DD"),
    };
  },

  computed: {
    ...mapGetters([
      "getBoatTypes",
      "getBoatType",
      "getBoatType",
      "getStartDate",
      "getEndDate",
      "getSelectedCurrency",
      "getCurrency",
    ]),
  },
  watch: {
    getBoatType: function () {
      var selectedBoat = this.boatTypeList.find(
        (x) => x.value == this.getBoatType
      );
      if (selectedBoat == undefined) {
        this.boatTypeListItem = {
          name: "map_filter_header_all_boat",
          value: "Tüm Tekneler",
        };
        this.boatTypePicked = "Tüm Tekneler";
      } else {
        this.boatTypeListItem = selectedBoat;
        this.boatTypePicked = this.getBoatType;
      }
    },
  },
  async created() {
    this.$store.dispatch(FETCH_BOAT_TYPE);
    $(document).mouseup(function (e) {
      var container = $(".filter-dropdown-container");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
      }
    });
  },
  methods: {
    async clearPriceFilter() {
      document.getElementById("map-filter").style.overflow = "visible";
      this.rangeSliderValue = [1, 150000];
      this.$store.state.boat.filterBoats = [];
      this.$store.commit("setMinPrice", this.rangeSliderValue[0]);
      this.$store.commit("setMaxPrice", this.rangeSliderValue[1]);
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
      if (this.mapController == false) {
        this.$store.commit(
          "setBoatCountry",
          this.$router.history.current.params["boatCountry"]
        );
        this.$store.commit(
          "setBoatState",
          this.$router.history.current.params["boatState"]
        );
        this.$store.commit(
          "setBoatCity",
          this.$router.history.current.params["boatCity"]
        );

        await this.$store.dispatch(FETCH_FILTER_BOATS);
        this.$store.commit("setMapBoatSmilarBoatController", false);
         this.changeFunc(true);
      } else {
        await this.$store.dispatch(FETCH_FILTER_BOATS, this.boundsData);
      }
      this.$store.commit("setMapBoatSmilarBoatController", false);
      this.rangeSliderTempValue = this.rangeSliderValue;
      this.priceClick = false;
    },
    async clearGuestCounterTempValue() {
      this.guestCounter = 1;
      this.$store.commit(
        "setBoatCountry",
        this.$router.history.current.params["boatCountry"]
      );
      this.$store.commit(
        "setBoatState",
        this.$router.history.current.params["boatState"]
      );
      this.$store.commit(
        "setBoatCity",
        this.$router.history.current.params["boatCity"]
      );
      this.$store.commit("setPersonCapacity", parseInt(this.guestCounter));
      this.$store.state.boat.filterBoats = [];
      await this.$store.dispatch(FETCH_FILTER_BOATS);
      this.guestCounterTempValue = 1;
      this.$store.commit("setMapBoatSmilarBoatController", false);
      this.changeFunc(true);
      this.priceClick = false;
    },
    returnStartDate() {
      var lang = this.$i18n.locale;
      return new Date(this.getStartDate).toLocaleDateString(
        lang + "-" + lang.toUpperCase(),
        {
          month: "long",
          day: "2-digit",
        }
      );
    },
    returnEndDate() {
      var lang = this.$i18n.locale;

      return new Date(this.getEndDate).toLocaleDateString(
        lang + "-" + lang.toUpperCase(),
        {
          month: "long",
          day: "2-digit",
        }
      );
    },
    async onDayClick(day) {
      if (
        this.getStartDate != format(this.range.start, this.dateFormat) ||
        this.getEndDate != format(this.range.end, this.dateFormat)
      ) {
        this.$store.commit(
          "setStartDate",
          format(this.range.start, this.dateFormat)
        );
        this.$store.commit(
          "setEndDate",
          format(this.range.end, this.dateFormat)
        );
        if (this.boundsData != undefined) {
          this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
          var data = await this.$store.dispatch(
            FETCH_FILTER_BOATS,
            this.boundsData
          );
        } else {
          await this.$store.dispatch(FETCH_FILTER_BOATS);
        }
        this.changeFunc(true);
      }
    },
    customName({ name, value, asc }) {
      //this.$store.state.boat.allBoatsPaginableRequestModel.page
      return this.$t(name);
    },
    showDropdown() {},
    hideDropdown() {},
    async onSelect(option) {
      this.guestCounterClick = false;
      this.$store.state.boat.filterBoatModel.orderBy = option.value;
      this.$store.state.boat.filterBoatModel.ascending = option.asc;
      this.$store.state.boat.allBoats = [];
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);

      if (this.boundsData != undefined) {
        var data = await this.$store.dispatch(
          FETCH_FILTER_BOATS,
          this.boundsData
        );
      } else {
        await this.$store.dispatch(FETCH_FILTER_BOATS);
      }
      document.getElementById("map-filter").style.overflow = "visible";
      this.changeFunc(true);
    },
    async clearBoatType() {
      this.$store.state.boat.filterBoats = [];
      this.$store.commit("setBoatType", "Tüm Tekneler");
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
       this.$store.commit("setMapBoatSmilarBoatController", false);
      if (this.mapController == false) {
        this.$store.commit(
          "setBoatCountry",
          this.$router.history.current.params["boatCountry"]
        );
        this.$store.commit(
          "setBoatState",
          this.$router.history.current.params["boatState"]
        );
        this.$store.commit(
          "setBoatCity",
          this.$router.history.current.params["boatCity"]
        );

        await this.$store.dispatch(FETCH_FILTER_BOATS);
        this.$store.commit("setMapBoatSmilarBoatController", false);
         this.changeFunc(true);
      } else {
        await this.$store.dispatch(FETCH_FILTER_BOATS, this.boundsData);
      }

     
      this.boatTypePicked = "Tüm Tekneler";
      this.boatTypeClick = false;
    },
    async changeBoatList(type) {
      this.$store.commit("setBoatType", type);
      this.$store.state.boat.filterBoats = [];
      this.$store.state.boat.filterBoatModel.filterObject = {
        "bt.name": this.$store.state.boat.boatType,
      };
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
      await this.$store.dispatch(FETCH_FILTER_BOATS);
      this.changeFunc(true);
    },
    guestInc() {
      if (this.guestCounter) {
        this.guestCounter++;
      }
    },
    guestDec() {
      if (this.guestCounter > 1) {
        this.guestCounter--;
      }
    },

    async getDetailFilterBoat() {
      this.$store.commit(
        "setBoatCountry",
        this.$router.history.current.params["boatCountry"]
      );
      this.$store.commit(
        "setBoatState",
        this.$router.history.current.params["boatState"]
      );
      this.$store.commit(
        "setBoatCity",
        this.$router.history.current.params["boatCity"]
      );
      this.$store.commit("setCheckedRules", this.checkedRules);
      this.$store.commit("setBoatType", this.boatTypePicked);
      this.$store.commit("setPersonCapacity", parseInt(this.guestCounter));
      this.$store.commit("setMinPrice", this.rangeSliderValue[0]);
      this.$store.commit("setMaxPrice", this.rangeSliderValue[1]);
      this.rangeSliderTempValue = this.rangeSliderValue;
      this.$store.commit("setLanguages", this.checkedLanguages.join(","));
      if (!this.isSuperCaptain) {
        this.isSuperCaptain = "";
      }

      this.$store.commit("setIsSuperCaptain", this.isSuperCaptain);
      this.$store.commit("setIsCaptain", parseInt(this.isCaptain));
      this.$store.commit("setReservationFlexibility", this.picked);
      this.$store.state.boat.filterBoats = [];
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
      this.$store.commit("setMapBoatSmilarBoatController", false);
      await this.$store.dispatch(FETCH_FILTER_BOATS);
      this.guestCounterTempValue = this.guestCounter;
      this.changeFunc(true);
      this.$modal.hide("filter-modal");
    },
    clearFilterBoat() {
      this.range = {
        start: new Date(),
        end: new Date(),
      };
      this.$store.commit(
        "setStartDate",
        format(this.range.start, this.dateFormat)
      );
      this.$store.commit("setEndDate", format(this.range.end, this.dateFormat));
      (this.checkedRules = []),
        (this.checkedLanguages = []),
        (this.guestCounter = 1),
        (this.isSuperCaptain = ""),
        (this.priceFilter = []),
        (this.picked = ""),
        (this.boatTypePicked = "Tüm Tekneler"),
        (this.rangeSliderValue = [1, 150000]),
        (this.rangeSliderTempValue = [1, 150000]),
        (this.isCaptain = null);
    },
    async filterByPrice() {
      document.getElementById("map-filter").style.overflow = "visible";
      this.$store.state.boat.filterBoats = [];
      this.$store.commit("setMinPrice", this.rangeSliderValue[0]);
      this.$store.commit("setMaxPrice", this.rangeSliderValue[1]);
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
      await this.$store.dispatch(FETCH_FILTER_BOATS);
      (this.rangeSliderTempValue = this.rangeSliderValue),
        this.changeFunc(true);
      this.priceClick = false;
    },
    async filterByBoatType(item) {
      document.getElementById("map-filter").style.overflow = "visible";
      this.$store.state.boat.filterBoats = [];
      this.$store.commit("setBoatType", item.value);
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);

      if (this.mapController == false) {
        await this.$store.dispatch(FETCH_FILTER_BOATS);

      } else {
        await this.$store.dispatch(FETCH_FILTER_BOATS, this.boundsData);
      }
      this.boatTypeClick = false;
    },
    async clearFilterByBoatType() {
      document.getElementById("map-filter").style.overflow = "visible";
      this.$store.state.boat.filterBoats = [];
      this.$store.commit("setBoatType", "Tüm Tekneler");
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
      await this.$store.dispatch(FETCH_FILTER_BOATS);
      this.changeFunc(true);
      this.boatTypePicked = "Tüm Tekneler";
      this.boatTypeClick = false;
    },
    async filtertByGuests() {
      document.getElementById("map-filter").style.overflow = "visible";
      this.$store.state.boat.filterBoats = [];
      this.$store.commit("setPersonCapacity", parseInt(this.guestCounter));
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
      await this.$store.dispatch(FETCH_FILTER_BOATS);
      this.guestCounterTempValue = this.guestCounter;
      this.changeFunc(true);
      this.guestCounterClick = false;
    },
    show() {
      this.$modal.show("filter-modal");
    },
    hide() {
      this.$modal.hide("filter-modal");
    },
  },
};
</script>

<style>
.delete-filter-item {
  text-align: center;
  border: 1px solid lightgray;
  border-radius: 99px;
  padding: 10px;
  font-weight: bold;
}
.right-filter-button input,
.map-boat-type input {
  width: 200px !important;
}
.filter-button {
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
}
.multiselect__single {
  background-color: transparent !important;
}
.header-filter {
  padding-bottom: 10px;
  margin-top: 80px;
  padding-right: 10px;
  padding-left: 10px;
}
.captain-language,
.boat-rules,
.radio-group {
  padding-top: 48px;
  display: grid;
  padding-left: 16px;
  grid-template-columns: 50% 50%;
}

.checkbox-filter-header,
.radio-group-header {
  grid-column: span 2;
}
.range-slider-minmax-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5em;
  justify-items: center;
  padding: 38px 0 10px 0;
}
.maxmin-card {
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.maxmin-card-header {
  color: #ddd;
}
.vue-slider {
  padding-top: 38px !important;
  padding-right: 10px !important;
}
.qtyButtons-guest-text {
  width: 90px;
  height: 90px;
  text-align: center;
  align-items: center;
  font-size: 2.5em;
  display: flex;
  justify-content: center;
}
.boat-type input {
  border-top: 1px solid rgb(247, 247, 247) !important;
  border: none !important;
  font-size: 14px !important;
  line-height: 18px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  background: transparent;
  color: rgb(113, 113, 113) !important;
  padding: 10px !important;
  position: relative !important;
}
.boat-type input:hover {
  background-color: rgb(247, 247, 247) !important;
  border-radius: 8px !important;
}

.filter {
  right: 0px !important;
  cursor: pointer !important;
  text-align: center !important;
  border: 1px solid rgb(221, 221, 221) !important;
  background-color: rgb(255, 255, 255) !important;
  outline: none !important;
  margin: 0px !important;
  border-radius: 18px !important;
  color: #333 !important;
  position: relative !important;
  font-size: 14px !important;
  line-height: 16px !important;
  padding: 11px 42px !important;
  font-weight: 600;
}
.filter-button {
  justify-content: space-between;
}
.filter-button::-webkit-scrollbar {
  display: none;
}
.header-filter .vm--modal {
  height: auto !important;
  max-height: 700px !important;
  overflow-y: scroll !important;
  text-align: start;
  top: calc((100% - 750px) / 2) !important;
}
.vm--modal {
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px;
  padding: 20px;
}
.guest-info,
.form-check-super-captain,
.range-slider {
  padding-top: 48px;
  padding-left: 16px;
}
.radio-group1 {
  padding-top: 28px !important;
  padding-bottom: 28px !important;
  border-bottom: 1px solid rgb(235, 235, 235) !important;
}
.button-filter-search {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 20px 0;
  z-index: 5;
  position: sticky;
  border-top: 1px solid #ddd;
  bottom: 0;
}
.header-filter .vm--modal {
  padding-bottom: 0px !important;
}
.button-content {
  background: #000;
  padding: 10px 25px;
  color: #fff;
  border-radius: 12px;
}
.check-super-captain-content,
.is-super-captain-content,
.checkbox-filter-content,
.reservation-flexibility-content,
.boat-type-content {
  display: flex;
  align-items: center;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
  display: inline-block !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: rgb(176, 176, 176) !important;
  height: 24px !important;
  width: 24px !important;
  margin: 15px 15px 15px 0 !important;
  accent-color: #000;
}
.vue-slider-process {
  background-color: #000 !important;
}
.vue-slider-dot-tooltip-inner {
  border-color: #ef4036;
  background-color: #ef4036;
}
@media (max-width: 942px) {
  .boat-type {
    display: none !important;
  }
}
@media (max-width: 700px) {
  .header-filter .vm--modal {
    height: 100% !important;
    overflow-y: scroll !important;
    top: 0px !important;
    max-height: 100% !important;
  }
}
@media (max-width: 400px) {
  .filter-button {
    justify-content: start !important;
    overflow-x: scroll;
  }
  .filter-button::-webkit-scrollbar {
    display: none;
  }
  .header-filter {
    position: relative;
  }
  .header-filter:after {
    position: absolute !important;
    height: 100% !important;
    width: 30px !important;
    z-index: 3 !important;
    right: 0px !important;
    top: 0;
    background: linear-gradient(
      to left,
      rgb(255 255 255) 56.77%,
      rgba(255, 255, 255, 0) 94.47%
    ) !important;
    content: "";
  }
}

@media (max-width: 480px) {
  .hide-item-for-mobil {
    display: none !important;
  }
}
</style>