<template>
  <div
    class="container boat-card-horizontal"
    id="list_sidebar"
    style="padding: 0"
  >
    <a
      @click="
        routeToDetail(
          boatData.boattypename,
          boatData.state,
          boatData.city,
          boatData.id,
          $event
        )
      "
    >
      <div class="row" style="width: 100%; padding: 0px; margin: 0px">
        <div
          class="col-5 boat-horizontal-content"
          style="padding-right: 0; padding-left: 0"
        >
          <figure class="boat-card-image" style="margin: 0 !important">
            <a
              v-if="getProfileModel.id > 0"
              v-on:click="likeBoatFunc(boatData.id)"
              :class="{
                wish_bt: !this.likedBoat,
                'wish_bt liked': this.likedBoat,
              }"
            ></a>
            <a v-on:click="show" v-else class="wish_bt"></a>
            <small v-if="boatData.captainRosette != null">{{
              boatData.captainRosette
            }}</small>
            <a class="img-fluid" alt="" width="800" height="533"></a>
            <flickity
              ref="flickity"
              :options="flickityOptions"
              class="boat-card"
              v-if="imagesArray.length > 0"
            >
              <img
                class="carousel-cell boat-card-image"
                loading="lazy"
                decoding="async"
                :src="IMAGE_URL + element"
                v-for="(element,index) in imagesArray"
                :key="index"
              />
            </flickity>
            <div class="read_more">
              <div>
                <a class="prev" v-on:click="this.prev">&#10094; </a>
                <a class="next" v-on:click="this.next">&#10095; </a>
              </div>
            </div>
          </figure>
        </div>
        <div
          class="col-7 boat-horizontal-content"
          style="
            flex-direction: column;
            display: flex;
            justify-content: space-between;
            padding-right: 0 !important;
          "
        >
          <div class="card-horizontal">
            <div class="col" style="text-align: end">
              <a
                v-if="getProfileModel.id > 0"
                v-on:click="likeBoatFunc(boatData.id)"
                :class="{
                  wish_bt: !this.likedBoat,
                  'wish_bt liked': this.likedBoat,
                }"
              ></a>
              <a v-on:click="show" v-else class="wish_bt"></a>
            </div>
            <div class="" style="text-align: start">
              <h2 class="horizontal-boat-city" style="margin-top: 5px">
                {{ $t(boatData.boattypename) }} · {{ boatData.city }} · {{ boatData.personcapacity }} {{ $t("boat_card_horizontal_boat-city") }} · {{ parseInt(boatData.boatheight) }} m
              </h2>
            </div>
          </div>
          <div
            class="boat-card-horizontal-comment"
            style="
              justify-content: space-between;
              display: flex;
              flex-wrap: wrap;
            "
          >
            <div class="card-score">
              <strong v-if="boatData.commentavarage != null"
                ><i class="fas fa-star"></i>
                {{ parseFloat(boatData.commentavarage).toFixed(1) }}</strong
              >
              <strong v-else><i class="fas fa-star"></i> 0</strong>
              ({{ boatData.commentcount }}
              {{ $t("map_boat_card_commentcount") }})
            </div>
            <div class="horizontal-price">
              <div class="horizontal-card-price">
                <strong
                  >{{
                    convertCurrency(boatData.dailyprice, boatData.currencyvalue)
                  }}
                  {{
                    boatData.isdaily == false
                      ? $t("boat_reservation_hour")
                      : $t("boat_reservation_day")
                  }}</strong
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { IMAGE_URL } from "../config/GlobalVariables";
import { mapGetters } from "vuex";
import Flickity from "vue-flickity";
import { SET_LIKE_BOAT } from "../store/actions.type.js";

