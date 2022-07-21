<template>
  <div class="booking-card">
    <div class="booking-card-image">
      <router-link :to="'my-bookings/' + bookDetail.id">
        <img :src="IMAGE_URL + defaultImage(bookDetail.image)" />
      </router-link>
    </div>
    <div class="booking-body">
      <router-link :to="'my-bookings/' + bookDetail.id">
        <div class="boat-adress">
          <span>{{ bookDetail.address }}</span>
        </div>

        <div class="book-detail-captain-name">
          <span
            >{{ uppercaseLetter(bookDetail.captainname) }}
            {{ uppercaseLetter(bookDetail.captainsurname) }}</span
          >
        </div>
        <div class="book-detail-date">
          <div class="book-detail-start-date">
            <span>{{$t('boat_reservation_start-date')}} </span>{{ changeDateFormat(bookDetail.startdate) }}
            <br>
            <span>{{$t('boat_reservation_end-date') }}</span>{{ changeDateFormat(bookDetail.enddate) }}
          </div>
        </div>
        <hr solid />
        <div class="book-state">
          <span>{{ $t(bookingStatus[bookDetail.bookingstatus]+'') }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { IMAGE_URL } from "../../../config/GlobalVariables";
import format from "date-fns/format";

export default {
  props: ["bookDetail"],

  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      bookingStatus: {
        0: "Rezervasyon reddedildi.",
        1: "Rezervasyon gönderildi.",
        2: "Rezervasyon kabul edildi.",
        3: "Ödeme tamamlandı.",
        100: "Rezervasyon bitirildi.",
        200: "Rezervasyon iptal gönderildi.",
      },
    };
  },
  methods: {
    uppercaseLetter(str) {
      var parcalar = str.split(" ");
      for (var i = 0; i < parcalar.length; i++) {
        var j = parcalar[i].charAt(0).toUpperCase();
        parcalar[i] = j + parcalar[i].substr(1).toLowerCase();
      }
      return parcalar.join(" ");
    },
    defaultImage(image) {
      if (image == null || image == undefined || image == "") {
        return "";
      } else {
        return image.split(";")[0];
      }
    },
    changeDateFormat(date) {
      if(date != undefined) {
        return format(date.split(" ")[0],'DD.MM.YYYY')
      }
    }
  },
  created() {},
};
</script>

<style>
.booking-card {
  display: flex;
  gap: 1.5em;
  width: 100%;
}
.booking-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  width: 60%;
}

.book-detail-start-date span,
.book-detail-captain-name {
  font-weight: 600;
  color: #333;
  margin-top: 10px;
}
.boat-adress {
  margin-top: 5px;
}
.boat-adress:hover {
  text-decoration: underline;
}
.booking-card-image {
  width: 40%;
}
.booking-card-image img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  aspect-ratio: 4/3;
  object-fit: cover;
}
</style>
