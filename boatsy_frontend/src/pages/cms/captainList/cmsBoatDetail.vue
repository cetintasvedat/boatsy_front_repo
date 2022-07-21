<template>
  <div class="boatDetail">
    <BoatDetailPage
      :isAdmin="true"
    ></BoatDetailPage>
  </div>
</template>
<script>
import BoatDetailPage from '../../boatDetail/boatDetail.vue';

export default {
  components:{
    BoatDetailPage
  },
  created() {
   
  },
  computed: {
 
  },
  methods: {
    changeStyle(index) {
      if (index == 0) {
        return "grid-row: span 2; grid-column: span 2; border-radius: 14px 0 0 14px";
      }
      if (index == 2) {
        return "border-radius: 0 14px 0 0";
      }
      if (index == 4) {
        return "border-radius: 0 0 14px 0";
      }
    },
  },
};
</script>
<style>
.loading-detail-container {
  height: 15px;
  margin-top: 15px;
  width: 100px;
  background-color: #ddd;
  border-radius: 5px;
  animation-name: loadingEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.loading-detail-header {
  width: 125px;
  height: 20px;
  background-color: #ddd;
  border-radius: 5px;
  animation-name: loadingEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.image-loading {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: #ddd;
  animation-name: loadingEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
</style>