export default {
  props: ["boatData"],
  components: {
    Flickity,
  },
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      name: "boat-cards-horizontal",
      likedBoat: this.boatData.boatlike,
      imagesArray: [],
      timer: null,
      currentIndex: this.boatData.defaultimage ?? 0,
      email: [],
      password: [],
      selectedCurrency: this.$store.getters.getSelectedCurrency,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
      },
    };
  },
  mounted: function () {},

  created() {
    this.imagesArray = this.boatData.image.split(";");
  },

  methods: {
    async likeBoatFunc(id) {
      this.likedBoat = !this.likedBoat;
      this.$store.commit("setSelectedBoatId", id);
      var res = await this.$store.dispatch(SET_LIKE_BOAT);
      if (res.error == true) {
        this.likedBoat = !this.likedBoat;
      }
    },
    next: function () {
      this.$refs.flickity.next();
    },

    prev: function () {
      this.$refs.flickity.previous();
    },
    routeToDetail(Type, State, City, Id, e) {
      var container =
        ($(".next").is(e.target) && $(".next").has(e.target).length === 0) ||
        ($(".prev").is(e.target) && $(".prev").has(e.target).length === 0) ||
        ($(".wish_bt.liked").is(e.target) &&
          $(".wish_bt.liked").has(e.target).length === 0) ||
        ($(".wish_bt").is(e.target) &&
          $(".wish_bt").has(e.target).length === 0);

      if (!container) {
        let routeData = this.$router.resolve({
          name: "WithDateBoatDetail",
          params: {
            boatType: Type,
            boatState: State,
            boatCity: City,
            boatId: Id,
            startDate: this.getStartDate,
            endDate: this.getEndDate,
          },
        });
        window.open(routeData.href, "_blank");
      }
      return container;
    },
    show() {
      this.$modal.show("signIn-modal");
    },
    hide() {
      this.$modal.hide("signIn-modal");
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
        return boatPrice + "₺";
      }
    },
  },
  computed: {
    currentImg: function () {
      return this.imagesArray[
        Math.abs(this.currentIndex) % this.imagesArray.length
      ];
    },
    ...mapGetters(["getProfileModel", "getStartDate", "getEndDate"]),
  },
};
</script>
<style>
.leaflet-container a.leaflet-popup-close-button {
  color: #000000 !important;
  font-size: 24px !important;
  background-color: white !important;
  margin-top: 15px !important;
}
.modal-content {
  margin-top: -20px;
}
.modal-body input {
  width: 100%;
  padding: 15px;
  border: 1px solid silver;
  border-radius: 7px;
}
.horizontal-card-price {
  font-weight: bold;
  font-size: 17px;
  margin-top: -3px;
}
.horizontal.divider {
  width: 40px;
  margin: 10px;
  margin-left: 3px;
}

.horizontal-prev,
.horizontal-next {
  cursor: pointer;
  position: absolute;
  top: -35px;
  width: 30px;
  background-color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 25px;
  text-decoration: none;
  user-select: none;
}

.horizontal-next {
  right: 18px;
}

.horizontal-prev {
  left: 25px;
}

.horizontal-prev:hover,
.horizontal-next:hover {
  opacity: 3;
  border-radius: 999;
}
.mb-4 uppercase tracking-wide text-xl {
  font-size: 12px;
}

.row.facebook-btn {
  margin-right: 12px !important;
  margin-top: 2px !important;
  background-color: white !important;
  height: 45px !important;
  width: 553px !important;
  border-radius: 0.5rem;
  font-size: 14px;
  color: darkslategrey;
  font-size: 14px;
  border-color: lightgray !important;
  border-bottom-color: white !important;
  border-right-color: white !important;
  align-content: space-around !important;
}
.google-btn {
  margin-right: 12px !important;
  background-color: white !important;
  height: 45px !important;
  width: 553px !important;
  border-radius: 0.5rem;
  border-color: lightgray;
  color: darkslategrey;
  font-size: 14px;
  border-color: lightgray !important;
  border-bottom-color: white !important;
  border-right-color: white !important;
  align-content: space-around !important;
}
.apple-btn {
  margin-right: 12px !important;
  background-color: white !important;
  height: 45px !important;
  width: 553px !important;
  border-radius: 0.5rem;
  border-color: lightgray;
  color: darkslategrey;
  font-size: 14px;
  border-color: lightgray !important;
  border-bottom-color: white !important;
  border-right-color: white !important;
  align-content: center !important;
}
.login {
  font-size: 17px;
  font-weight: bold;
  margin-left: 170px;
}
.row-footer {
  margin-right: 207px !important;
}
.row-footer1 {
  margin-right: 207px !important;
}
.row-footer2 {
  margin-right: 207px !important;
}

