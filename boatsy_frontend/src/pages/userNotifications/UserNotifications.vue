<template>
  <div class="container notifications" v-if="!getNotificationLoading">
    <div v-if="getNotification.length > 0">
      <div class="notifications-header">
        <h1 style="font-size:1.75rem;font-weight:bold;">{{$t('header_notification')}}</h1>
      </div>
      <!-- <div class="row notification-radio" style="margin-left:10px;">
        <div class="col-lg-2">
          <input
            type="radio"
            name="notificationRadio"
            v-on:click="readNotifications()"
          />
          <span class="notification-radio-title">Okunanlar</span>
        </div>
        <div class="col-lg-10">
          <input
            type="radio"
            name="notificationRadio"
            v-on:click="unreadNotifications()"
          />
          <span class="notification-radio-title">Okunmayanlar</span>
        </div>
      </div> -->
      <hr
        class="notification-solid"
        style="width:500px;margin-left:20px;"
        solid
      />
      <div class="row">
        <div class="col-lg-7">
          <div class="notification-list">
            <div v-for="(element, index) in getNotification" :key="index">
              <NotificationDetailCard
                :notificationDetail="element"
              ></NotificationDetailCard>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center" v-else>
      <h4 class="notification-page-not-found" style="font-weight:bold;">
        {{$t('user_notifications_not_found')}}
      </h4>
      <h5>{{$t('user_notifications_not_found2')}}</h5>
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
import NotificationDetailCard from './components/NotificationDetailCard.vue'
import {
  USER_SET_NOTIFICATIONS,
  FETCH_NOTIFICATION,
  UNREAD_NOTIFICATION,
} from "../../store/actions.type.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      sms: "",
      pushNotifications: "",
      notificationModel: [],
      isRead: true,
    };
  },
  components: {
    NotificationDetailCard
  },
  computed: {
    ...mapGetters(["getNotification", "getNotificationLoading"]),
  },
  methods: {
    userNotifications() {
      this.notificationModel.sms = this.sms != "" ? true : false;
      this.notificationModel.email = this.email != "" ? true : false;
      this.notificationModel.pushNotifications =
        this.pushNotifications != "" ? true : false;

      this.$store.commit("setNotificationModel", this.notificationModel);
      this.$store.dispatch(USER_SET_NOTIFICATIONS);
    },
    readNotifications() {
      this.isRead = true;
    },
    unreadNotifications() {
      this.isRead = false;
    },
  },
  async created() {
    this.$store.dispatch(FETCH_NOTIFICATION);
  },
};
</script> 

<style>
.notification-radio-title {
  align-items: center;
}
.notifications-button {
  padding: 8px;
  border-radius: 0.5rem;
  background-color: #ef4036;
  color: white;
  border: transparent;
}
.notifications-button:hover {
  background-color: gray;
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
.notifications-header h3 {
  font-weight: 600;
  margin-left: 20px;
}
</style>