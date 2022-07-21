<template>
  <div class="row book-detail-body">
    <div
      class="col-12 book-detail-content"
      style="padding-top: 10px; display: flex; padding-right: 30"
    >
      <div class="book-detail-content-body">
        <div class="book-detail-header">
          <h4>{{$t('footers_boat_owner')}}</h4>
        </div>
        <div class="book-detail-header">
          <span
            >{{ uppercaseLetter(captain.name) }}
            {{ uppercaseLetter(captain.surname) }}</span
          >
        </div>
        <div class="book-detail-header">
          <router-link :to="'/captainprofile/' + captainId"
            ><span style="text-decoration: underline; font-weight: 600"
              >{{$t('booking_captain-details-profile')}}</span
            ></router-link
          >
        </div>
      </div>
      <div class="book-detail-captain-info-image">
        <img :src="IMAGE_URL + captain.avatar" />
      </div>
    </div>
  </div>
</template>
<script>
import { IMAGE_URL } from "../../../config/GlobalVariables";

export default {
  props: ["captain","captainId"],
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
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
  },
};
</script>
