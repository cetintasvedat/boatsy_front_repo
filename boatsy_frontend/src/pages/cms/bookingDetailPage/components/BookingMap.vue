<template>
     <div class="row book-detail-body">
        <div class="col-12 book-detail-header">
            <h4>Oraya Giderken</h4>
        </div>
        <div class="col-12 row map-container"> 
            <l-map
                style="height: 480px"
                :zoom="zoom"
                :center="getLatLng(booking.lat, booking.lng)"
                >
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :lat-lng="getLatLng(booking.lat, booking.lng)"></l-marker>
            </l-map>
        </div>
        <div class="col-12 row book-detail-content"> 
            <div class="col-12 book-detail-content-header">
                <span style="font-weight:600">{{booking.state}}, {{booking.city}}</span></br>
                <span>{{booking.adress}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { latLng } from "leaflet";

export default {
  props : ['booking'],
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 10,
      loadingButton: false,
    };
  },
  methods: {
    getLatLng(Lat, Lng) {
        return [Lat, Lng];
    },
  }
}
</script>