<template>
  <div class="row-height">
    <div
      class="container"
      style="
        border: 1px solid lightgray;
        height: 40px;
        border-radius: 50px;
        width: 90%;
        padding-top: 4px;
      "
    >
      <v-select
        class="asd21sad"
        :style="'margin-left:-20px !important;margin-top:-10px !important'"
        v-model="boatLocation"
        :options="getLocationList"
        @input="Search(boatLocation)"
        :dropdown-should-open="dropdownShouldOpen"
        :filterBy="filterBy"
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
    <!-- Header -->
    <div style="z-index: 2">
      <MapFilterHeader
        :changeFunc="chengeFilterControllerForMapCenterValue"
        :boundsData="bounds"
        :mapController="mapClickController"
      ></MapFilterHeader>
    </div>

    <!-- Boats -->
    <div class="row" style="margin: 0">
      <div
        class="col-12 col-lg-7 boat-card-horizontal"
        style="min-height: 60vh"
      >
        <div v-if="!mapFilterLoading" class="container">
          <div
            id="getOnScrollItem"
            v-on:scroll="getOnScrollItem()"
            v-if="filterBoats.length > 0"
            class="map-boat-container custom-scroll"
          >
            <h2
              v-if="mapBoatSmilarBoatController && filterControllerForMapCenter"
              class="map-page-not-found"
              style="
                font-size: 1.75rem;
                text-align: start;
                padding-bottom: 10px;
              "
            >
              {{ $t("boat_map_page_map-not-found") }}<br />
            </h2>
            <h1
              v-if="mapBoatSmilarBoatController && filterControllerForMapCenter"
              style="font-size: 1.25rem; text-align: start"
            >
              {{ $t("boat_map_page_smilar_boat_body") }}
            </h1>
            <div
              v-for="(item, index) in filterBoats"
              :key="index"
              @mouseover="hoverIn(item.id)"
              @mouseout="hoverOut(item.id)"
              :ref="'card_' + item.id"
              :id="'card_' + item.id"
              :color="item.color"
              class="container"
              style="padding: 20px 0; border-top: 1px solid #ddd"
            >
              <boat-cards-horizontal :boatData="item"> </boat-cards-horizontal>
            </div>
            <img
              v-if="scrollStatus"
              src="/assets/images/loading.gif"
              style="width: 50px; align-self: center"
            />
          </div>
          <div v-else>
            <h2
              class="map-page-not-found"
              style="
                font-size: 1.75rem;
                margin-top: 40px;
                margin-right: 120px;
                text-align: start;
              "
            >
              {{ $t("boat_map_page_map-not-found") }}<br />
              <br />
            </h2>
            <h1 style="font-size: 1.25rem; text-align: start">
              {{ $t("boat_map_page_another_boat") }}
            </h1>
          </div>
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

      <!-- Map -->
      <div class="col-6 col-lg-5 map-right" style="padding: 0px">
        <div
          style="height: 100%; width: 100%; padding-top: 20px"
          v-if="mapCreatController"
          @click="innerClick"
        >
          <l-map
            :max-zoom="zoom"
            :bounds="bounds"
            @update:bounds="boundsUpdated"
          >
            <l-tile-layer :url="url" :attribution="attribution" />
            <div v-for="(item, index) in filterBoats" :key="index">
              <l-marker
                @click="focusBoatCard(item)"
                v-if="item.lat != null && item.lng != null"
                :lat-lng="withPopup(item.lat, item.lng)"
              >
                <l-icon :icon-anchor="staticAnchor" class-name="someExtraClass">
                  <div
                    :id="'marker_' + item.id"
                    class="headline"
                    v-bind:style="{ backgroundColor: bgColor }"
                  >
                    <i class="fas fa-ship"></i>
                    <!-- {{ item.isdaily == true ? "/Gün" : "/Saat" }} -->
                  </div>
                </l-icon>
                <l-popup>
                  <div class="boatMapCard">
                    <!-- Boat Card For Map -->
                    <MapBoatCard :boatData="item"></MapBoatCard>
                  </div>
                </l-popup>
              </l-marker>
            </div>
          </l-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { latLng, Icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import { FETCH_FILTER_BOATS } from "../../store/actions.type.js";
import format from "date-fns/format";
import axios from "axios";
import MapBoatCard from "./components/MapBoatCard.vue";
import MapFilterHeader from "./components/MapFilterHeader.vue";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
export default {
  name: "boat-card-map-page",

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
    MapBoatCard,
    MapFilterHeader,
  },

  props: ["boatData"],

  data() {
    return {
      metaTagLocation: "",
      boatLocation: null,
      totalitemCount: 0,
      withPopup: latLng,
      zoom: 19,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "Boatsy",
      icon: "",
      scrollStatus: false,
      staticAnchor: [16, 37],
      customText: "",
      iconSize: 64,
      bgColor: "white",
      upHere: false,
      mapClickController: false,
      range: "",
      value: [0, 100],
      page: 1,
      filterControllerForMapCenter: true,
      centerController: false,
      bounds: [],
      smilarBoatList: [],
      mapReqController: false,
      mapReqControllerForScroll: false,
      mapCreatController: false,
      oldBounds: null,
      startDate:
        this.$router.history.current.params["startDate"] ??
        format(new Date(), "YYYY-MM-DD"),
      endDate:
        this.$router.history.current.params["endDate"] ??
        format(new Date(), "YYYY-MM-DD"),
      personCapacity:
        this.$router.history.current.params["personCapacity"] ?? 1,
      selectedCurrency: this.$store.getters.getSelectedCurrency,
      infoBoxController: false,
    };
  },
  computed: {
    ...mapGetters({
      filterBoats: "getFilterBoats",
      mapFilterLoading: "getMapFilterLoading",
      getLocationList: "getLocationList",
      getBoatLocationSearchModel: "getBoatLocationSearchModel",
      mapBoatSmilarBoatController: "getMapBoatSmilarBoatController",
    }),
  },
  watch: {
    filterBoats: async function () {
      if (
        this.filterBoats.length < 1 &&
        !this.mapBoatSmilarBoatController &&
        !this.mapFilterLoading
      ) {
        this.mapReqController = false;
        this.centerController = false;
        this.$store.commit("setMapBoatSmilarBoatController", true);
        this.$store.commit("setBoatCountry", undefined);
        this.$store.commit("setBoatState", undefined);
        this.$store.commit("setBoatCity", undefined);
        this.$store.commit("setCheckedRules", []);
        this.$store.commit("setPersonCapacity", 1);
        this.$store.commit("setMinPrice", 1);
        this.$store.commit("setMaxPrice", 150000);
        this.$store.commit("setLanguages", []);
        this.$store.commit("setIsSuperCaptain", "");
        this.$store.commit("setIsCaptain", null);
        this.$store.commit("setReservationFlexibility", "");
        this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
        var result = await this.$store.dispatch(FETCH_FILTER_BOATS, undefined);
        this.filterControllerForMapCenter = true;
        this.getCenter();
        this.smilarBoatList = result.data;
      }
    },
    bounds: {
      handler: async function (val, oldVal) {
        //sayfa ilk açıldığında bounds =[] olduğundan ilk açılışta fonksiyonu çalışmamsı için kontrol
        if (
          this.mapClickController &&
          (val._northEast.lat != oldVal._northEast.lat ||
            val._northEast.lng != oldVal._northEast.lng)
        ) {
          this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
          var data = await this.$store.dispatch(FETCH_FILTER_BOATS, val);
          this.mapReqController = false;
          this.centerController = false;
        }
      },
    },
  },
  methods: {
    focusBoatCard(data) {
      document.getElementById("card_" + data.id).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      document.getElementById("card_" + data.id).focus();
    },
    innerClick() {
      this.mapClickController = true;
      this.filterControllerForMapCenter = false;
      this.centerController = false;
      this.mapReqController = true;
      this.mapReqControllerForScroll = true;
    },
    chengeFilterControllerForMapCenterValue(value) {
      if (value && !this.mapBoatSmilarBoatController) {
        this.filterControllerForMapCenter = true;
        this.getCenter();
      }
    },
    boundsUpdated(bounds) {
      //
      if (this.oldBounds == null) {
        this.centerController = true;
        this.bounds = bounds;
        this.oldBounds = {
          lat: bounds._northEast.lat,
          lng: bounds._northEast.lng,
        };
      } else if (
        !this.centerController &&
        (bounds._northEast.lat != this.oldBounds.lat ||
          bounds._northEast.lng != this.oldBounds.lng)
      ) {
        this.mapReqController = true;
        this.centerController = true;
        this.bounds = bounds;
        this.oldBounds = {
          lat: bounds._northEast.lat,
          lng: bounds._northEast.lng,
        };
      }
    },
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
        .toLocaleLowerCase()
        .replace("ö", "o")
        .replace("ş", "s")
        .replace("ü", "u")
        .replace("ç", "c")
        .replace("ğ", "g")
        .replace("ı", "i");
    },
    async Search(boatLocation) {
      var country, state, city;
      this.bounds = [];
      this.infoBoxController = false;
      this.$store.commit("setShowInformationBoxForBoatMapPage", false);
      this.$store.commit("setBoatCountry", undefined);
      this.$store.commit("setBoatState", undefined);
      this.$store.commit("setBoatCity", undefined);
      this.$store.commit("setMapBoatSmilarBoatController", false);
      this.mapClickController = false;
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
        window.fbq("track", "FindLocation", {
          country: country,
          state: state,
          city: city,
        });
        if (city == "" || city == undefined) {
          this.$store.commit("setBoatState", state);
          this.$router.push({
            name: "MapBoatsOnlyState",
            params: {
              boatState: state,
            },
          });
        } else {
          this.$store.commit("setBoatState", state);
          this.$store.commit("setBoatCity", city);
          this.$router.push({
            name: "MapBoatsLocation",
            params: {
              boatState: state,
              boatCity: city,
            },
          });
        }
      } else {
        this.$store.commit("setBoatCountry", boatLocation);
        this.$router.push({
          name: "MapBoatsOnlyCountry",
          params: {
            boatCountry: boatLocation,
          },
        });
      }

      this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
      this.oldBounds = null;
      this.mapReqControllerForScroll = false;
      await this.$store.dispatch(FETCH_FILTER_BOATS);
      this.getCenter();
      this.boatLocation = null;
    },
    dropdownShouldOpen(VueSelect) {
      if (this.boatLocation != null) {
        return VueSelect.open;
      }

      return VueSelect.search.length > 2 && VueSelect.open;
    },
    async getOnScrollItem() {
      var scrollingElement = document.getElementById("getOnScrollItem");
      var itemCount = 0;
      var scrollResult =
        scrollingElement.scrollTop + scrollingElement.clientHeight - 400;

      if (
        scrollResult >= scrollingElement.scrollHeight - 600 &&
        this.totalitemCount != this.filterBoats.length &&
        this.scrollStatus == false
      ) {
        this.scrollStatus = true;
        this.$store.commit("setMapsBoatsPaginableRequestModelLimit");
        if (this.mapReqControllerForScroll == true) {
          itemCount = await this.$store.dispatch(
            FETCH_FILTER_BOATS,
            this.bounds
          );
        } else {
          itemCount = await this.$store.dispatch(FETCH_FILTER_BOATS);
        }
        this.totalitemCount = itemCount.count;
        this.scrollStatus = false;
      }
      if (
        this.totalitemCount == this.filterBoats.length &&
        scrollResult >= scrollingElement.scrollHeight - 700 &&
        !this.infoBoxController
      ) {
        this.infoBoxController = true;
        this.$store.commit("setShowInformationBoxForBoatMapPage", true);
      }
    },
    hoverIn: function (e) {
      document.getElementById("marker_" + e).style.background = "black";
      document.getElementById("marker_" + e).style.color = "white";
    },
    hoverOut: function (e) {
      document.getElementById("marker_" + e).style.background = "#E3E3E3";
      document.getElementById("marker_" + e).style.color = "black";
    },
    getCoord(a, b) {
      return latLng(a, b);
    },
    getCenter() {
      let points = [];
      this.centerController = false;
      this.mapCreatController = true;
      if (!this.mapFilterLoading) {
        this.filterBoats.forEach((boat) => {
          if (boat.lat != null && boat.lng != null) {
            let latLng = [boat.lat, boat.lng];
            points.push(latLng);
          }
        });
        if (this.filterBoats.length < 3) {
          this.zoom = 13;
        }
        var bounds = new L.LatLngBounds(points);
        this.bounds = bounds;
      }
    },
    onCustomClick(item) {
      const { latLng } = item;
    },
    convertCurrency(price, currencyValue) {
      var boatPrice = price * currencyValue;
      var currencyList = this.$store.state.boat.currency;
      if (currencyList.length > 0) {
        return (
          Math.round(
            boatPrice / currencyList[this.selectedCurrency - 1].value
          ) +
          " " +
          currencyList[this.selectedCurrency - 1].symbol
        );
      } else {
        return boatPrice + " ₺";
      }
    },
  },

  async created() {
    this.infoBoxController = false;
    this.$store.commit("setShowInformationBoxForBoatMapPage", false);
    this.$store.commit("setFilterBoatModel", {});
    this.min = 1000;
    this.max = 5000;

    this.formatter = (value) => `₺${value}`;
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
    if (this.$router.history.current.params["boatType"] != "Tümü") {
      this.$store.commit(
        "setBoatType",
        this.$router.history.current.params["boatType"]
      );
    } else {
      this.$store.commit("setBoatType", "Tüm Tekneler");
    }
    this.$store.commit("setPersonCapacity", this.personCapacity);
    this.$store.commit("setStartDate", this.startDate);
    this.$store.commit("setEndDate", this.endDate);
    this.$store.commit("setMapsBoatsPaginableRequestModelLimit", 1);
    this.$store.state.boat.filterBoatModel.orderBy = "commentAvarage";
    this.$store.state.boat.filterBoatModel.ascending = 0;
    var reqData = await this.$store.dispatch(FETCH_FILTER_BOATS);
    this.centerController = true;
    this.getCenter();
  },
};
</script>

