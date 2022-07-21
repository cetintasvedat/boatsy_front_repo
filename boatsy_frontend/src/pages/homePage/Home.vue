<template>
  <body class="home">
    <!-- Main Section -->
    <div class="main-content">
      <div class="hero_single version_3">
        <div class="wrapper">
          <div
            class="container searchbar-container"
            style="
              padding-right: 10px;
              padding-left: 10px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              padding-bottom: 400px;
            "
          >
            <div
              class="homepage-title"
              style="display: flex; justify-content: start; margin: auto"
            >
              <h1
                style="
                  color: #fff;
                  text-align: start;
                  font-weight: 700;
                  text-shadow: 4px 4px 23px rgb(150 150 150);
                  margin-top: 225px;
                  letter-spacing: 0.05em;
                  font-size: 30px;
                "
                class="homepage-sub-title"
              >
                {{ $t("home_page_hour_day") }}

                {{ $t("home_page_and") }}

                {{ $t("home_page_weekly_boat_rent") }}
              </h1>
            </div>
            <SearchBar style="z-index: 2"></SearchBar>
          </div>
        </div>
        <div
          class="container container-custom margin_80_0_0 app-download"
          style="justify-content: space-between; display: flex; bottom: -35px"
        >
          <div
            class="app-links"
            style="
              display: flex;
              gap: 1.5em;
              justify-content: flex-start;
              align-items: center;
              flex-wrap: wrap;
            "
          >
            <div class="social-icons" style="">
              <a
                href="https://play.google.com/store/apps/details?id=com.atilabs.boatsy.boatsy&hl=tr&gl=US"
                target="_blank"
                style="
                  background: transparent;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 10px;
                  border: 1px solid #fff;
                  width: 180px;
                  padding-right: 18px;
                "
                ><img
                  class="app-download-image"
                  src="/img/play-store-icon.svg"
                  style="width: 42px; height: 42px"
                />
                <span style="color: #fff; font-weight: 700">GOOGLE PLAY</span>
              </a>
            </div>
            <div class="social-icons" style="">
              <a
                href="https://apps.apple.com/us/app/boatsy/id1606890492"
                target="_blank"
                style="
                  background: transparent;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 10px;
                  border: 1px solid #fff;
                  width: 180px;
                  padding-right: 18px;
                "
              >
                <img
                  class="app-download-image"
                  src="/img/app-store-icon.svg"
                  style="width: 42px; height: 42px"
                />
                <span style="color: #fff; font-weight: 700">APP STORE</span></a
              >
            </div>
            <div class="social-icons app-gallery-box" style="">
              <a
                href="https://appgallery.huawei.com/app/C105477273"
                target="_blank"
                style="
                  background: transparent;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 10px;
                  border: 1px solid #fff;
                  width: 180px;
                  padding-right: 18px;
                "
              >
                <img
                  class="app-download-image"
                  src="/img/app-gallery-icon.svg"
                  style="width: 42px; height: 42px"
                />
                <span style="color: #fff; font-weight: 700"
                  >APP GALLERY</span
                ></a
              >
            </div>
          </div>
          <div
            class="partners-section"
            style="
              display: flex;
              gap: 1.5em;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
            "
          >
            <div class="social-icons" style="">
              <a
                style="
                  background: transparent;
                  padding-right: 0px;
                  border: 1px solid rgb(255, 255, 255);
                  border-radius: 9px;
                  padding-right: 25px;
                  padding-left: 25px;
                  height: 40px;
                "
                ><img
                  class="app-download-image trustpilot-image"
                  src="/img/trustpilot.svg"
                  style="
                    object-fit: cover;
                    border-radius: 10px;
                    padding-right: 8px;
                  "
              /></a>
            </div>
            <div class="social-icons" style="">
              <a
                style="
                  background: transparent;
                  padding-right: 0px;
                  border: 1px solid rgb(255, 255, 255);
                  border-radius: 9px;
                  padding-right: 25px;
                  padding-left: 25px;
                  height: 40px;
                "
              >
                <img
                  class="app-download-image tripadvisor-image"
                  src="/img/tripadvisor.svg"
                  style="
                    border-radius: 10px;
                    padding: 0 10px;
                    object-fit: cover;
                  "
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Information Card -->
    <div
      class="
        container container-custom
        margin_80_0_0
        popular-location-cards
        header-cards-for-mobile
      "
      style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding-top: 60px;
        justify-items: center;
        gap: 1.5em;
      "
      id="boatsy-info-card"
    >
      <div
        class="popular-location-content"
        style="
          margin-top: 10px;
          padding: 20px;
          justify-self: flex-start;
          border-radius: 0.5rem;
          height: 90px;
          display: flex;
          align-content: center;
          align-items: center;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
          border: 1px solid rgb(229 231 235);
        "
        v-for="(data, index) in informationCardData"
        :key="index"
      >
        <InformationCard
          :title="data.title"
          :desc="data.desc"
          :image="data.image"
        ></InformationCard>
      </div>
    </div>

    <div
      class="
        container container-custom
        margin_80_0_0
        main-text
        header-cards-for-mobile
      "
      style="
        padding-top: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <div
        class="card"
        style="
          box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
          border: 1px solid rgb(229, 231, 235);
        "
      >
        <div class="card-body">
          <h5
            class="card-title"
            style="text-align-last: center; font-weight: 600"
          >
            {{$t("home_content_title")}}
          </h5>
          <p style="margin-bottom: 0px !important">
            {{$t("home_content_body")}}
          </p>
        </div>
      </div>
    </div>
    <!-- Popular Locations Section -->
    <div
      class="
        container container-custom
        margin_80_0_0
        main-text
        header-cards-for-mobile
      "
      style="
        padding-top: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <h2 style="font-weight: bold; color: rgb(51, 51, 51); font-size: 1.4rem">
        {{ $t("home_page_popular_location_header") }}
      </h2>

      <div class="scroll-buttons" style="padding-bottom: 9px">
        <a
          id="prev-scroll"
          class="scroll-button"
          style="margin-right: 5px"
          @click="prev('popular-location')"
          >&#10094;</a
        >
        <a
          id="next-scroll"
          class="scroll-button"
          @click="next('popular-location')"
          >&#10095;</a
        >
      </div>
    </div>
    <div
      class="container container-custom margin_80_0_0 popular-location-cards"
      style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        overflow: scroll;
        scroll-behavior: smooth;
        gap: 1em;
      "
      id="popular-location"
      v-show="isLoadPopular"
    >
      <div
        class="popular-location-content"
        style="margin-top: 10px; padding-bottom: 10px"
        v-for="(location, index) in popularLocations"
        :key="index"
      >
        <PopularLocationCard
          :source="location.src"
          :state="location.state"
          :city="location.city"
        ></PopularLocationCard>
      </div>
    </div>

    <!-- Popular Boats Section -->
    <div
      class="
        container container-custom
        margin_80_0
        popular-boat-container
        header-cards-for-mobile
      "
      style="padding-top: 0px !important"
    >
      <div class="" style="margin-bottom: 35px">
        <h2
          class="h2-for-mobile"
          style="font-weight: bold; color: rgb(51, 51, 51); font-size: 1.4rem"
        >
          {{ $t("home_page_popular_boat") }}
        </h2>
      </div>
      <PopularBoatsCards :popularBoats="getPopularBoats"></PopularBoatsCards>
    </div>

    <!-- Boat Types Section -->
    <div
      class="container container-custom margin_80_0 header-cards-for-mobile"
      style="padding-top: 0px !important"
      v-show="isLoad"
    >
      <div
        class=""
        style="
          padding-top: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0px;
        "
      >
        <h2
          class="h2-boat-type-for-mobile"
          style="
            font-weight: bold;
            color: rgb(51, 51, 51);
            font-size: 1.4rem;
            margin-top: 0px;
          "
        >
          {{ $t("home_page_boat_option") }}
        </h2>

        <div class="scroll-buttons header-cards-for-mobile">
          <a
            id="prev-scroll"
            class="scroll-button"
            style="margin-right: 5px"
            @click="prev('boat-group')"
            >&#10094;</a
          >
          <a id="next-scroll" class="scroll-button" @click="next('boat-group')"
            >&#10095;</a
          >
        </div>
      </div>
      <div
        class="
          boat-group
          padding-bottom-popular-card
          boat-group-padding-bottom-popular-card
        "
        id="boat-group"
      >
        <BoatTypeCard
          :boatType="boatType"
          v-for="(boatType, index) in boatTypes"
          :key="index"
        ></BoatTypeCard>
      </div>

      <!-- Explore Captain App Section
      <div style="padding-top: 24px; padding-bottom: 50px">
        <ExploreSectionCard></ExploreSectionCard>
      </div> -->
    </div>
  </body>
