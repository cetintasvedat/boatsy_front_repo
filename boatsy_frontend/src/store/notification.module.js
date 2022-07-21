import Vue from "vue";

import {
  USER_SET_NOTIFICATIONS,
  FETCH_NOTIFICATION,
  UNREAD_NOTIFICATION,
  FETCH_NOTIFICATION_SETTING,
  SET_NOTIFICATION_SETTING
} from "./actions.type.js";
const notificationModule = {
  state: () => ({
    notificationModel: [],
    notifications: [],
    unreadNotificationCount: "",
    notificationLoading:false,
    notificationSetting:{
                        "id":0,
                        "userId":0,
                        "pushNotification":true,
                        "email":true,
                        "sms":true,
                        "insertedUser":null,
                        "updatedUser":null,
                        "dtInsert":new Date(),
                        "dtUpdate":null,
                        "rowStatus":true
                      }
  }),
  mutations: {
    setNotificationModel(state, value) {
      state.notificationModel = value;
    },
  },
  getters: {
    getNotification: (state) => {
      return state.notifications;
    },
    getUnreadMessageCount: (state) => {
      return state.notifications;
    },
    getUnreadNotificationCount: (state) => {
      return state.unreadNotificationCount;
    },
    getNotificationLoading:(state) => {
      return state.notificationLoading;
    },
    getNotificationSetting:(state)=>{
      return state.notificationSetting;
    }
  },
  actions: {
    [USER_SET_NOTIFICATIONS]: async function({ state }) {
      var data = await Vue.prototype.$notificationService.setNotification(
        state.notificationModel
      );
    },
    [FETCH_NOTIFICATION]: async function({ state }) {
      state.notificationLoading = true;
      var notifications = await Vue.prototype.$notificationService.getNotification();
      state.notifications = notifications.data;
      state.notificationLoading = false;
    },
    [UNREAD_NOTIFICATION]: async function({ state }) {
      var notifications = await Vue.prototype.$notificationService.getUnreadMessageCount();
      state.notifications = notifications.data;
    },
    [UNREAD_NOTIFICATION]: async function({ state }) {
      var notifications = await Vue.prototype.$notificationService.getUnreadMessageCount();
      state.notifications = notifications.data;
    },
    [FETCH_NOTIFICATION_SETTING]: async function({ state }) {
      var notifications = await Vue.prototype.$notificationService.getNotificationSetting();
      return notifications;
    },
    [SET_NOTIFICATION_SETTING]: async function({ state },data) {
      var notifications = await Vue.prototype.$notificationService.setNotificationSetting(data);
      return notifications;
    },
  },
};
export default notificationModule;
