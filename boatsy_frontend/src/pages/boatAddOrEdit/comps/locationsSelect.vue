<template>
<div style="height: 100%;" >
<l-map :zoom=3  @click="addMarker" style="height: 90%;" :center="location">
  <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" ></l-tile-layer>
  <!-- IMPORTANT PART HERE -->
  <l-geosearch :options="geosearchOptions"  ></l-geosearch>
   

       <l-marker v-if="locationMarker" :latlng="locationMarker"
        
               
                :lat-lng="withPopup(locationMarker.lat, locationMarker.lng)"
              >
                <l-icon :icon-anchor="staticAnchor" class-name="someExtraClass">
                  <div
                    :id="'marker_1' "
                    class="headline"
           
                  >
                   
                    <!-- {{ item.isdaily == true ? "/Gün" : "/Saat" }} -->
                  </div>
                </l-icon>
               
             
              </l-marker>
</l-map>
</div> 
</template>

<script>
import Vue from 'vue';

import { OpenStreetMapProvider } from 'leaflet-geosearch';
import LGeosearch from 'vue2-leaflet-geosearch';
import { latLng, Icon } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
export default {
    components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeosearch,
    latLng,
    Icon
  },
  data() {
    return {
              withPopup: latLng,
        locationMarker:null,
      geosearchOptions: { // Important part Here
        provider: new OpenStreetMapProvider(),
         showMarker: true,
         howPopup: false,

         popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
  resultFormat: ({ result }) => result.label,
         marker: {
    // optional: L.Marker    - default L.Icon.Default
  
    draggable: true,
  },
    maxMarkers: 1, // optional: number      - default 1
  retainZoomLevel: false, // optional: true|false  - default false
  animateZoom: true, // optional: true|false  - default true
  autoClose: true, // optional: true|false  - default false
  searchLabel: 'Ara', // optional: string      - default 'Enter address'
  keepResult: false, // optional: true|false  - default false
  updateMap: true,

      },
    };
  },
  methods:{
      addMarker(e){
          console.log(e)
            this.locationMarker= e.latlng;
      },
  }
};
</script>