</template>
<script>
import SearchBar from "./components/SearchBar.vue";
import PopularLocationCard from "./components/PopularLocationCard.vue";
import BoatTypeCard from "./components/BoatTypeCard.vue";
import PopularBoatsCards from "./components/PopularBoatsCards.vue";
import ExploreSectionCard from "./components/ExploreSectionCard.vue";
import InformationCard from "./components/InformationCard.vue";

import { mapGetters } from "vuex";
import { FETCH_POPULAR_BOAT } from "../../store/actions.type.js";

export default {
  name: "HomePage",

  components: {
    SearchBar,
    PopularLocationCard,
    BoatTypeCard,
    PopularBoatsCards,
    ExploreSectionCard,
    InformationCard,
  },

  data() {
    return {
      isLoad: false,
      isLoadPopular: false,
      sliderSettings: {
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2,
            },
          },
        ],
      },
      informationCardData: [
        {
          title: "technology_leader",
          image: "/img/tatil-danisma.svg",
          desc: "body_technology_leader",
        },

        {
          title: "choose_the_boat_for_you",
          image: "/img/tekne.svg",
          desc: "body_choose_the_boat_for_you",
        },

        {
          title: "quality_approved_boats",
          image: "/img/fiyat-garanti.svg",
          desc: "body_quality_approved_boats",
        },
        {
          title: "available_anytime",
          image: "/img/canli-destek.svg",
          desc: "body_available_anytime",
        },
      ],
      boat: [],
      popularLocations: [
        {
          city: "Bodrum",
          state: "Muğla,Türkiye",
          src: "/img/bodrum.jpeg",
        },
        { city: "Marmaris", state: "Muğla,Türkiye", src: "/img/marmaris.jpeg" },
        {
          city: "Göcek",
          state: "Muğla,Türkiye",
          src: "/img/gocek.jpg",
        },
        {
          city: "İstanbul",
          state: "İstanbul,Türkiye",
          src: "/img/istanbul.jpeg",
        },
      ],
      boatTypes: [
        { img: "Yelkenli", lang: "filter_header_yelkenlı" },
        { img: "Motoryat", lang: "filter_header_motoryat" },
        { img: "Gulet", lang: "filter_header_gulet" },
        { img: "Katamaran", lang: "filter_header_katamaran" },
      ],
    };
  },

  computed: {
    ...mapGetters(["getPopularBoats"]),
  },

  async created() {
    window.addEventListener("scroll", this.loadMore);
    $("body").click();
  },

  methods: {
    async loadMore(event) {
      if (
        event.currentTarget.scrollY >=
        event.currentTarget.innerHeight * 0.1
      ) {
        this.isLoadPopular = true;
      }
      if (
        event.currentTarget.scrollY >=
        event.currentTarget.innerHeight * 0.5
      ) {
        if (this.getPopularBoats.length < 1 && this.isLoad == false) {
          await this.$store.dispatch(FETCH_POPULAR_BOAT);
        }
        this.isLoad = true;
      }
    },
    RouteBoats() {
      this.$router.push({ name: "AllBoats" });
    },
    RouteBoatsWithMap(boatType) {
      this.$router.push({
        name: "AllBoats",
        params: {
          boatType: boatType,
        },
      });
    },
    next(id) {
      document.getElementById(id).scrollLeft += 250;
    },
    prev(id) {
      document.getElementById(id).scrollLeft -= 250;
    },
  },
};
</script>

