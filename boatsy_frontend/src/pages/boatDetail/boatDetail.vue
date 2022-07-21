<template>
  <div class="loading-payment-page" v-if="boatDetailLoading">
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div class="container boat-detail-page" v-else>
     <!-- Mobile Share Like Button -->
      <div class="mobile-header">
         <a
          v-on:click="shareBoatFunc"
          style="display: flex; align-items: center"
        >
          <div class="fas fa-share-alt fa-lg"></div>
          <div class="header-detail" style="padding-left: 0.8em">
            <span class="card-detail-share">{{$t('boat_details_header_share')}}</span>
          </div>
        </a>
        <a
          v-on:click="likeBoatFunc"
          style="display: flex; align-items: center"
          ><i
            :class="{
              'far fa-heart fa-lg': !this.likedBoat,
              'fas fa-heart fa-lg': this.likedBoat,
            }"
            style="color: red"
          ></i>
          <div class="header-detail" style="padding-left: 0.8em">
            <span class="card-detail-save"> {{$t('boat_details_header_like')}}</span>
          </div></a
        >
      </div>
    <div class="boat-detail-header-content">
      <!-- Header -->
      <div class="detail-page-header">
        <BoatDetailHeader
          :boatDetail="boatData"
          :rosette="captainData.rosette"
        ></BoatDetailHeader>
      </div>
     
      <!-- Image Gallery -->
      <div class="detail-page-picture">
        <BoatPicture :boatDetail="boatData"></BoatPicture>
      </div>
    </div>

    <div class="detail-page-sticky">
      <div class="detail-page-left">
        <!-- Description -->
        <div
          class="boat-description"
          v-if="boatData.description != null && boatData.description != ''"
        >
          <span>{{
            this.$i18n.locale != "tr" ? translateDesc : boatData.description
          }}</span>
        </div>

        <!-- Features -->
        <div class="boat-features">
          <BoatFeatures :boatDetail="boatData"></BoatFeatures>
        </div>

        <!-- Facility -->
        <div class="detail-page-facility">
          <BoatFacility></BoatFacility>
        </div>

        <!-- Support -->
        <div class="boatData">
          <BoatSupport
            :boatData="boatData"
            :loading="messageSupportLoadingCallBack"
          ></BoatSupport>
        </div>
        <hr solid />

        <!-- Sleeping Plan -->
        <div class="sleeping-plan">
          <BoatSleepingPlan :boatDetail="boatData"></BoatSleepingPlan>
        </div>

        <!-- Captain Profile Card -->
        <div class="captain-profile-section">
          <CaptainProfileCard :captainDetail="captainData"></CaptainProfileCard>
        </div>

        <!-- Datepicker -->
        <div class="boat-detail-calender" id="datepicker">
          <div class="col-12 calender" style="padding: 0 0 15px 0">
            <h4 class="card-des-calender" style="text-align: start">
              {{ $t("boat_detail_card-des-calender") }}
            </h4>
          </div>
          <BoatDatepicker></BoatDatepicker>
        </div>
      </div>

      <!-- Booking Card -->
      <div class="detail-page-right">
        <BoatReservationCard :boatDetail="boatData"></BoatReservationCard>
      </div>
    </div>

    <!-- Map -->
    <div
      class="boat-location-map"
      v-if="boatData.lat != null && boatData.lng != null"
    >
      <div class="map-container-header">
        <h4>{{ $t("boat_detail_map-container-header") }}</h4>
      </div>
      <div class="map-container">
        <l-map
          style="height: 480px"
          :zoom="zoom"
          :center="getLatLng(boatData.lat, boatData.lng)"
        >
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="getLatLng(boatData.lat, boatData.lng)"></l-marker>
        </l-map>
      </div>
      <div
        class="map-container-title"
        style="text-align: start; padding-top: 24px"
      >
        <span class="boat-adress-header"
          >{{ boatData.city }}, {{ boatData.state }}, {{ boatData.ccountry }}
        </span>
        <p>{{ boatData.address }}</p>
      </div>
    </div>

    <!-- Boat Comments -->
    <div class="boat-card-comment">
      <BoatComment></BoatComment>
    </div>

    <!-- Conditions -->
    <div class="detail-page-conditions" style="padding-bottom: 48px">
      <BoatConditions></BoatConditions>
    </div>

    <!-- Similar Boats -->
    <div class="similar-boats-section">
      <h4 style="text-align: start">{{ $t("boat_detail") }}</h4>
      <SimilarBoatsSlider
        :boatType="boatData.boattypename"
        :boatId="boatData.id"
      ></SimilarBoatsSlider>
    </div>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { latLng } from "leaflet";
