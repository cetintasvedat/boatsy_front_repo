<template>
  <div class="card-inner">
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
      <figure class="boat-card-image">
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
            :src="IMAGE_URL + element"
            v-for="element in imagesArray"
            loading="lazy"
          />
        </flickity>
        <div class="read_more">
          <div>
            <a class="prev" v-on:click="this.prev">&#10094; </a>
            <a class="next" v-on:click="this.next">&#10095; </a>
          </div>
        </div>
      </figure>

      <div class="wrapper">
        <div class="row boat-card-header">
          <div class="col-12">
            <h2 style="font-size: 1rem; text-align: start">
              {{ $t(boatData.boattypename) }} · {{ boatData.city }} · {{ boatData.personcapacity }} {{$t('boat_card_horizontal_boat-city')}} · {{ parseInt(boatData.boatheight) }} m
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-7 comment-and-rate" style="text-align: start">
            <div class="card-score" >
              <strong v-if="boatData.commentavarage != null"
                ><i class="fas fa-star"></i>
                {{ parseFloat(boatData.commentavarage).toFixed(1) }}</strong
              >
              <strong v-else><i class="fas fa-star"></i> 0</strong>
              ({{ boatData.commentcount }} {{$t('map_boat_card_commentcount')}})
            </div>
          </div>
          <div class="col-5">
            <div
              class="card-price"
              style="display: flex; justify-content: flex-end"
            >
              <strong
                >{{ convertCurrency(boatData.dailyprice, boatData.currencyvalue) }}
                {{ boatData.isdaily == false ? $t('boat_reservation_hour') :  $t('boat_reservation_day')}}</strong
              >
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { IMAGE_URL } from "../config/GlobalVariables";
import Flickity from "vue-flickity";
import { mapGetters } from "vuex";
import { SET_LIKE_BOAT,FETCH_BOAT_DETAIL } from "../store/actions.type.js";

export default {
  props: ["boatData"],
  components: {
    Flickity,
  },
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      name: "boat-cards-vertical",
      likedBoat: this.boatData.boatlike,
      imagesArray: [],
      timer: null,
      currentIndex: this.boatData.defaultimage ?? 0,
      selectedCurrency: this.$store.getters.getSelectedCurrency,
      allow: false,
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
    if (this.boatData.image != null) {
      this.imagesArray = this.boatData.image.split(";");
    }
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

    async routeToDetail(Type, State, City, Id, e) {
      var container =
        ($(".next").is(e.target) && $(".next").has(e.target).length === 0) ||
        ($(".prev").is(e.target) && $(".prev").has(e.target).length === 0) ||
        ($(".wish_bt.liked").is(e.target) &&
          $(".wish_bt.liked").has(e.target).length === 0) ||
        ($(".wish_bt").is(e.target) &&
          $(".wish_bt").has(e.target).length === 0);
      if (!container) {
        let routeData =  this.$router.resolve({
          name: "BoatDetail",
          params: {
            boatType: Type,
            boatState: State,
            boatCity: City,
            boatId: Id,
          },
        });
        window.open(routeData.href, '_blank');
      }
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
    show() {
      this.$modal.show("signIn-modal");
    },
    hide() {
      this.$modal.hide("signIn-modal");
    },
  },
  computed: {
    currentImg: function () {
      return this.imagesArray[
        Math.abs(this.currentIndex) % this.imagesArray.length
      ];
    },
    ...mapGetters(["getCurrency", "getProfileModel"]),
  },
};
</script>

<style>
.prev,
.next {
  cursor: pointer;
  position: absolute;
  width: auto;
  padding: 5px 10px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  background-color: white;
  right: 5px;
}

.prev {
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  background-color: white;
  left: 5px;
}

.prev:hover,
.next:hover {
  opacity: 3;
  border-radius: 999;
}

.boat-card-image:hover .read_more {
  opacity: 1;
  visibility: visible;
}
.boat-card-image {
  position: relative;
}
.boat-card-image img {
  width: 100%;
  display: block;
  border-radius: 3%;
  aspect-ratio: 4/3;
  object-fit: cover;
}

.card-captain,
.card-person {
  text-align: end;
}
.boat-card-image a.wish_bt:after {
  font-family: "ElegantIcons";
  font-display: swap;
  content: "\e030";
  position: absolute;
  transition: all 0.5s ease;
  z-index: 1;
  right: 10px;
  top: 5px;
  font-size: 23px;
  color: #eeeef1;
}
.boat-card-image a.wish_bt.liked:after {
  content: "\e089";
  color: #fc5b62;
}
</style>