<style>
.header-cards-for-mobile {
  padding-top: 60px !important;
}
.main-content .multiselect__single {
  background-color: transparent !important;
}
.app-download {
  bottom: 0;
  position: sticky;
  padding-bottom: 53px;
}
.app-download-image {
  width: 24px !important;
  height: 24px !important;
}
.boat-group::-webkit-scrollbar,
.popular-location-cards::-webkit-scrollbar {
  display: none;
}
.custom-arrow {
  color: black !important;
}
.slick-prev {
  left: -43px;
}
.slick-next {
  right: -45px;
}
.slick-prev,
.slick-next {
  top: 43%;
  width: 30px;
  height: 30px;
}
.slick-prev:before,
.slick-next:before {
  color: #9e9e9e !important;
  font-size: 30px;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.main-page {
  min-height: 100%;
}

.scroll-buttons {
  visibility: hidden;
}
.trustpilot-image {
  width: 120px !important;
  height: 35px !important;
}
.home-search {
  transition: all 0.3s ease-in-out;
  border: #fff !important;
  padding: 0 25px;
  height: 50px;
  cursor: pointer;
  background-color: #fff;
  margin-right: -1px;
  box-shadow: 0px 6px 16px rgb(0 0 0 / 25%) !important;
  font-size: 18px !important;
  line-height: 20px !important;
  font-weight: 600 !important;
  border-radius: 54px !important;
  border-width: 1px !important;
  border-style: solid !important;
  outline: none !important;
}

.hero_single.version_3 {
  height: 100% !important;
}

.home-search span {
  -webkit-text-fill-color: transparent !important;
  background: linear-gradient(90deg, #ef4036 0%, #ef4036 135.12%) !important;
  -webkit-background-clip: text !important;
}

.home-search:hover {
  box-shadow: 0px 6px 16px rgb(0 0 0 / 50%) !important;
}
.hero_single {
  background-image: url("/img/background_18_v3.jpg");
  background-position: center;
  background-size: cover;
  background-position-y: 0%;
}

.hero_single.version_3 .wrapper {
  background-color: rgba(0, 0, 0, 0) !important;
}

.main-content {
  display: grid;
  grid-gap: 10px;
  min-height: 70vh;
}

.main-text span {
  font-size: 32px;
  font-weight: 700;
  line-height: 52px;
  color: #000;
}
.tripadvisor-image {
  width: 115px !important;
  height: 45px !important;
}
.popular-location-cards {
  padding-top: 15px !important;
}

.boat-type-image img {
  width: 100% !important;
  display: block !important;
}

.main_title_2 h2 {
  text-align: start;
  margin: 60px 0 0 0 !important;
}

.popular-boat-container .card-inner {
  padding-right: 7px;
  padding-left: 7px;
}

.slick-list {
  margin-right: -15px !important;
  margin-left: -15px !important;
}

.captain-route-container {
  background-image: url("../../../public/img/boatsy-bottom-section.jpg");
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 1;
}

.captain-route-container::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #000;
  opacity: 0.4;
  border-radius: 15px;
}

a.btn_1,
.btn_1 {
  background: #ef4036 !important;
}

.captain-app-col {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 50px;
  width: 40%;
  justify-content: center;
}

.captain-app-header {
  font-size: 48px;
  line-height: 50px;
}

.captain-app-title {
  font-size: 18px;
}

a.btn_1.rounded,
.btn_1.rounded {
  border-radius: 10px !important;
}
.a.btn_1,
.btn_1 {
  padding: 15px 15px !important;
}
.header-filter {
  padding-bottom: 10px !important;
  margin-top: 80px !important;
  padding-right: 20px !important;
  padding-left: 20px !important;
}
.captain-route-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.boat-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
#boatsy-info-card .popular-location-content:hover {
  border: 1px solid #051d40;
}
.popular-location-content {
  width: 100% !important;
}

