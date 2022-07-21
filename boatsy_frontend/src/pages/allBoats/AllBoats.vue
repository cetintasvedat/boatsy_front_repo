<template>
  <body>
    <div class="">
      <filter-header></filter-header>
      <div
        class="map-boat-container"
        id="getMoreBoatsWithScroll"
        v-on:scroll="getOnScrollItem()"
      >
        <div class="cards_wrap">
          <div
            class="card_item"
            v-for="(item, index) in getAllBoats"
            :key="index"
          >
            <boat-card-vertical :boatData="item"></boat-card-vertical>
          </div>
        </div>
        <div
          class="cards_wrap"
          style="min-height: 100vh"
          v-if="getAllBoats.length == 0 && !getAllBoatsLoading"
        >
          <h3 style="margin: auto">
            Aradığınız kriterlere uygun tekne bulunamadı
          </h3>
        </div>
        <div
          class="cards_wrap"
          id="cards_wrap"
          v-if="getAllBoatsLoading"
          v-on:scroll="getOnScrollItem()"
        >
          <div class="card_item" v-for="i in loaderCount">
            <div
              class="card-inner"
              style="
                background-color: #ddd;
                aspect-ratio: 4/3;
                border-radius: 3%;
                animation-name: loadingEffect;
                animation-duration: 1s;
                animation-iteration-count: infinite;
              "
            ></div>
            <div class="head">
              <h4
                style="
                  height: 20px;
                  margin-top: 15px;
                  width: 75%;
                  background-color: #ddd;
                  border-radius: 3%;
                  animation-name: loadingEffect;
                  animation-duration: 1s;
                  animation-iteration-count: infinite;
                "
              ></h4>
            </div>
            <div class="title">
              <h4
                style="
                  height: 20px;
                  margin-top: 15px;
                  width: 40%;
                  background-color: #ddd;
                  border-radius: 3%;
                  animation-name: loadingEffect;
                  animation-duration: 1s;
                  animation-iteration-count: infinite;
                "
              ></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import { mapGetters } from "vuex";
import { FETCH_ALL_BOATS } from "../../store/actions.type.js";
import FilterHeader from "./components/FilterHeader.vue"

export default {
  name: "AllBoats",
  data() {
    return {
      loaderCount: 8,
      totalItemCount:0,
      type: this.$router.history.current.params["boatType"],
    };
  },
  components: {
    FilterHeader
  },
  computed: {
    ...mapGetters([
      "getAllBoats",
      "getAllBoatsLoading",
      "getAllBoatsPaginableRequestModelLimit",
    ]),
  },
  async created() {
    this.$store.commit("setBoatType", this.type);
    this.$store.state.boat.allBoats = [];
    if (this.type != "Tüm Tekneler") {
      this.$store.state.boat.allBoatsPaginableRequestModel.filterObject = {
        "bt.name": this.$store.state.boat.boatType,
      };
    } else {
      this.$store.state.boat.allBoatsPaginableRequestModel.filterObject = {};
    }
    this.$store.state.boat.allBoatsPaginableRequestModel.page = 1;
    this.$store.dispatch(FETCH_ALL_BOATS);
  },
  destroyed() {
  },
  methods: {

    async getOnScrollItem() {
      var scrollingElement = document.getElementById("getMoreBoatsWithScroll");

      var scrollResult =
        scrollingElement.scrollTop + scrollingElement.clientHeight - 200;
      this.loaderCount = 4;
      if (
       ( scrollResult >= scrollingElement.scrollHeight - 600) &&
        (this.getAllBoatsLoading == false )&& (this.totalItemCount!=this.getAllBoats.length)
      ) {
        this.$store.commit("setAllBoatsPaginableRequestModelLimit");
        this.totalItemCount = await this.$store.dispatch(FETCH_ALL_BOATS);
      }
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.boat-cards {
  width: 100% !important;
  margin: 20px auto !important;
  padding: 0 80px !important;
}
.cards_wrap {
  display: flex !important;
  flex-wrap: wrap !important;
}

.cards_wrap .card_item {
  width: 20% !important;
  padding: 10px !important;
}
@keyframes loadingEffect {
  from {
    background-color: #ddd;
  }
  to {
    background-color: #e8e9e9;
  }
}
@media (max-width: 1590px) {
  .cards_wrap .card_item {
    width: 25% !important;
  }
}

@media (max-width: 942px) {
  .cards_wrap .card_item {
    width: 50% !important;
  }
}

@media (max-width: 528px) {
  .cards_wrap .card_item {
    width: 100% !important;
  }
}

@media (max-width: 1128px) {
  .boat-cards {
    padding: 24px !important;
  }
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
</style>
