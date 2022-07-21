<template>
  <div style="padding-top: 10px">
    <div class="box_grid map-card" style="width: 400px" @click="
        routeToDetail(
          boatData.boattypename,
          boatData.state,
          boatData.city,
          boatData.id,
          $event
        )
      ">
      <figure class="boat-card-image-map-card">
        <a
          v-if="getProfileModel.id > 0"
          v-on:click="likeBoatFunc(boatData.id)"
          :class="{
            wish_bt: !this.likedBoat,
            'wish_bt map-card liked': this.likedBoat,
          }"
        ></a>
        <a v-on:click="show" v-else class="wish_bt"></a>
        <small v-if="boatData.captainRosette != null">{{
          boatData.captainRosette
        }}</small>
        <a class="img-fluid" alt="" width="800" height="533"></a>

        <img
          class="boat-card-image"
          v-if="imagesArray.length > 0"
          :src="IMAGE_URL + imagesArray[currentIndex]"
        />
        <div class="read_more">
          <div>
            <a class="prev" v-on:click="this.prev">&#10094; </a>
            <a class="next" v-on:click="this.next">&#10095; </a>
          </div>
        </div>
      </figure>
      <div class="wrapper boat-map-card">
        <div class="row boat-map-card">
          <div class="col boat-map-card">
            <h2 style="font-size:1.25rem;">
              <a>{{ boatData.state }} {{ boatData.city }} </a>
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="card-price">
              <strong
                >{{ convertCurrency(boatData.dailyprice, boatData.currencyvalue) }}
                {{ boatData.isdaily == true ? $t('boat_reservation_day') :  $t("boat_reservation_hour") }}</strong
              >
            </div>
          </div>
          <div class="col">
            <div class="card-person boat-map-card">
              {{ boatData.personcapacity }} {{$t('map_boat_card_person')}}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="card-model boat-map-card">{{ boatData.modelyear }} {{$t('boat_features_model')}}</div>
          </div>
          <div class="col">
            <div class="card-captain boat-map-card">
              <p v-if="boatData.captain">{{$t('filter_header_with_captain')}}</p>
              <p v-else-if="!boatData.captain">{{$t('filter_header_without_captain')}}</p>
            </div>
          </div>
        </div>
      </div>
      <ul class="map-card-comment">
        <li>
          <div class="comment">
            <i class="icon_comment"></i>
            {{ boatData.commentcount }} {{$t('map_boat_card_commentcount')}}
          </div>
        </li>
        <li>
          <div class="card-score">
            <strong v-if="boatData.avgComment != null"
              ><i class="fas fa-star"></i> {{ boatData.commentavarage }}</strong
            >
            <strong v-else><i class="fas fa-star"></i> 0</strong>
          </div>
        </li>
      </ul>
    </div>
     <modal name="login-modal">
        <login-card></login-card>
      </modal>
  </div>
</template>

<script>
import { IMAGE_URL } from "../../../config/GlobalVariables";
import { mapGetters } from "vuex";
import { SET_LIKE_BOAT } from "../../../store/actions.type.js";

export default {
  props: ["boatData"],
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      name: "boat-map-card",
      likedBoat: this.boatData.boatlike,
      imagesArray: [],
      timer: null,
      currentIndex: this.boatData.defaultimage ?? 0,
      selectedCurrency: this.$store.getters.getSelectedCurrency,
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
    show() {
      this.$modal.show("login-modal");
    },
    hide() {
      this.$modal.hide("login-modal");
    },
    routeToDetail(Type, State, City, Id, e) {
      var container =
        ($(".next").is(e.target) && $(".next").has(e.target).length === 0) ||
        ($(".prev").is(e.target) && $(".prev").has(e.target).length === 0) ||
        ($(".wish_bt.liked").is(e.target) &&
          $(".wish_bt.liked").has(e.target).length === 0) ||
        ($(".wish_bt").is(e.target) && $(".wish_bt").has(e.target).length === 0);

      if (!container) {
        this.$router.push({
          name: "BoatDetail",
          params: {
            boatType: Type,
            boatState: State,
            boatCity: City,
            boatId: Id,
          },
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
  },
  computed: {
    ...mapGetters(["getCurrency", "getProfileModel"]),
    currentImg: function () {
      return this.imagesArray[Math.abs(this.currentIndex) % this.imagesArray.length];
    },
  },
};
</script>

<style>
.boat-card-image-map-card .wish_bt {
  color: #ffffff !important;
  font-size: 19px !important;
  background-color: transparent !important;
}

.prev:hover,
.next:hover {
  opacity: 3;
  border-radius: 999;
}

.boat-card-image-map-card {
  border-radius: 20px 20px 0 0;
  height: 200px !important;
  width: 300px !important;
}

.boat-card-row {
  padding: 2px !important;
}

.box_grid.map-card {
  width: 300px !important;
  margin-top: -17px !important;
  height: 370px !important;
  cursor: pointer;
  z-index: 1;
}
.leaflet-popup-close-button {
  margin-right: 188px !important;
  margin-top: 8px !important;
}
.map-card-comment {
  padding: 20px 15px;
  margin-top: -40px;
  border-top: 1px solid #ededed;
  margin-left: 7px;
}
.col.boat-map-card {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  margin-left: -17px;
  margin-top: -2px;
}
.card-person.boat-map-card {
  float: right;
  margin-top: 2px !important;
}
.card-model.boat-map-card {
  margin-top: -4px !important;
}

.card-captain.boat-map-card {
  margin-top: -20px !important;
}
.box_grid .wrapper.boat-map-card {
  margin-right: 39px !important;
  padding: 25px !important;
  padding-top: 15px !important;
  padding-left: 25px !important;
  padding-right: 25px !important;
}
.col.boat-map-card {
  margin-left: 0px !important;
}
</style>
