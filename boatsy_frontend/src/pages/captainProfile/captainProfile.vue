<template>
  <div class="container captain-profile" v-if="!loading">
    <div class="captain-profile-left">
      <CaptainProfileCard
        :avatar="getCaptainDetail.avatar"
        :rosette="getCaptainDetail.rosette"
        :captainRate="captainRate"
        :name="getCaptainDetail.name"
        :identityVerify="getCaptainDetail.identityVerify"
        :phoneVerify="getCaptainDetail.phoneVerify"
        :emailVerify="getCaptainDetail.emailVerify"
      ></CaptainProfileCard>
    </div>
    <div class="captain-profile-right">
      <AboutCaptain
        :name="getCaptainDetail.name"
        :dtInsert="getCaptainDetail.dtInsert"
        :aboutTitle="getCaptainDetail.aboutMe"
        :spokenLanguage="getCaptainDetail.spokenLanguage"
      ></AboutCaptain>
      <div class="captain-detail-boats">
        <div class="captain-detail-boats-header">
          {{ uppercaseLetter(getCaptainDetail.name) }}{{$t('captain_profile_boat')}}
        </div>

        <div class="captain-boats">
          <div v-for="(item, index) in getCaptainBoats" :key="index">
            <boat-card-vertical :boatData="item"></boat-card-vertical>
          </div>
        </div>
      </div>
      <div class="captain-detail-comments">
        <CaptainComment></CaptainComment>
      </div>
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
import { mapGetters } from "vuex";
import CaptainProfileCard from "./components/CaptainProfileCard";
import CaptainComment from "./components/CaptainComment";
import AboutCaptain from "./components/AboutCaptain";
import {
  FETCH_CAPTAIN_DETAIL,
  FETCH_CAPTAIN_BOAT,
  FETCH_CAPTAIN_RATE,
} from "../../store/actions.type.js";
export default {
  data() {
    return {
      captainRate: [],
      loading: false,
    };
  },
  components: {
    CaptainProfileCard,
    CaptainComment,
    AboutCaptain,
  },
  computed: {
    ...mapGetters(["getCaptainDetail", "getCaptainBoats"]),
  },
  methods: {
    uppercaseLetter(str) {
      if (str != "" && str != undefined && str != null) {
        var parcalar = str.split(" ");
        for (var i = 0; i < parcalar.length; i++) {
          var j = parcalar[i].charAt(0).toUpperCase();
          parcalar[i] = j + parcalar[i].substr(1).toLowerCase();
        }
        return parcalar.join(" ");
      } else {
        return str ?? "";
      }
    },
  },
  async created() {
    this.loading = true;
    this.$store.commit(
      "setCaptainId",
      this.$router.history.current.params["userId"]
    );
    this.$store.dispatch(FETCH_CAPTAIN_DETAIL);
    var resBoats = await this.$store.dispatch(FETCH_CAPTAIN_BOAT);
    var res = await this.$store.dispatch(FETCH_CAPTAIN_RATE);
    if (!res.error && !resBoats) {
      this.loading = false;
      this.captainRate = res.data;
    }
  },
};
</script>
<style>
.captain-profile {
  min-height: 100vh;
}
.captain-profile-security {
  padding: 30px;
  border-radius: 0.5rem;
  width: 250px;
  text-align: left;
  font-size: 15px;
}
.captain-name-profile-security {
  padding: 30px;
  border-radius: 0.5rem;
  text-align: left;
  font-size: 22px;
  color: #333;
  font-weight: bold;
}
.captain-profile-security-footer {
  font-size: 15px;
  text-decoration: underline;
  color: black;
}
.captain-profile-security-footer:hover {
  color: black;
  font-weight: bold;
}
.captain-detail-comments {
  padding-bottom: 48px;
}
.captain-profile {
  padding-top: 80px !important;
}

.captain-profile-image img {
  width: 128px;
  height: 128px;
}
.captain-profile-image {
  padding: 24px 0;
  text-align: center;
}
.captain-profile-icon {
  align-items: center;
  display: grid;
  justify-content: center;
  justify-items: center;
}
.captain-profile-icons {
  display: grid;
  justify-content: center;
  justify-items: center;
}
.captain-profile-info {
  display: grid;
  grid-template-columns: 20% 80%;
  text-align: start;
  font-size: 16px;
  padding: 20px !important;
}
.captain-detail-boats-header {
  padding: 24px 0;
  font-size: 24px;
}
.captain-boats {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 1.2em;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
}
.captain-detail-languages,
.captain-detail-location {
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  justify-content: center;
}
.captain-detail-languages {
  padding-bottom: 24px;
}
.captain-profile-left {
  padding: 24px;
}
.captain-profile-right {
  text-align: start;
  padding-top: 24px;
}
.captain-detail-languages {
  border-bottom: 1px solid #ddd;
}
.captain-date {
  padding-bottom: 30px;
}
@media (min-width: 1130px) {
  .captain-profile {
    display: grid;
    grid-template-columns: 25% 75%;
    padding-top: 80px;
  }
  .captain-profile-left-content {
    border: 1px solid #ddd;
    border-radius: 12px;
  }
}
@media (max-width: 1130px) {
  .captain-profile-image {
    grid-row: span 3;
  }
  .captain-profile-content {
    align-items: center;
    display: grid;
  }
  .captain-profile-right,
  .captain-profile-left,
  .captain-profile-security,
  .captain-name-profile-security,
  .captain-profile-info {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
}
@media (min-width: 1200px) {
  .captain-profile {
    max-width: 1300px;
  }
}
</style>
