<template>
  <div class="room-card" v-bind:class="{ 'room-selected': room.room == selectedroom }">
    <div class="row">
      <div
        class="col-3"
        style="justify-content: center; align-items: start; display: flex"
      >
        <img class="rounded-circle avatar useravatar" :src="IMAGE_URL + room.avatar" />
      </div>
      <div class="col-9">
        <div class="row room-container">
          <p>
            <i class="fas fa-circle" v-if="room.isread" style="color: #18a84c"></i>
            <i class="fas fa-circle" v-if="!room.isread" style="color: #727a75"></i>
            {{ room.sendname }}
          </p>

          <p class="card-text">
            <small class="text-muted" style="padding-left: 15px">
              {{ dateCalculator(room.datetime) }}
            </small>
          </p>
        </div>
        <div class="row room-message">
          <p class="card-text">{{ room.lastmessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { IMAGE_URL } from "../../../config/GlobalVariables";

export default {
  props: ["room", "selectedroom"],
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
    };
  },

  methods: {
    dateCalculator(date) {
      var date = new Date(date);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();

      var dateNow = new Date();
      var dateNowYear = dateNow.getFullYear();
      var dateNowMonth = dateNow.getMonth();
      var dateNowDay = dateNow.getDate();
      var dateNowHour = dateNow.getHours();
      var dateNowMinute = dateNow.getMinutes();

      if ((dateNowDay - day == 0) & (dateNowMonth - month == 0)) {
        return "bugün" + hour + ":" + minute;
      } else if ((dateNowDay - day == 1) & (dateNowMonth - month == 0)) {
        return "dün " + hour + ":" + minute;
      } else if ((dateNowDay - day < 7) & (dateNowMonth - month == 0)) {
        return this.dayNumberToString(date.getDay()) + hour + ":" + minute;
      } else if (dateNowYear - year == 0) {
        return day + this.monthNumberToString(date.getMonth()) + hour + ":" + minute;
      } else {
        return day + this.monthNumberToString(date.getMonth()) + year;
      }
    },
    dayNumberToString(dayNumber) {
      if (dayNumber == 0) {
        return "Paz ";
      } else if (dayNumber == 1) {
        return "Pzt ";
      } else if (dayNumber == 2) {
        return "Salı ";
      } else if (dayNumber == 3) {
        return "Çrş ";
      } else if (dayNumber == 4) {
        return "Prş ";
      } else if (dayNumber == 5) {
        return "Cuma ";
      } else if (dayNumber == 6) {
        return "Cmt ";
      }
    },
    monthNumberToString(mountNumber) {
      if (mountNumber == 0) {
        return " Oca ";
      } else if (mountNumber == 1) {
        return " Şub ";
      } else if (mountNumber == 2) {
        return " Mar ";
      } else if (mountNumber == 3) {
        return " Nis ";
      } else if (mountNumber == 4) {
        return " May ";
      } else if (mountNumber == 5) {
        return " Haz ";
      } else if (mountNumber == 6) {
        return " Tem ";
      } else if (mountNumber == 7) {
        return " Ağu ";
      } else if (mountNumber == 8) {
        return " Eyl ";
      } else if (mountNumber == 9) {
        return " Eki ";
      } else if (mountNumber == 10) {
        return " Kas ";
      } else if (mountNumber == 11) {
        return " Ara ";
      }
    },
  },
};
</script>
<style>
.room-card {
  margin: 10px 0;
  padding: 10px;
}
.room-selected {
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: #e5effa;
}
.room-body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.avatar {
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  margin-left: 5px;
}
.room-container {
  height: 30px;
}
.fa-circle {
  margin-right: 3px;
}
.room-message {
  margin: 0px;
  padding: 0px;
}
@media (max-width: 600px) {
  .chatbox__messages {
    padding: 15px !important;
  }
  .chatbox__time {
    position: unset !important;
  }
  .chatbox__messageInput {
    padding: 0 15px !important;
    bottom: 10px !important;
    width: 100% !important;
  }
}
</style>
