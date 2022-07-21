<template>
  <div class="boat-card-detail-header">
    <div class="row owner">
      <div class="col-md-12 boat-detail-boat-type">
        <div
          class="card-detail-boatname"
          style="display: flex; gap: 8px; flex-wrap: wrap"
        >
          {{ parseInt(boatDetail.boatheight) }}m
          {{ $t(boatDetail.boattypename) }}
          {{ boatCabinCount() }} - #{{ parseInt(boatDetail.id) + 1000 }}
        </div>
      </div>
    </div>
    <div class="row detail-header">
      <div class="col-12 col-sm-8 boat-detail">
        <div class="fas fa-star fa-lg"></div>
        <div class="header-detail">
          <span
            class="card-detail-score"
            v-if="boatDetail.commentavarage != null"
          >
            {{ doubleConverter(boatDetail.commentavarage) }} (
            {{ boatDetail.commentcount }} {{$t('boat_detail_header_comment')}})</span
          >
          <span class="card-detail-score" v-else>
            0 (
            {{ boatDetail.commentcount }} {{$t('boat_detail_header_comment')}})</span
          >
        </div>
        <div class="fas fa-anchor fa-lg" v-if="rosette != null"></div>
        <div class="header-detail" v-if="rosette != null">
          <span class="card-detail-captainrole">
            {{ rosette }}
          </span>
        </div>
        <div class="fa fa-map-marker fa-lg"></div>
        <div class="header-detail">
          <span class="card-detail-location">
            {{ boatDetail.state }}, {{ boatDetail.city }}
          </span>
        </div>
      </div>

      <div class="col-4 buttons">
        <a
          v-on:click="shareBoatFunc()"
          style="display: flex; align-items: center"
        >
          <div class="fas fa-share-alt fa-lg"></div>
          <div class="header-detail" style="padding-left: 0.8em">
            <span class="card-detail-share">{{$t('boat_details_header_share')}}</span>
          </div>
        </a>
        <a
          v-on:click="likeBoatFunc(boatDetail.id)"
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
    </div>
  </div>
</template>

<script>
import { SET_LIKE_BOAT } from "../../../store/actions.type.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "boat-card-detail-header",
      likedBoat: this.boatDetail.boatlike,
    };
  },
  props: ["boatDetail", "rosette"],
  computed: {
    ...mapGetters(["getProfileModel"]),
  },
  methods: {
    async likeBoatFunc(id) {
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
    boatCabinCount() {
      var cabinCount =
        this.boatDetail.doubleroom +
        this.boatDetail.masterroom +
        this.boatDetail.salonroom +
        this.boatDetail.singleroom +
        this.boatDetail.twinroom;
      if (cabinCount > 0) {
        return cabinCount + " " +  this.$i18n.t("cabin");
      } else {
        return "";
      }
    },
    doubleConverter(value) {
      return parseFloat(value).toFixed(1);
    },
    shareBoatFunc() {
      var url =
        "https://boatsy.net/boats/" +
        this.boatDetail.boattypename +
        "-" +
        this.boatDetail.state +
        "-" +
        this.boatDetail.city +
        "-" +
        this.boatDetail.id;
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
.fas.fa-share-alt,
.fas.fa-star,
.far.fa-heart,
.fas.fa-anchor,
.fa.fa-map-marker {
  color: #ef4036;
}

.card-detail-boatname {
  font-size: 22px;
  font-weight: 300;
}
.card-detail-boatname i {
  font-size: 8px;
  color: #2c3e50;
}
.dot-container {
  display: flex;
  align-items: center;
}
.detail-header {
  padding-bottom: 15px;
}

.boat-detail-boat-type,
.buttons,
.boat-detail {
  display: grid;
  grid-auto-flow: column;
  gap: 0.8em;
  justify-content: start;
  align-items: center;
  justify-items: center;
}

.buttons {
  justify-content: end !important;
}

.buttons span,
.boat-detail span {
  color: #000;
  font-family: ;
}

.boat-detail-boat-type {
  justify-content: start !important;
}
</style>


