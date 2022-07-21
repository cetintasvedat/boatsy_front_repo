<template>
  <div class="container notifications" v-if="!loading">
    <div class="row notification-info-page-header">
      <div class="col-12 header-top">
        <span class="notification-one-title"
          ><router-link to="/account-settings">{{$t('login_security_bill')}}</router-link>
          <i
            class="fas fa-chevron-right"
            style="margin:10px;font-size:14px;"
          ></i>
          {{$t('notification_notifiSetting')}}
        </span>
      </div>
    </div>
    <div class="notifications-account-header">
      <h1>{{$t('notification_notifiSetting')}}</h1>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <div class="container notification-info">
          <p style="font-size:1rem">
           {{$t('notification-info')}}
          </p>
          <div class="row">
            <div class="col-6 col-md-8">
              <h6 class="notification-title">{{$t('notification_email')}}</h6>
            </div>
            <div class="col-6 col-md-4" style="text-align: center">
              <input type="checkbox" value="email" v-model="email" />
            </div>
          </div>
          <div class="row">
            <div class="col-6 col-md-8">
              <h6 class="notification-title">{{$t('notification_title')}}</h6>
            </div>
            <div class="col-6 col-md-4" style="text-align: center">
              <input
                type="checkbox"
                value="pushNotifications"
                v-model="pushNotifications"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6 col-md-8">
              <h6 class="notification-title">{{$t('notification_sms')}}</h6>
            </div>
            <div class="col-6 col-md-4" style="text-align: center">
              <input type="checkbox" value="sms" v-model="sms" />
            </div>
          </div>
          <div class="confirm-button" style="justify-content: start">
            <button
              class="notifications-button"
              v-if="loadingButton"
              style="min-width:75px"
            >
              <img src="/assets/images/loading.gif" width="25px" />
            </button>
            <button
              class="notifications-button"
              v-on:click="userNotifications()"
              v-else
            >
              {{$t('notification_rec')}}
            </button>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="container personal-info-detail">
          <div class="container personal-info-detail-style">
            <div class="row">
              <i
                class="fas fa-sms"
                style="font-size: 28px; padding: 10px; color: #ef4036"
              ></i>
            </div>
            <div class="row">
              <h2
                class="personal-info-detail-title"
                style="font-weight: bold; font-size: 17px; margin-top: 10px"
              >
                {{$t('notification-info-detail-title')}}
              </h2>
              <h2 style="font-size:1rem">
               {{$t('notification-info-detail-text')}}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container notifications loading" v-else>
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import {
  SET_NOTIFICATION_SETTING,
  FETCH_NOTIFICATION_SETTING,
} from "../../store/actions.type.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: true,
      loadingButton: false,
      email: false,
      sms: false,
      pushNotifications: false,
      notificationModel: [],
      isRead: true,
      id: 0,
    };
  },
  methods: {
    async userNotifications() {
      this.loadingButton = true;

      var payload = {
        sms: this.sms,
        email: this.email,
        pushNotification: this.pushNotifications,
        id: this.id,
      };
      var result = await this.$store.dispatch(
        SET_NOTIFICATION_SETTING,
        payload
      );
      this.loadingButton = await false;
      if (!result.error) {
        this.$swal.fire(
          "İşlem Başarılı",
          "Kaydınız başarıyla eklendi",
          "success"
        );
      } else {
        this.$swal.fire("İşlem Başarılı", result.errorMessage, "error");
      }
    },
  },
  async created() {
    var res = await this.$store.dispatch(FETCH_NOTIFICATION_SETTING);
    this.loading = await false;
    if (!res.error) {
      this.sms = res.data.sms;
      this.email = res.data.email;
      this.pushNotifications = res.data.pushNotification;
      this.id = res.data.id;
    }
  },
};
</script>

<style>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container.notifications {
  min-height: 100vh;
}
.notification-info-detail {
  padding: 10px;
  border: 1px solid silver;
  width: 500px;
  border-radius: 0.5rem;
}
@media (min-width: 424px;) {
  .notification-info-detail {
  }
}
.notification-info-detail-style {
  width: 300px;
  margin: 20px;
  text-align: left;
}
.header-top .notification-one-title {
  font-size: 16px;
  font-weight: 200;
}
.notification-radio-title {
  align-items: center;
}
.notifications-button {
  padding: 10px;
  border-radius: 0.5rem;
  background-color: #ef4036;
  color: white;
  border: transparent;
}
.notifications-button:hover {
  background-color: gray;
}
.notification-info {
  margin: 20px;
}
.notification-info h6 {
  color: black;
}
.notification-title {
  color: black;
  margin: 10px;
  margin-left: 5px;
  font-weight: bold;
}
.notification-title:hover {
  text-decoration: underline;
}
.notifications {
  text-align: start;
  padding-top: 100px;
  min-height: 80vh;
}
.notifications-account-header h1 {
  font-weight: 600;
  margin-left: 15px;
  font-size: 24px;
  margin-top: 20px;
}
</style>
