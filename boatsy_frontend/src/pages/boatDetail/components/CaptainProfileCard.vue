<template>
  <div
    class="captain-profile-card row col"
    style="align-items: center; gap: 10px"
  >
    <div class="captain-user-image">
      <div class="captain-user-avatar" style="width: 64px; height: 64px">
        <img
          v-if="captainDetail.avatar == null"
          src="/assets/images/user_avatar.png"
        />
        <img :src="IMAGE_URL + captainDetail.avatar" v-else />
      </div>
    </div>
    <div class="">
      <div class="row captain-detail-owner">
        <div
          class="col captain-info"
          style="grid-auto-flow: row; justify-items: start"
        >
          <div class="captain-name">
            <!-- ><router-link :to="'/captainprofile/' + getCaptainId">-->
            <h4 class="card-detail-owner">
              {{ $t("footers_boat_owner") }}:
              {{ uppercaseLetter(captainDetail.name) }}
            </h4>
            <!-- </router-link>-->
          </div>
          <div class="captain-rate" style="display: flex; gap: 5px">
            <div class="captain-profile-icon">
              <i class="fas fa-star" style="color: #ef4036"></i>
            </div>
            <div class="captain-profile-content">
              {{
                captainRate.rate != null
                  ? parseFloat(captainRate.rate).toFixed(2)
                  : 0
              }}
              ( {{ captainRate.count }} {{ $t("map_boat_card_commentcount") }})
            </div>
          </div>
          <div
            class="captain-info-profile"
            style="display: flex; padding: 0; gap: 5px"
          >
            <div class="captain-profile-icon">
              <i class="fas fa-user-check"></i>
            </div>
            <div
              class="captain-profile-content"
              v-if="captainDetail.identityVerify == 2"
            >
              {{ $t("captain_profile_card_identity") }}
            </div>
            <div
              class="captain-profile-content"
              v-if="captainDetail.identityVerify != 2"
            >
              {{ $t("captan-profile_card") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FETCH_CAPTAIN_RATE } from "../../../store/actions.type.js";
import { mapGetters } from "vuex";
import { IMAGE_URL } from "../../../config/GlobalVariables";

export default {
  data() {
    return {
      IMAGE_URL: IMAGE_URL,

      captainRate: [],
    };
  },
  computed: {
    ...mapGetters(["getCaptainId"]),
  },
  props: ["captainDetail"],
  methods: {
    uppercaseLetter(str) {
      var parcalar = str.split(" ");
      for (var i = 0; i < parcalar.length; i++) {
        var j = parcalar[i].charAt(0).toUpperCase();
        parcalar[i] = j + parcalar[i].substr(1).toLowerCase();
      }
      return parcalar.join(" ");
    },
  },
  async created() {
    var res = await this.$store.dispatch(FETCH_CAPTAIN_RATE);
    if (!res.error) {
      this.captainRate = res.data;
    }
  },
};
</script>
<style>
.captain-user-avatar img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>