import { mapGetters } from "vuex";
import {
  FETCH_BOAT_DETAIL,
  FETCH_CURRENCY,
  FETCH_BOAT_DETAIL_CMS,
  SET_LIKE_BOAT
} from "../../store/actions.type.js";
import BoatDetailHeader from "./components/BoatDetailHeader.vue";
import BoatPicture from "./components/BoatPicture.vue";
import BoatFeatures from "./components/BoatFeatures.vue";
import BoatFacility from "./components/BoatFacility.vue";
import BoatSleepingPlan from "./components/BoatSleepingPlan.vue";
import CaptainProfileCard from "./components/CaptainProfileCard.vue";
import BoatReservationCard from "./components/BoatReservation.vue";
import BoatComment from "./components/BoatComment.vue";
import BoatConditions from "./components/BoatConditions.vue";
import SimilarBoatsSlider from "./components/SimilarBoatsSlider.vue";
import BoatSupport from "./components/BoatSupport.vue";
import format from "date-fns/format";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    BoatDetailHeader,
    BoatPicture,
    BoatFeatures,
    BoatFacility,
    BoatSleepingPlan,
    CaptainProfileCard,
    BoatReservationCard,
    BoatComment,
    BoatConditions,
    SimilarBoatsSlider,
    BoatSupport,
  },
  props: ["isAdmin"],
  metaInfo() {
    return {
      title: `${
        this.boatData.city +
        " " +
        this.$i18n.t(this.boatData.boattypename) +
        " " +
        this.$i18n.t("rent") +
        " " +
        this.boatData.boatheight +
        " m"
      } - Boatsy`,
      meta: [
        { name: "description", content: "Boatsy - Türkiye'nin tekne kiralama platformu" },
        { property: "og:title", content: "Boatsy - Türkiye'nin tekne kiralama platformu" },
        { property: "og:site_name", content: "Boatsy" },
        { property: "og:type", content: "website" },
        { name: "robots", content: "boat,charter" },
      ],
    };
  },
  data() {
    return {
      messageSupportLoading: false,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      loading: false,
      dateFormat: "YYYY-MM-DD",
      translateDesc: "",
      likedBoat: false,
    };
  },
  async created() {
    var boatId = this.$router.history.current.params["boatId"];
    var startDate = this.$router.history.current.params["startDate"];
    var endDate = this.$router.history.current.params["endDate"];
    if (startDate != undefined) {
      this.$store.commit("setStartDate", format(startDate, this.dateFormat));
    }
    if (endDate != undefined) {
      this.$store.commit("setEndDate", format(endDate, this.dateFormat));
    }
    this.$store.commit("setBoatDetailId", boatId);
    if (this.isAdmin) {
      await this.$store.dispatch(FETCH_BOAT_DETAIL_CMS);
    } else {
      await this.$store.dispatch(FETCH_BOAT_DETAIL, boatId);
    }
    this.likedBoat = this.boatData.boatlike;
    //Çeviri apisinde 250 karakter sınırı var bu yüzden tekne açıklaması 250 karakterlere bölünerek istek atılıyor.
    var translateData = "";
    if (this.boatData.description.length > 250) {
      for (var i = 0; i <= this.boatData.description.length; i += 250) {
        const res = await fetch("https://libretranslate.de/translate", {
          method: "POST",
          body: JSON.stringify({
            q: this.boatData.description.slice(i, i + 250),
            source: "tr",
            target: "en",
            format: "text",
          }),
          headers: { "Content-Type": "application/json" },
        });
        var response = await res.json();
        translateData += response.translatedText;
      }
    }
    this.translateDesc = translateData;

    setTimeout(this.showModal, 60000);
  },
  computed: {
    ...mapGetters({
      boatData: "getBoatDetail",
      captainData: "getCaptainDetail",
      boatDetailLoading: "getBoatDetailLoading",
      boatRulesLoading: "getBoatRulesLoading",
      getCurrency: "getCurrency",
      getProfileModel: "getProfileModel",
    }),
  },
  methods: {
    showModal() {
      if (this.$route.name == "WithDateBoatDetail")
        this.$modal.show("non-auth-send-booking-modal");
    },
    messageSupportLoadingCallBack(value) {
      this.loading = value;
    },
    getLatLng(Lat, Lng) {
      return [Lat, Lng];
    },
    async likeBoatFunc() {
      var id = this.boatData.id;
      if (this.getProfileModel.id > 0) {
        this.likedBoat = !this.likedBoat;
        this.$store.commit("setSelectedBoatId", id);
        var res = await this.$store.dispatch(SET_LIKE_BOAT);
        if (res.error == true) {
          this.likedBoat = !this.likedBoat;
        }
      } else {
        this.$modal.show("signIn-modal");
      }
    },
    shareBoatFunc() {
      var url =
        "https://boatsy.net/boats/" +
        this.boatData.boattypename +
        "-" +
        this.boatData.state +
        "-" +
        this.boatData.city +
        "-" +
        this.boatData.id;
      navigator.clipboard.writeText(url);
      this.$toast.success("Bağlantı kopyalandı", {
        icon: "far fa-check-circle",
        timeout: 1500,
      });
    },
  },
};
</script>
<style>
.boatDetail {
  font-size: 16px;
}
.boat-detail-page h4 {
  font-size: 1.4rem;
}
.boat-detail-page .detail-page-sticky {
  display: flex;
  justify-content: space-between;
}
.loading-detail-container {
  height: 15px;
  margin-top: 15px;
  width: 100px;
  background-color: #ddd;
  border-radius: 5px;
  animation-name: loadingEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.loading-detail-header {
  width: 125px;
  height: 20px;
  background-color: #ddd;
  border-radius: 5px;
  animation-name: loadingEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.image-loading {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: #ddd;
  animation-name: loadingEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.captain-profile-section {
  padding: 32px 0;
  border-bottom: 1px solid #ddd;
}
.boat-adress-header {
  font-size: 17px;
  font-weight: 700;
}
.map-container-header {
  text-align: start;
  padding-bottom: 24px;
}
.boat-detail-page {
  margin-top: 80px;
  font-size: 16px;
}

.boat-location-map {
  padding: 15px 0;
}

.boat-description {
  padding: 48px 0;
  border-bottom: 1px solid #ddd;
}
.boat-features,
.support,
.sleeping-plan,
.detail-page-facility {
  padding: 16px 0 48px 0;
  border-bottom: 1px solid #ddd;
}
.boat-card-detail {
  padding: 48px 0;
}
.boat-detail-calender,
.boat-location-map,
.boat-card-comment {
  padding: 48px 0;
  border-bottom: 1px solid #ddd;
}
.detail-page-right {
  z-index: 100;
  margin-top: 48px;
}

.leaflet-pane,
.leaflet-top,
.leaflet-bottom {
  z-index: 99;
}
.image-gallery {
  width: 100%;
}
.row.detail-page-picture {
  padding: 0 15px;
}
.similar-boats-section {
  padding-bottom: 48px;
}
.lb-item:last-child {
  border-bottom: none !important;
}
.lb-item:nth-child(4),
.lb-item:nth-child(2),
.lb-item:nth-child(3) {
  border-left: 8px solid #fff;
  border-bottom: 8px solid #fff;
}
.mobile-header {
  display: none;
}
@media (max-width: 992px) {
  .sleeping-plan-body {
    gap: 1em !important;
  }
  .sleeping-plan-content {
    width: 100% !important;
  }
}
@media (min-width: 800px) {
  .detail-page-left {
    max-width: 60%;
  }
}
@media (max-width: 570px) {
  .container.boat-detail-page {
    margin: 0;
  }
  .mobile-header {
    display: flex; 
    width: 100%; 
    align-items: center; 
    justify-content: end; 
    gap: 13px; 
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .boat-detail-header-content {
    display: grid;
    margin-top: 10px;
  }
  .boat-detail-page .vm--modal {
    top: 0 !important;
    height: 100% !important;
  }
  .buttons {
    position: absolute;
    visibility: hidden;
  }
  /* Galeri */
  .detail-page-picture {
    order: -1;
    width: calc(100% + 30px) !important;
    margin: -5px 0 10px -15px !important;
  }
  .lb-item:nth-child(3),
  .lb-item:nth-child(4),
  .lb-item:nth-child(2) {
    display: none !important;
  }
  .lb-item {
    width: 100% !important;
    border-radius: 0 !important;
    border: none !important;
  }
  .lb-grid {
    min-height: 270px !important;
  }
  .lb-modal-img {
    left: 0 !important;
    width: 100% !important;
  }
  .fa-2x {
    font-size: 1em;
  }
  /* Harita */
  .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
    height: 350px !important;
  }
  /* İkonlar */
  .sleeping-plan-icon,
  .feature-icon,
  .boat-features-icon {
    width: 32px !important;
  }
  /* Tekne Özellikler Modal */
  .boat-feature-container-modal {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}
@media (max-width: 480px) {
  .boat-detail-page {
    font-size: 14px;
  }
}
</style>
