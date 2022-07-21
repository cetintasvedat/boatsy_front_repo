<template>
  <div
    class="row no-gutters custom-search-input-2 radius-style"
    style="
      position: relative;
      letter-spacing: 0.7px;
      background: white;
      border-radius: 99px !important;
    "
  >
    <div class="col-10">
      <div class="" style="position: absolute">
        <v-select
          :style="'max-height:10px !important'"
          v-model="boatLocation"
          :options="getLocationList"
          :filterBy="filterBy"
          @input="Search(boatLocation, guestCounter, selectedType)"
          :dropdown-should-open="dropdownShouldOpen"
          :clearable="false"
          :placeholder="$t('search_bar_search_location')"
          ><span
            slot="noOptions"
            style="display: flex !important; justify-content: center"
          >
            <img src="/assets/images/loading.gif" style="width: 0px" />
          </span>
          <span slot="noResult"></span>
        </v-select>
      </div>
    </div>

    <div
      class="col-2 search-button-container hide-item-for-mobile"
      style="padding-right: 2px; margin-top: -1px"
    >
      <button
        style="
          height: 50px !important;
          width: 50px !important;
          background: #ef4036 !important;
          border-radius: 999px !important;
        "
        class="btn"
        @click="Search(boatLocation, guestCounter, selectedType)"
      >
        <i
          class="fa fa-search fa-2x"
          style="
            font-size: x-large;
            color: white;
            padding-right: 23px;
            padding-top: 2px;
          "
        ></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "SearchBar",
  components: {},
  data() {
    return {
      boatLocation: null,
      show: true,
      guestCounter: 1,
      selectedType: { id: 0, name: "Tüm Tekneler" },
      mouse_is_inside: false,
      alertShow: "hidden",
      searchSelectHeight: 0,
      locationList: [],
    };
  },
  computed: {
    ...mapGetters([
      "getFilterBoats",
      "getPopularBoats",
      "getBoatTypes",
      "getLocationList",
      "getBoatType",
      "getSelectedLang",
    ]),
  },
  async created() {
    window.addEventListener("click", this.mouseClick);
    this.getStateBoatType();
  },
  destroyed() {
    window.removeEventListener("click", this.mouseClick);
  },
  methods: {
    filterBy(option, label, search) {
      return (
        (label || this.replaceUmlauts(label) || "")
          .toLocaleLowerCase()
          .indexOf(search.toLocaleLowerCase()) > -1 ||
        (this.replaceUmlauts(label) || "")
          .toLocaleLowerCase()
          .indexOf(search.toLocaleLowerCase()) > -1
      );
    },
    replaceUmlauts(str) {
      return str
        .replace("ö", "o")
        .replace("ş", "s")
        .replace("ü", "u")
        .replace("ç", "c")
        .replace("ğ", "g")
        .replace("İ", "I")
        .replace("ı", "i");
    },
    dropdownShouldOpen(VueSelect) {
      if (this.boatLocation != null) {
        return VueSelect.open;
      }

      return VueSelect.search.length > 2 && VueSelect.open;
    },
    getStateBoatType() {
      var typeData = { id: 0, name: "Tüm Tekneler" };
      this.getBoatTypes.forEach((element) => {
        if (element.name == this.getBoatType) {
          typeData = [];
          typeData = { id: element.id, name: element.name };
        }
      });
      this.selectedType = typeData;
    },
    Search(boatLocation, guestCounter, selectedType) {
      var country, state, city;

      this.$store.commit("setCheckedRules", []);
      this.$store.commit("setBoatType", "Tüm Tekneler");
      this.$store.commit("setPersonCapacity", 1);
      this.$store.commit("setMinPrice", 1);
      this.$store.commit("setMaxPrice", 150000);
      this.$store.commit("setLanguages", []);
      this.$store.commit("setIsSuperCaptain", "");
      this.$store.commit("setIsCaptain", null);
      this.$store.commit("setReservationFlexibility", "");
      this.$store.state.boat.filterBoats = [];
      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
      this.$store.commit("setMapBoatSmilarBoatController", false);

      if (this.boatLocation != "" && this.boatLocation != null) {
        if (this.boatLocation.indexOf(",") != -1) {
          const location = boatLocation.split(",");
          if (location.length == 2) {
            country = location[1];
            state = location[0];
          }
          if (location.length == 3) {
            country = location[2];
            state = location[1];
            city = location[0];
          }

          if (city == "" || city == undefined) {
            window.fbq("track", "Search", {
              country: country,
              state: state,
            });
            this.$router.push({
              name: "MapBoatsOnlyState",
              params: {
                boatState: state,
              },
            });
          } else {
            window.fbq("track", "Search", {
              country: country,
              state: state,
              city: city,
            });
            this.$router.push({
              name: "MapBoatsLocation",
              params: {
                boatState: state,
                boatCity: city,
              },
            });
          }
        } else {
          window.fbq("track", "Search", {
            country: country,
          });
          country = this.boatLocation == null ? "Türkiye" : boatLocation;
          this.$store.commit("setBoatCountry", country);
          this.$router.push({
            name: "MapBoatsOnlyCountry",
            params: {
              boatCountry: country,
            },
          });
        }
        this.$store.commit("setBoatLocationSearchModel", this.boatLocation);

        this.$store.state.boatLocation = [];
      } else {
        window.fbq("track", "Search", {
          country: "Türkiye",
        });
        this.$store.commit("setBoatCountry", "Türkiye");
        this.$router.push({
          name: "MapBoatsOnlyCountry",
          params: {
            boatCountry: "Türkiye",
          },
        });
      }
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
    mouseClick(event) {
      var ignoreClickOnMeElement = document.getElementById("dropdown-content");

      var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);

      if (!isClickInsideElement) {
        this.mouse_is_inside = false;
      } else {
        this.mouse_is_inside = true;
      }
    },
  },
};
</script>
<style>
.vs__dropdown-toggle {
  padding-top: 10px !important;
}
.vs__dropdown-menu {
  width: 900px !important;
  border-radius: 35px !important;
  margin-top: 60px !important;
}
.vs__selected-options {
  width: 900px !important;
}
.vs__dropdown-option {
  color: black !important;
}
.vs__dropdown-option--highlight {
  color: black !important;
  background: none !important;
  font-size: bold !important;
}
vs__dropdown-option
  vs__dropdown-option--selected
  vs__dropdown-option--highlight {
  background: #4b4b4b26 !important;
}
.vs--searchable .vs__dropdown-toggle {
  border: none !important;
  width: 800px;
  margin-left: 21px !important;
}
.vs__open-indicator {
  display: none;
}