<style>
.leaflet-pane {
  z-index: 99 !important;
}
div#getOnScrollItem::-webkit-scrollbar {
  width: 10px;
}
.vue2leaflet-map {
  position: relative !important;
}
.map-filter-null {
  justify-content: flex-start;
  margin-right: 230px;
  font-weight: bold;
  font-size: 22px;
}
.row-height {
  padding-top: 70px;
}
.map-boat-container {
  display: flex;
  flex-direction: column;
  padding: 30px 15px 30px 15px;
  margin: 0;
  min-width: 64px;
  padding: 20px;
  padding-bottom: 75px;
  overflow: auto;
  height: 100%;
  height: calc(100vh - 70px);
}
._3eo8a6r {
  position: absolute !important;
  display: inline-block !important;
  top: 135px !important;
  margin-left: 370px;
  width: 250px;
  z-index: 2001 !important;
  background: rgb(255, 255, 255) !important;
  border: 0.5px solid rgba(118, 118, 118, 0.28) !important;
  border-radius: 12px !important;
  box-shadow: rgb(0 0 0 / 15%) 0px 10px 37px !important;
  overflow: hidden auto !important;
  white-space: normal !important;
  visibility: visible !important;
  left: 0px !important;
  right: auto !important;
}
.slider {
  /* overwrite slider styles */
  width: 130px;
}
.price-map-hover {
  transition: all;
}
.boat-card-map-title {
  font-weight: bold;
  font-size: 2em;
  padding-left: 30px;
  text-align: start;
}
.boat-card-map-detail {
  text-align: start;
  font-size: 15px;
  margin-top: 25px;
  margin-left: 40px;
}
.headline {
  margin-top: 2.5px;
  border-radius: 2rem;
  text-align: center;
  padding: 5px;
  height: 34px;
  font-weight: 750;
  font-size: 16px;
  color: black;
}
.someExtraClass {
  background-color: rgb(251, 253, 253);
  border-radius: 20px 20px 20px 20px;
  text-align: center;
  width: 40px !important;
  height: 35px !important;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5) inset, 0px -2px 20px white,
    0px 1px 5px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.boat-card-map-price {
  color: rgb(61, 59, 59);
  letter-spacing: 1px;
  background: transparent;
  border-radius: 20px;
  padding: 10px 20px;
  display: block;
  font-family: arial;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid #a7a7a7;
  width: 175px;
  margin: 0px auto;
  margin-top: 25px;
  font-size: small;
  text-align: center;
  margin-left: 35px;
  box-shadow: 0px 2px 1px white inset, 0px -2px 8px white,
    0px 2px 5px rgb(0 0 0 / 10%), 0px 8px 10px rgb(0 0 0 / 10%);
}
.boat-card-map-price:active {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5) inset, 0px -2px 20px white,
    0px 1px 5px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1);
  background: -webkit-linear-gradient(top, #d1d1d1 0%, #ececec 100%);
}
.boat-card-map-reservation {
  color: rgb(61, 59, 59);
  background: transparent;
  border-radius: 20px;
  padding: 10px 20px;
  display: block;
  font-family: arial;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid #a7a7a7;
  width: 175px;
  margin: 0px auto;
  margin-top: -41px;
  font-size: small;
  text-align: center;

  margin-left: 215px;
  box-shadow: 0px 2px 1px white inset, 0px -2px 8px white,
    0px 2px 5px rgb(0 0 0 / 10%), 0px 8px 10px rgb(0 0 0 / 10%);
}
.boat-card-map-reservation:active {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5) inset, 0px -2px 20px white,
    0px 1px 5px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1);
  background: -webkit-linear-gradient(top, #d1d1d1 0%, #ececec 100%);
}
.boat-card-map-place {
  color: rgb(61, 59, 59);
  letter-spacing: 1px;
  background: transparent;
  border-radius: 20px;
  padding: 10px 20px;
  display: block;
  font-family: arial;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid #a7a7a7;
  width: 175px;
  margin: 0px auto;
  margin-top: -43px;
  font-size: small;
  text-align: center;

  margin-left: 395px;
  box-shadow: 0px 2px 1px white inset, 0px -2px 8px white,
    0px 2px 5px rgb(0 0 0 / 10%), 0px 8px 10px rgb(0 0 0 / 10%);
}
.boat-card-map-place:active {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5) inset, 0px -2px 20px white,
    0px 1px 5px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1);
  background: -webkit-linear-gradient(top, #d1d1d1 0%, #ececec 100%);
}
.boat-card-map-filter {
  color: rgb(61, 59, 59);
  letter-spacing: 1px;
  background: transparent;
  border-radius: 20px;
  padding: 10px 20px;
  display: block;
  font-family: arial;
  font-weight: bold;
  text-decoration: gray;
  border: 1px solid #a7a7a7;
  width: 175px;
  margin: 0px auto;
  margin-top: -43px;
  font-size: small;
  text-align: center;

  margin-left: 575px;
  box-shadow: 0px 2px 1px white inset, 0px -2px 8px white,
    0px 2px 5px rgb(0 0 0 / 10%), 0px 8px 10px rgb(0 0 0 / 10%);
}
.boat-card-map-filter:active {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5) inset, 0px -2px 20px white,
    0px 1px 5px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1);
  background: -webkit-linear-gradient(top, #d1d1d1 0%, #ececec 100%);
}
.ul.filter-wrapper {
  font-size: 15px;
  font-weight: bold;
}
.price-filter {
  font-size: 15px;
  font-weight: bold;
}
.vue2leaflet-map {
  position: fixed;
}
.leaflet-top,
.leaflet-bottom {
  z-index: 99 !important;
}

.custom-scroll::-webkit-scrollbar {
  width: 12px;
}

.custom-scroll::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
.asd21sad .vs__dropdown-menu {
  width: 102% !important;
  border-radius: 35px !important;
  margin-top: 10px !important;
}
@media (max-width: 591px) {
  .asd21sad .vs__selected-options {
    margin-top: -4px !important;
    margin-left: 15px !important;
  }
  .asd21sad .vs__dropdown-toggle {
    width: 300px !important ;
    padding-top: 13px !important;
  }
}
</style>
