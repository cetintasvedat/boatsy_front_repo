<template>
  <div class="container captain-profile" v-if="!loading">
    <div class="captain-profile-left">
      <div class="captain-profile-left-content">
        <div class="col">
          <div class="captain-profile-image">
            <img
              class="captain-avatar-style"
              style="margin-right: 10px; border-radius: 5rem"
              :src="IMAGE_URL + getCaptainDetail.avatar"
            />
          </div>
          <div class="captain-profile-info" v-if="getCaptainDetail.rosette != null">
            <div class="captain-profile-icon">
              <i class="fas fa-anchor"></i>
            </div>
            <div class="captain-profile-content">{{$t('filter_header_super_captain')}}</div>
          </div>
          <div class="captain-profile-info">
            <div class="captain-profile-icon">
              <i class="fas fa-star" style="color: #ef4036"></i>
            </div>
            <div class="captain-profile-content">
              {{
                captainRate.rate != null ? parseFloat(captainRate.rate).toFixed(2) : 0
              }}
              ( {{ captainRate.count }} {{$t('map_boat_card_commentcount')}} )
            </div>
          </div>
          <h6 class="captain-name-profile-security">{{$t('user_profile_profile-security')}}</h6>

          <div class="captain-profile-info" v-if="getCaptainDetail.identityVerify == 2">
            <div class="captain-profile-icon">
              <i class="fas fa-user-check"></i>
            </div>
            <div class="captain-profile-content">{{$t('captain_profile_card_identity')}}</div>
          </div>

          <div class="captain-profile-info" v-if="getCaptainDetail.emailVerify == 2">
            <div class="captain-profile-icon">
              <i class="fas fa-at"></i>
            </div>
            <div class="captain-profile-content">{{$t('captain_profile_card_email')}}</div>
          </div>

          <div class="captain-profile-info" v-if="getCaptainDetail.phoneVerify == 2">
            <div class="captain-profile-icon">
              <i class="fas fa-phone-volume"></i>
            </div>
            <div class="captain-profile-content">{{$t('captain_profile_card_phone')}}</div>
          </div>

          <h6 class="captain-profile-security">
            {{$t('user_profile_securty')}}
            <router-link to="/trust/security"
              ><h6 class="captain-profile-security-footer">
                {{$t('user_profile_add')}}
              </h6></router-link
            >
          </h6>
        </div>
      </div>
    </div>
    <div class="captain-profile-right">
      <div class="captain-detail">
        <h2 class="captain-name">
          {{$t('about_captain_captain-name')}}{{ uppercaseLetter(getCaptainDetail.name) }}
          {{ uppercaseLetter(getCaptainDetail.surname) }}
        </h2>
      </div>
      <div class="captain-detail">
        <h2 class="captain-date" style="font-size: 16px; color: gray">
          {{ convertDate(getCaptainDetail.dtInsert) }} {{$t('about_captain_captain-date')}}
        </h2>
      </div>
      <div class="captain-detail-about">
        <h2 class="captain-about">{{$t('about_captain_captain-about')}}</h2>
        <p>{{ getCaptainDetail.aboutMe }}</p>
      </div>
      <div class="captain-detail-comments">
        <captain-comment></captain-comment>
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
import { IMAGE_URL } from "../../config/GlobalVariables";

import { mapGetters } from "vuex";
import { FETCH_CAPTAIN_DETAIL } from "../../store/actions.type.js";
export default {
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      captainRate: [],
      loading: false,
    };
  },
  props: ["boatData"],
  computed: {
    ...mapGetters(["getCaptainDetail", "getCaptainBoats"]),
  },
  methods: {
    convertDate(date) {
      if (date != "" && date != undefined && date != null) {
        return date.split("-")[0];
      } else {
        return date ?? "";
      }
    },
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
    this.$store.commit("setCaptainId", this.$router.history.current.params["userId"]);
    var res = await this.$store.dispatch(FETCH_CAPTAIN_DETAIL);

    if (!res.error) {
      this.loading = false;
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
  padding: 30px;
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
.settings-button-card{
  height: 100%;
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
}
@media (min-width: 1200px) {
  .captain-profile {
    max-width: 1300px;
  }
}
</style>
