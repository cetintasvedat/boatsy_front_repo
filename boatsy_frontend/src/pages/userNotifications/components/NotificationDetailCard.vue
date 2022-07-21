<template>
  <router-link :to="id > 0 ? 'my-bookings/' + id : '/notifications'">
    <div class="notification-detail-card">
      <div class="notification-detail-card-icon">
        <i
          class="fas fa-bell"
          style="font-size: 24px; margin-top: 2px; color: #ef4036"
        ></i>
      </div>

      <div class="col-lg-5">
        <div class="notification-detail">
          <div class="notification-detail-title">
            <span>{{ $t(notificationDetail.title) }}</span>
          </div>
          <div class="notification-detail-body">
            <span>{{ $t(notificationDetail.body) }}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <div class="notification-read-date">
          <span>{{ getInsertDate(notificationDetail.dtInsert) }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: ["notificationDetail"],

  data() {
    return {
      id: 0,
    };
  },
  created() {
    var data = JSON.parse(this.notificationDetail.data);

    if (data != undefined && data.data != null) {
      if (data.type == "BOOKING_DETAIL") {
        this.id = data.data[0].bookingId;
      }
    }
  },
  methods: {
    getInsertDate(date) {
      var months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ];

      if (this.$i18n.locale != "tr") {
        months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      }
      date = date.split("-");
      var month = months[parseInt(date[1]) - 1];
      var year = date[0];
      return month + " " + year;
    },
    getBookingId() {},
  },
};
</script>

<style>
.notification-detail-card {
  display: flex;
  gap: 2em;
  width: 100%;
  padding: 10px;
}
.notification-detail-title {
  font-weight: bold;
  font-size: 15px;
}
</style>