.scroll-button {
  border-radius: 50%;
  border: 1px solid #ddd;
  padding: 5px 8px;
}
.app-download span {
  font-size: 12px;
}
@media (max-width: 1200px) {
  .scroll-buttons {
    visibility: visible;
  }
  .boat-type-image {
    min-width: 272px;
  }
  .boat-group {
    overflow: scroll;
    scroll-behavior: smooth;
  }

  .app-links .social-icons a {
    width: 145px !important;
  }

  #boatsy-info-card {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  #boatsy-info-card {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 1024px) {
  .loading-popular-boat {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 991px) {
  .custom-search-input-2 input[type="submit"] {
    margin-left: 35px !important;
    border-radius: 999 !important;
  }
  .card-date-picker-mobil-temp {
    height: 60px !important;
    margin: 3px;
    border-radius: 56px !important;
    background: none !important;
    width: 45% !important;
  }
  .searchbar-container {
    padding-bottom: 100px !important;
  }
  .homepage-title {
    justify-content: start !important;
    order: -1 !important;
  }
  .main-content {
    min-height: 90vh !important;
  }
  .main-content .multiselect__single {
    background-color: transparent !important;
    padding-left: 10px !important;
  }
  .search-bar-background-color {
    background: transparent !important;
  }
  .date_picker_title {
    padding-top: 15px !important;
  }
  .resize-location-row {
    height: 60px !important;
    margin: 3px;
    border-bottom: 1px solid;
    border-color: #00000033;
    /* padding-bottom: 25px !important; 
    border-radius: 56px !important;
    background: rgba(255, 255, 255, 0.8) !important;*/
  }
  .partners-section {
    visibility: hidden !important;
    position: absolute !important;
  }
  .app-links {
    justify-content: center !important;
  }
  .app-download {
    justify-content: center !important;
    align-items: center !important;
  }
  .hero_single.version_3 {
    max-height: 90vh !important;
  }
  .homepage-title h1 {
    margin-top: 110px !important;
  }
  .homepage-sub-title {
    font-size: 25px !important;
  }
}
@media (max-width: 768px) {
  #boatsy-info-card {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}
@media (min-width: 600px) {
  .padding-bottom-popular-card {
    margin-bottom: 80px;
    margin-top: 40px;
  }
}
@media (max-width: 591px) {
  .location-title {
    margin-left: 30px !important;
    text-align-last: left !important;
  }
  .date_picker_title {
    float: left !important;
    margin-left: -10px !important;
  }
  .searchbar-container {
    padding-bottom: 200px !important;
  }
  .header-boatsy-logo {
    padding-bottom: 0px !important;
    margin-top: -15px !important;
    margin-left: -3px !important;
  }
  .nav-rigth-side {
    align-items: start !important;
    padding-top: 0px !important;
  }
  .header-phone-number {
    padding-top: 0px !important;
    margin-bottom: -15px !important;
    margin-top: -20px !important;
  }
  header {
    position: unset !important;
    left: 0;
    top: 0;
    width: 100%;
    padding: 10px 30px;
    z-index: 101;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
  }
  .searchbar-container {
    padding-bottom: 320px !important;
  }
  .hero_single .wrapper {
    height: 120% !important;
  }
  .hero_single.version_3 {
    max-height: 100% !important;
  }

  .main-content {
    min-height: 550px !important;
  }
  .custom-search-input-2 input[type="submit"] {
    margin: 10px 0 0 0 !important;
    border-radius: 999 !important;
  }
  .card-date-picker-mobil-temp {
    background: none !important;
    width: 45% !important;
  }
  .header-filter {
    padding-bottom: 10px !important;
    margin-top: 120px !important;
    padding-right: 0px !important;
    padding-left: 0px !important;
  }

  .hide-search-item {
    width: 0px !important;
    height: 0px !important;
  }
  .homepage-title h1 {
    margin-top: 20px !important;
  }

  .homepage-sub-title {
    font-size: 16px !important;
    text-align: center !important;
  }
}

@media (max-width: 1041px) {
  .captain-app-col {
    width: 60%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .homepage-title h1 {
    text-align: center !important;
  }
  .homepage-title {
    justify-content: center !important;
  }
}

@media (max-width: 770px) {
  .custom-search-input-2 input[type="submit"] {
    margin-left: 13px !important;
    margin-top: 13px !important;
  }
  .app-download {
    gap: 1em;
    padding-left: 30px;
    justify-content: space-around;
  }
  .captain-app-col {
    width: 80%;
  }
  .captain-app-header {
    font-size: 35px;
    line-height: 39px;
  }

  .captain-app-title {
    font-size: 20px;
  }
}
@media (max-width: 524px) {
  .app-gallery-box {
    position: absolute;
    visibility: hidden;
  }
}

@media (max-width: 510px) {
  .h2-boat-type-for-mobile {
    margin: 30px 0 0 0 !important;
  }
  .h2-for-mobile {
    margin: 30px 0 0 0 !important;
  }
  .boat-group-padding-bottom-popular-card {
    padding-top: 15px !important;
  }
  .main_title_2 h2 {
    margin: 30px 0 0 0 !important;
  }
  .header-cards-for-mobile {
    padding-top: 30px !important;
  }
  #boatsy-info-card {
    padding-top: 30px !important;
  }
  .main-text span {
    font-size: 100%;
  }
}

@media (max-width: 480px) {
  .loading-popular-boat {
    grid-template-columns: repeat(1, 1fr);
  }
  .container .searchbar-container {
    margin-top: 80px;
  }
}

@media (max-width: 450px) {
  .captain-app-col {
    place-items: center;
    text-align: center;
  }
  .captain-app-header {
    font-size: 22px;
    line-height: 24px;
  }
  .captain-route-container {
    height: 400px !important;
  }
}

/* Mobile Devices */
@media (max-width: 480px) {
  .row-height {
    padding-top: 0px !important;
  }
  .popular-boats-slider {
    padding: 0 8px;
  }
  .captain-app-header h1 {
    font-size: 32px;
  }
  .captain-app-title {
    font-size: 18px;
  }
  .captain-app-col {
    width: 100%;
    padding: 0 10px;
  }
  .boat-card-map-title {
    padding-top: 5px !important;
  }
}
.h2-for-mobile {
  margin: 50px 0 0 0;
}
.h2-boat-type-for-mobile {
  margin: 25px 0 0 0 !important;
}
.boat-group-padding-bottom-popular-card {
  margin-top: 15px;
}
</style>
