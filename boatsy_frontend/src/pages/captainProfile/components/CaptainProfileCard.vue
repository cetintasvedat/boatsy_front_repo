<template>
  <div class="captain-profile-left-content">
    <div class="">
      <div class="captain-profile-image">
        <img
          class="captain-avatar-style"
          style="margin-right: 10px; border-radius: 5rem"
          :src="IMAGE_URL + avatar"
          onerror="this.onerror=null;this.src='http://boatsy.net/assets/images/user_avatar.png';"
        />
      </div>
      <div class="captain-profile-info" v-if="rosette != null">
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
            captainRate.rate != null
              ? parseFloat(captainRate.rate).toFixed(2)
              : 0
          }}
          ( {{ captainRate.count }} {{$t('map_boat_card_commentcount')}} )
        </div>
      </div>
      <h6 class="captain-name-profile-security">
        {{ uppercaseLetter(name) }} {{$t('captain_profile_ok')}}
      </h6>

      <div class="captain-profile-info" v-if="identityVerify == 2">
        <div class="captain-profile-icon">
          <i class="fas fa-user-check"></i>
        </div>
        <div class="captain-profile-content">{{$t('captain_profile_card_identity')}}</div>
      </div>

      <div class="captain-profile-info" v-if="emailVerify == 2">
        <div class="captain-profile-icon">
          <i class="fas fa-at"></i>
        </div>
        <div class="captain-profile-content">{{$t('captain_profile_card_email')}}</div>
      </div>

      <div class="captain-profile-info" v-if="phoneVerify == 2">
        <div class="captain-profile-icon">
          <i class="fas fa-phone-volume"></i>
        </div>
        <div class="captain-profile-content">{{$t('captain_profile_card_phone')}}</div>
      </div>

      <h6 class="captain-profile-security">
        Hesabınızı doğrulamanın Boatsy topluluğunu güvende tutmaya nasıl
        yardımcı olduğu hakkında
        <router-link to="/trust/security"
          ><h6 class="captain-profile-security-footer">
            daha fazla bilgi edinin.
          </h6></router-link
        >
      </h6>
    </div>
  </div>
</template>

<script>
import { IMAGE_URL } from "../../../config/GlobalVariables";

export default {
  props: [
    "avatar",
    "rosette",
    "captainRate",
    "name",
    "identityVerify",
    "emailVerify",
    "phoneVerify",
  ],
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
    };
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
};
</script>
