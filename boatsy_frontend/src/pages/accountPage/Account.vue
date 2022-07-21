<template>
  <div class="container account-page">
    <div class="row account-page-header">
      <div class="col-12 top-header">
        <h1 style="font-size: 1.25rem">{{$t('login_security_bill')}}</h1>
      </div>
      <div class="col-12 bottom-header">
        <span
          >{{ changeName(getProfileModel.name) }}, {{ getProfileModel.email }} ·
        </span>
        <span class="account-your-profile">
          <router-link
            :to="'/userProfile/' + getProfileModel.id"
            v-if="getProfileModel.userGroupId == 2"
          >
            {{$t('account_go_profile')}}</router-link
          ></span
        >
        <router-link
          :to="'/captainprofile/' + getProfileModel.id"
          v-if="getProfileModel.userGroupId == 1"
        >
          <span>{{$t('account_go_profile')}}</span></router-link
        >
        <hr solid />
      </div>
    </div>
    <div class="account-page-button-cards">
      <router-link to="/account-settings/personal-info">
        <div class="settings-button-card">
          <div class="button-card-icon">
            <i class="fas fa-id-card-alt" style="font-size: 22px"></i>
          </div>
          <div class="button-card-header">
            <h2 style="font-size: 18px; font-weight: bold">{{$t('account_personel_ınformation')}}</h2>
          </div>
          <div class="button-card-title">
            <span>{{$t('account_personel_ınformation_contact')}}</span>
          </div>
        </div>
      </router-link>
      <router-link to="/account-settings/login-and-security">
        <div class="settings-button-card">
          <div class="button-card-icon">
            <i class="fas fa-user-lock" style="font-size: 22px"></i>
          </div>
          <div class="button-card-header">
            <h2 style="font-size: 18px; font-weight: bold">{{$t('account_login_security')}}</h2>
          </div>
          <div class="button-card-title">
            <span>{{$t('account_password_security')}}</span>
          </div>
        </div>
      </router-link>

      <router-link to="/notification/setting">
        <div class="settings-button-card">
          <div class="button-card-icon">
            <i class="fas fa-bullhorn" style="font-size: 22px"></i>
          </div>
          <div class="button-card-header">
            <h2 style="font-size: 18px; font-weight: bold">{{$t('header_notification')}}</h2>
          </div>
          <div class="button-card-title">
            <span
              >{{$t('account_notification_option')}}</span
            >
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getProfileModel"]),
  },
  methods: {
    changeName(name) {
      if (name.includes(" ")) {
        const names = name.split(" ");
        const newName = names.map(function (word) {
          var letter = word.charAt(0).toUpperCase();
          return letter + word.substring(1);
        });
        return newName.join(" ");
      } else {
        var letter = name.charAt(0).toUpperCase();
        return letter + name.substring(1);
      }
    },
  },
};
</script>

<style>
.account-your-profile {
  margin-left: 0px;
  font-weight: bold;
  color: #ef4036;
}
.account-your-profile:hover {
  text-decoration: underline;
}
.account-page {
  text-align: start;
  margin-top: 120px;
  min-height: 100vh;
}
.top-header h5 {
  font-weight: 600;
}
.bottom-header span {
  font-size: 16px;
}
.account-page-button-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3em;
  padding-bottom: 40px;
}
.account-page-header {
  padding-bottom: 40px;
}
.settings-button-card {
  padding: 30px 30px;
  border-radius: 8px;
  box-shadow: 1px 1px 10px #ddd;
}
.settings-button-card i {
  margin-bottom: 16px;
  color: #ef4036;
}
.button-card-header h6 {
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 18px;
}
.button-card-header h6:hover {
  text-decoration: underline;
}
.button-card-title {
  font-size: 16px;
  margin-bottom: 16px;
}
@media (max-width: 992px) {
  .account-page-button-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .account-page-button-cards {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