.search-bar-background-color {
  background: #ffffffcc;
}
.radius-style {
  border-radius: 25px !important;
}

@media (min-width: 991px) {
  .vs__dropdown-menu {
    width: 900px !important;
  }
  .vs__selected-options {
    width: 900px !important;
  }
}

@media (max-width: 991px) {
  .vs__dropdown-menu {
    width: 650px !important;
  }
  .vs__selected-options {
    width: 650px !important;
  }
  .vs__dropdown-toggle {
    width: 550px !important ;
  }
  .multiselect__tags {
    border-radius: 3px !important;
    background: transparent !important;
  }
  .multiselect__single {
    padding-left: 0 !important;
  }
}
@media (max-width: 770px) {
  .vs__dropdown-toggle {
    width: 430px !important ;
  }
  .vs__dropdown-menu {
    width: 115% !important;
  }
  .vs__selected-options {
    width: 500px !important;
  }
}
.custom-search-input-2 input {
  border: none !important;
  color: #0000007d !important;
  font-size: 15px !important;
  margin: 10px !important;
}
@media (max-width: 591px) {
  .custom-search-input-2 input {
    margin: 6px !important;
  }
  .custom-search-input-2 {
    margin: 0px 30px 0 30px !important;
  }
  .vs__dropdown-toggle {
    width: 300px !important ;
    padding-top: 13px !important;
  }
  .vs__dropdown-menu {
    width: 120% !important;
  }
}
/*** Misafir ***/
.qtyTotal {
  background-color: #ef4036;
  font-size: 13px;
  line-height: 25px;
  top: 0;
  left: 5px;
  height: 25px;
  width: 25px;
  box-shadow: 0px 6px 16px rgb(0 0 0 / 10%) !important;
}

.custom-search-input-2 input:focus {
  border-right: none !important;
}

.custom-search-input-2 input[type="submit"] {
  background-color: #ef4036 !important;
}

.form-control.radius-style {
  height: 50px;
  border: none;
}
.search-button i {
  background-color: ;
}
.multiselect__input {
  background: transparent !important;
}
/*** Vue-multiselect ***/
.main-content .multiselect__select:before {
  font-family: "ElegantIcons";
  font-display: swap;
  content: "\33";
  font-size: 1.5rem !important;
  color: transparent;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  right: 0;
  top: -8px;
  position: relative;
  right: 0;
  top: 38%;
  margin-top: 4px;
  border: none;
}

