<template>
  <div class="container popular-boat-page" v-if="!getLikedBoatLoading">
    <div v-if="getLikedBoat.length > 0">
      <div class="popular-boat-page-header">
        <h1 style="font-size: 1.75rem; font-weight: bold">{{$t('header_like_boat')}}</h1>
      </div>
      <div>
        <div id="likedBoat" v-on:scroll="onLikedBoat()" class="popular-boat-list">
          <boat-cards-horizontal
            v-for="(item, index) in getLikedBoat"
            :key="index"
            :boatData="item"
          ></boat-cards-horizontal>
          <img
            v-if="scrollStatus"
            src="/assets/images/loading.gif"
            style="width: 50px; align-self: center"
          />
        </div>
      </div>
    </div>
    <div style="text-align: center" v-else>
      <h2 class="liked-boat-not-found" style="font-weight: bold; font-size: 1.5rem">
        {{$t('liked_boat_liked-boat-not-found')}}
      </h2>
      <h2 style="font-size: 1.25rem">
        {{$t('like_boat_text')}}
      </h2>
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
</template>
<script>
import { LIKED_BOAT } from "../../store/actions.type.js";
import { mapGetters } from "vuex";
export default {
  props: ["boatData"],

  data() {
    return {
      popularBoat: [],
      loading: false,
      page: 1,
      totalLikedCount: 0,
      scrollStatus: false,
    };
  },
  computed: {
    ...mapGetters(["getLikedBoat", "getLikedBoatLoading"]),
  },
  methods: {
    async onLikedBoat() {
      var scrollingElement = document.getElementById("likedBoat");
      var scrollResult = scrollingElement.scrollTop + scrollingElement.clientHeight - 100;
      if (
        scrollResult == scrollingElement.scrollHeight - 100 &&
        this.totalLikedCount != this.getLikedBoat.length
      ) {
        this.scrollStatus = true;
        this.page = this.page + 1;
        var likedCount = await this.$store.dispatch(LIKED_BOAT, this.page);
        this.totalLikedCount = likedCount;
        this.scrollStatus = false;
      }
    },
  },
  async created() {
    var likedCount = await this.$store.dispatch(LIKED_BOAT, 1);
    this.totalLikedCount = likedCount;
  },
};
</script>

<style>
.liked-boat-loading {
  width: 80px;
  position: center;
  margin: 200px;
  padding: 50px;
}
.liked-boat-not-found {
  width: 100%;
}
.popular-boat-page {
  text-align: start;
  padding-top: 120px;
  max-height: 100%;
  min-height: 80vh;
}
.popular-boat-list {
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 30px 15px 30px 15px;
  margin: 0;
  min-width: 64px;
  padding: 20px;
  padding-bottom: 75px;
  overflow-y: auto;
  height: 100%;
  height: calc(100vh - 70px);
}
.popular-boat-page-header h3 {
  font-weight: 600;
  margin-right: 15px;
  margin: -9px;
  padding-bottom: 30px;
}
</style>
