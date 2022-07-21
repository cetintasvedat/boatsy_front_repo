<template>
  <div class="header-filter">
    <div class="row filter-button" v-if="getBoatTypes.length == 0">
      <div class="col-md-7 col-sm-4">
        <div class="boat-type">
          <input
            type="button"
            v-for="i in 6"
            class="loading-filter-button"
            style="
              height: 20px;
              margin-top: 15px;
              width: 5%;
              background-color: #ddd;
              border-radius: 3%;
              animation-name: loadingEffect;
              animation-duration: 1s;
              animation-iteration-count: infinite;
            "
          />
        </div>
      </div>
    </div>
    <div class="filter-button" v-else id="map-filter">
      <div class="type-buttons">
        <div class="boat-type" style="margin-left: -15px">
          <input
            type="button"
            v-for="(item, index) in getBoatTypes"
            :key="index"
            :value="$t(item.name)"
            @click="changeBoatList(item.name)"
          />
        </div>
      </div>
      <div
        class="right-filter-button"
        style="display: flex; gap: 10px; justify-content: end"
      >
        <div class="select-asc-border">
          <multiselect
            v-model="sortSearchItem"
            :options="sortSearchList"
            :searchable="false"
            placeholder="Sıralama"
            :close-on-select="true"
            :show-labels="false"
            @close="hideDropdown"
            @open="showDropdown"
            :custom-label="customName"
            @select="onSelect"
          ></multiselect>
        </div>
        <input
          type="button"
          @click="show"
          :value="$t('filter_header_filtr')"
          style="margin-right: 0"
        />
      </div>
    </div>
    <modal name="filter-modal" :scrollable="true">
      <div class="fixed-header">
        <div class="modal-header">
          <h1 style="font-size: 1.5rem; color: #ef4036; font-weight: bold">
            {{ $t("filter_header_filters") }}
          </h1>
          <i class="fas fa-times" @click="hide()"></i>
        </div>
      </div>
      <div class="radio-group boat-type-radio-group">
        <div class="radio-group-header">
          <h2 style="font-size: 1.25rem">
            {{ $t("filter_header_boat_type") }}
          </h2>
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
          <input
            type="radio"
            :value="$t('filter_header_motoryat')"
            v-model="boatTypePicked"
          />
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
      </div>
      <!---  Ödeme Politikası
      <div class="radio-group reservation-flexibility-radio-group">
        <div class="radio-group-header">
          <h2 style="font-size: 1.25rem">{{ $t("filter_header_payment") }}</h2>
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
--->
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
            {{ rangeSliderValue[0] }}
          </div>
          <div class="maxmin-card max">
            <div class="maxmin-card-header">{{ $t("filter_header_max") }}</div>
            {{ rangeSliderValue[1] }}
          </div>
        </div>
      </div>
      <div class="radio-group is-super-captain-info">
        <div class="radio-group-header">
          <h2 style="font-size: 1.25rem">
            {{ $t("filter_header_boat_rent_type") }}
          </h2>
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

      <div class="form-check-super-captain form-switch">
        <div class="form-check-super-captain-header">
          <h2 style="font-size: 1.25rem">{{ $t("footers_boat_owner") }}</h2>
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
          <h2 style="font-size: 1.25rem">
            {{ $t("filter_header_number_guests") }}
          </h2>
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
            <input
              type="text"
              name="qtyInput"
              style="font-weight: normal !important"
              v-model="guestCounter"
            />
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
          <h2 style="font-size: 1.25rem">
            {{ $t("filter_header_boat_rent_rule") }}
          </h2>
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
        <!--  Bahşiş dahil ve Alkol dahil
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
-->
      </div>

      <div class="checkbox-filter captain-language">
        <div class="checkbox-filter-header">
          <h2 style="font-size: 1.25rem">
            {{ $t("filter_header_boat_owner_languages") }}
          </h2>
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
import { FETCH_BOAT_TYPE, FETCH_ALL_BOATS } from "../../../store/actions.type";
import VModal from "vue-js-modal";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
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
      sortSearchItem: { name: "suggested_sorting", value: "commentAvarage" },
      checkedRules: [],
      checkedLanguages: [],
      guestCounter: 1,
      isCaptain: "",
      isSuperCaptain: "",
      priceFilter: [],
      picked: "",
      boatTypePicked: "",
      rangeSliderValue: [1, 150000],
      userId:
        localStorage.getItem("profileModel") != null
          ? JSON.parse(localStorage.getItem("profileModel")).id ?? 0
          : 0,
    };
  },
  computed: {
    ...mapGetters(["getBoatTypes"]),
  },
  async created() {
    this.$store.dispatch(FETCH_BOAT_TYPE);
  },
  methods: {
    customName({ name, value, asc }) {
      //this.$store.state.boat.allBoatsPaginableRequestModel.page
      return this.$t(name);
    },
    showDropdown() {
      document.getElementById("map-filter").style.overflow = "visible";
    },
    hideDropdown() {
      document.getElementById("map-filter").style.overflow = "scroll";
    },
    onSelect(option) {
      this.$store.state.boat.allBoatsPaginableRequestModel.orderBy =
        option.value;
      this.$store.state.boat.allBoatsPaginableRequestModel.ascending =
        option.asc;
      this.$store.state.boat.allBoats = [];
      this.$store.dispatch(FETCH_ALL_BOATS);
      document.getElementById("map-filter").style.overflow = "scroll";
    },
    changeBoatList(type) {
      this.$router.push({
        name: "AllBoats",
        params: {
          boatType: type,
        },
      });
      window.location.reload();
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
    getDetailFilterBoat() {
      var filterObjects = [];
      var extras = [];

      this.checkedRules.forEach((element) => {
        filterObjects[element] = true;
      });

      if (this.boatTypePicked != "") {
        filterObjects["bt.name"] = this.boatTypePicked;
      }

      if (!this.isSuperCaptain) {
        this.isSuperCaptain = "";
      }

      if (this.picked != "") {
        filterObjects["br.reservation_flexibility"] = parseInt(this.picked);
      }

      if (this.isCaptain != "") {
        filterObjects["b.captain"] = parseInt(this.isCaptain);
      }
      var languages = this.checkedLanguages.join(",");
      extras =
        '{"is_super_captain":"' +
        this.isSuperCaptain +
        '","person_capacity":' +
        parseInt(this.guestCounter) +
        ',"price_Filter":"' +
        this.rangeSliderValue[0] +
        "-" +
        this.rangeSliderValue[1] +
        '","cap_lang":"' +
        languages +
        "," +
        '","user_id":"' +
        this.userId +
        '"}';

      this.$store.state.boat.allBoatsPaginableRequestModel.filterObject =
        Object.assign({}, filterObjects);
      this.$store.state.boat.allBoatsPaginableRequestModel.extras = extras;
      this.$store.state.boat.allBoatsPaginableRequestModel.page = 1;
      this.$store.state.boat.allBoats = [];
      this.$store.dispatch(FETCH_ALL_BOATS, 1);
      this.$modal.hide("filter-modal");
    },

    clearFilterBoat() {
      (this.checkedRules = []),
        (this.checkedLanguages = []),
        (this.guestCounter = 1),
        (this.isSuperCaptain = ""),
        (this.priceFilter = []),
        (this.picked = ""),
        (this.boatTypePicked = ""),
        (this.rangeSliderValue = [1, 150000]);
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
</style>
