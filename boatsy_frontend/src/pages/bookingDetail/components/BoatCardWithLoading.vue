<template>
  <div class="card-inner" style="padding: 15px" v-if="boatData.id > 0">
    <a @click="routeToDetail($event)">
      <figure class="boat-card-image">
        <a class="img-fluid" alt="" width="800" height="533"></a>
        <div class="boat-card" v-if="imagesArray.length > 0">
          <img class="boat-card-image" :src="IMAGE_URL + imagesArray[currentIndex]" />
        </div>
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
            <h6>
              {{ boatData.boattypename }} · {{ boatData.city }} ·
              {{ boatData.personcapacity }} {{$t('boat_card_horizontal_boat-city')}} ·
              {{ parseInt(boatData.boatheight) }} m
            </h6>
          </div>
        </div>
      </div>
      <modal name="login-modal">
        <login-card></login-card>
      </modal>
    </a>
  </div>
  <div v-else>{{$t('boat_card_with_loading')}}</div>
</template>

<script>
import { IMAGE_URL } from "../../../config/GlobalVariables";
import { mapGetters } from "vuex";
import { FETCH_BOAT_DETAIL_FOR_BOAT_CARD } from "../../../store/actions.type";
export default {
  props: ["boatData"],
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      name: "boat-card-with-loading",
      imagesArray: [],
      timer: null,
      currentIndex: 0,
      selectedCurrency: this.$store.getters.getSelectedCurrency,
      routeParams: [],
    };
  },
  mounted: async function () {},
  created() {
    if (this.boatData.image != null) {
      this.imagesArray = this.boatData.image.split(";");
    }
    this.routeParams = {
      boatType: this.boatData.boattypename,
      boatState: this.boatData.state,
      boatCity: this.boatData.city,
      boatId: this.boatData.boatid,
    };
  },
  methods: {
    next: function () {
      if (this.currentIndex + 1 < this.imagesArray.length) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0;
      }
    },

    prev: function () {
      if (this.currentIndex == 0) {
        this.currentIndex = this.imagesArray.length - 1;
      } else {
        this.currentIndex -= 1;
      }
    },
    routeToDetail(e) {
      var container =
        ($(".next").is(e.target) && $(".next").has(e.target).length === 0) ||
        ($(".prev").is(e.target) && $(".prev").has(e.target).length === 0);

      if (!container) {
        this.$router.push({
          name: "BoatDetail",
          params: this.routeParams,
        });
      }
    },

    convertCurrency(price, currencyValue) {
      var boatPrice = price * currencyValue;
      var currencyList = this.$store.state.boat.currency;
      if (currencyList.length > 0) {
        return (
          Math.round(boatPrice / currencyList[this.selectedCurrency - 1].value) +
          " " +
          currencyList[this.selectedCurrency - 1].symbol
        );
      } else {
        return boatPrice + " ₺";
      }
    },
    show() {
      this.$modal.show("login-modal");
    },
    hide() {
      this.$modal.hide("login-modal");
    },
  },
  computed: {
    currentImg: function () {
      return this.imagesArray[Math.abs(this.currentIndex) % this.imagesArray.length];
    },
    ...mapGetters(["getCurrency", "getProfileModel"]),
  },
};
</script>

<style>
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
.comment-and-rate,
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
  font-size: 20px;
}
.boat-card-image a.wish_bt.liked:after {
  content: "\e089";
  color: #fc5b62;
}
</style>
