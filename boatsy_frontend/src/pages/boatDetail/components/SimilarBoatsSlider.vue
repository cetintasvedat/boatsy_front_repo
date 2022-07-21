<template>
  <div class="similar-boats">
    <VueSlickCarousel v-bind="sliderSettings" v-if="getAllBoats.length > 0">
      <template #prevArrow="arrowOption">
        <div class="custom-arrow">
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>
      <template #nextArrow="arrowOption">
        <div class="custom-arrow">
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>
      <div
        v-for="(item, index) in getAllBoats"
        :key="index"
        class="similar-boats-slider"
      >
        <boat-card-vertical :boatData="item"></boat-card-vertical>
      </div>
    </VueSlickCarousel>
    <div class="boat-group loading-popular-boat" v-else>
      <div class="card_item" v-for="i in 4">
        <div class="card-inner" style="aspect-ratio: 4/3"></div>
        <div class="head">
          <h4 style="height: 20px; margin-top: 15px; width: 75%"></h4>
        </div>
        <div class="title">
          <h4 style="height: 20px; margin-top: 15px; width: 40%"></h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import { FETCH_ALL_BOATS } from "../../../store/actions.type.js";

import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  props: ["boatType"],
  data() {
    return {
      sliderSettings: {
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2,
              autoplay: true,
            },
          },
        ],
      },
    };
  },
  components: {
    VueSlickCarousel,
  },
  computed: {
    ...mapGetters(["getAllBoats"]),
  },
  async created() {
    this.$store.state.boat.allBoatsPaginableRequestModel.filterObject = {
      "bt.name": this.boatType,
    };

    this.$store.state.boat.allBoatsPaginableRequestModel.page = 1;
    await this.$store.dispatch(FETCH_ALL_BOATS, true);
  },
};
</script>
<style>
.similar-boats .slick-slider.slick-initialized {
  padding: 0 8px;
}
.similar-boats .card-inner {
  padding-right: 7px;
  padding-left: 7px;
}
@media (max-width: 480px) {
  .similar-boats .slick-prev:before,
  .similar-boats .slick-next:before {
    display: none;
  }
}
</style>