.multiselect--active .multiselect__select {
  transform: none !important;
}

.multiselect--active .multiselect__select:before {
  transform: rotate(180deg);
}
.select-asc-border .multiselect__single {
  font-size: 0.875rem;
  color: #333;
  line-height: 17px !important;
}
.multiselect__tags {
  padding-top: 3px !important;
  padding-left: 20px !important;
  border: none !important;
  height: 50px;
  border-radius: 54px 0px 0 54px;
}
.main-content .multiselect__single {
  padding-left: 13px;
  font-weight: 600 !important;
  font-size: 16px !important;
}

.multiselect__option {
  color: #000 !important;
  font-weight: 500 !important;
  font-size: 14px !important;
}
.multiselect__single,
.multiselect__placeholder {
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  color: #000;
  font-weight: 500;
  transition: all 0.3s;
  display: block;
  position: relative;
}

.multiselect__element {
  height: 50px;
}

.multiselect__content-wrapper {
  z-index: 99999999999 !important;
}

.multiselect__option--highlight {
  background: #ef4036;
  outline: none;
  color: #fff !important;
}

.radius-style .alert-info {
  font-size: 16px;
  font-weight: 600;
  background-color: rgba(255, 40, 40, 0.5);
  padding: 10px;
  border: 1px solid rgb(255, 40, 40);
  border-radius: 30px;
  position: absolute;
  top: -60px;
}
.panel-dropdown-content {
  top: 80px;
  width: 150%;
  height: 75px;
}
.panel-dropdown-content .qtyInc,
.panel-dropdown-content .qtyDec {
  width: 30px;
  height: 30px;
  font-size: 2rem;
}

@media (max-width: 591px) {
  .hide-item-for-mobile {
    display: none !important;
  }
  .show-item-for-mobile {
    display: unset !important;
  }
}
@media (min-width: 991px) {
  .vs__dropdown-menu {
    width: 900px !important;
    border-radius: 35px !important;
    margin-top: 60px !important;
  }
  .vs__dropdown-option {
    color: black !important;
  }
  .vs__dropdown-option--highlight {
    color: black !important;
    background: none !important;
    font-size: bold !important;
  }
  vs__dropdown-option
    vs__dropdown-option--selected
    vs__dropdown-option--highlight {
    background: #4b4b4b26 !important;
  }
  .vs--searchable .vs__dropdown-toggle {
    border: none !important;
    margin-left: 21px !important;
  }
  .vs__open-indicator {
    display: none;
  }
  .multiselect__single {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 175px !important;
  }
  .custom-search-input-2 input[type="submit"] {
    padding: 10px 14px !important;
    margin-right: 5px !important;
    background-color: #ef4036 !important;
  }
  .row.no-gutters.custom-search-input-2.radius-style {
    width: 900px;
    height: 60px;
    display: inline-flex;
  }
  .radius-style {
    border-radius: 50px !important;
  }
  .multiselect__tags {
    background: transparent !important;
  }
  .multiselect__select:before {
    top: 56% !important;
  }
  .multiselect__placeholder {
    padding-left: 12px !important;
  }
  .panel-dropdown,
  .datepicker-input {
    padding: 20px 10px 0 15px !important;
  }
  .custom-search-input-2 i {
    top: 4px !important;
  }
  .search-button-container {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
  }
  .form-group:focus {
    background-color: red !important;
  }
  .asd__wrapper {
    top: 80px !important;
  }
  .multiselect__content-wrapper {
    border: none !important;
    padding-top: 14px !important;
  }
  .multiselect__content-wrapper {
    width: 95% !important;
    right: 0 !important;
  }
  .test_asd {
    max-height: 500px !important;
  }
}
@media (max-width: 650px) {
  .row.no-gutters.custom-search-input-2.radius-style {
    width: 600px !important;
    height: 50px;
    display: inline-flex;
  }
  .custom-search-input-2 input[type="submit"] {
    margin-left: 35px !important;
  }
  .vs--searchable .vs__dropdown-toggle {
    margin: -4px 0px 0px 10px !important;
  }

  .vs__dropdown-menu {
    margin-top: 60px !important;
  }
  .custom-search-input-2 input {
    font-size: 13px !important;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .panel-dropdown .panel-dropdown-content {
    width: 100%;
  }
}
</style>