.email-input-button-modals {
  width: 507px;
  height: 45px;
  border-radius: 0.5rem;
  border-color: white !important;
  border-bottom-color: white !important;
  border-right-color: lightgray !important;
  border-left-color: white !important;
  border-top-color: white !important;
}
.password-input-button-modals {
  width: 507px;
  height: 45px;
  border-radius: 0.5rem;
  border-color: lightgray;
  border-left-color: white !important;
  border-top-color: white !important;
}
.boat-cards-horizontal .modal-body {
  height: 275px !important;
}
.mbody {
  margin-top: 20px;
}
.welcome-modal {
  font-size: 18px;
  font-weight: bold;
  margin-right: 315px !important;
  margin-top: 20px;
}
.modal-giris {
  width: 507px;
  height: 45px;
  border-radius: 0.5rem;
  background-color: #ef4036;
  border-color: lightgray;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: white;
  margin-top: -40px !important;
  border-bottom-color: white !important;
  border-right-color: lightgray !important;
  border-left-color: white !important;
  border-top-color: white !important;
}
.close {
  margin-right: 10px !important;
  margin-top: -18px !important;
}
.fab.fa-apple {
  font-size: 22px;
  margin-top: 5px;
  color: darkslategrey;
  background-color: #fff;
}
.iconapple {
  margin-top: 5px;
}
.fab.fa-google {
  font-size: 18px;
  margin-top: 5px;
  background: conic-gradient(
      from -45deg,
      #ea4335 110deg,
      #4285f4 90deg 180deg,
      #34a853 180deg 270deg,
      #fbbc05 270deg
    )
    73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.icongoogle {
  margin-top: 5px;
}
.fab.fa-facebook {
  font-size: 18px;
  margin-top: 5px;
  color: #1e90ff;
  background-color: #fff;
}

.iconfacebook {
  margin-top: 5px;
}
.email-input-button-modals {
  font-size: 17px;
  padding-left: 12px;
}
.password-input-button-modals {
  font-size: 17px;
  padding-left: 12px;
}

.security {
  background-color: white;
  text-decoration: underline;
  border-radius: 0.5rem;
  border-bottom-color: white !important;
  border-right-color: white !important;
  border-left-color: white !important;
  border-top-color: white !important;
  margin-top: -2px;
  text-decoration: underline;
}

.security-btn {
  color: gray !important;
  margin-top: -15px;
}

.text-divider {
  display: flex;
  font-size: 12px;
  align-items: center;
  --text-divider-gap: 1rem;
}

.text-divider::before,
.text-divider::after {
  content: "";
  height: 1px;
  background-color: silver;
  flex-grow: 1;
}

.text-divider::before {
  margin-right: var(--text-divider-gap);
}

.text-divider::after {
  margin-left: var(--text-divider-gap);
}
.modal-footer {
  border-top: 1px solid white !important;
}

@media (max-width: 768px) {
  .modal-box {
    min-width: 95%;
  }
  .modal-footer > button {
    padding: 1rem 1rem;
  }
}
@media (min-width: 769px) {
  .modal-box {
    min-width: 70%;
  }
  .modal-footer > button {
    padding: 0.8rem 1rem;
  }
}
@media (min-width: 1024px) {
  .modal-box {
    min-width: 50%;
  }
  .modal-footer > button {
    padding: 0.8rem 1rem;
  }
}

.isotope-wrapper {
  position: relative;
  height: 275px;
  margin-top: 20px;
}
.isotope-wrapper.row.no-gutters {
  width: 800px !important;
}
.box_list.a.wish_bt {
  position: absolute;
  z-index: 1;
  font-size: -21px !important;
  display: inline-block;
  color: #555;
  line-height: 1;
  border-radius: 3px !important;
  font-size: 24px !important;
}
.list_sidebar .box_list .wrapper {
  min-height: 265px;
  margin-left: 95px;
}

.boat-card-row {
  padding: 2px !important;
}
.row .boat-card-horizontal-comment {
  width: 100%;
}
.read_more {
  position: absolute;
  top: 43%;
  left: 0;
  margin-top: -150x;
  transform: translateY(10px);
  text-align: center;
  opacity: 0;
  visibility: hidden;
  width: 100%;
  transition: all 0.6s;
  z-index: 0;
}
#list_sidebar .box_list {
  min-height: 236px;
  border-top: 1px solid;
  border-top-color: lightgrey;
}
.horizontal-boat-city {
  color: #333;
  font-weight: bold;
  letter-spacing: 0.5px;
  font-size: 17px;
}
.horizontal-boat-city:hover {
  text-decoration: underline;
}
.boat-card-horizontal .boat-card-image img {
  aspect-ratio: 3/2;
}
/* Tablet */
@media (max-width: 768px) {
  .boat-horizontal-content {
    flex: 0 0 100% !important;
    max-width: 100% !important;
    padding-top: 20px;
    padding-left: 0;
  }
  .boat-card-map-title {
    font-size: 24px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .horizontal-card-price {
    font-size: 14px;
  }
  .horizontal-boat-city {
    font-size: 16px;
  }
  .map-boat-container {
    padding-right: 0;
    padding-left: 0;
  }
  .boat-card-horizontal {
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
