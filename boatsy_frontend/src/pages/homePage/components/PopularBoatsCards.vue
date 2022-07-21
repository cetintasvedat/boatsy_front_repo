<template>
    <div v-if="popularBoats.length > 0" style="padding-right:10px;padding-left:10px">
        <VueSlickCarousel v-bind="sliderSettings">
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
          <div v-for="(item, index) in popularBoats" :key="index" class="popular-boats-slider">
            <boat-card-vertical :boatData="item"></boat-card-vertical>
          </div>
        </VueSlickCarousel>
    </div>

    <!-- LOADING EFFECT -->
    <div class="boat-group loading-popular-boat" v-else>
        <div class="card_item" v-for="i in 4">
            <div
            class="card-inner"
            ></div>
            <div class="head">
            <h4></h4>
            </div>
            <div class="title">
            <h4
            ></h4>
            </div>
        </div>
    </div>
</template>
<script>
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import VueSlickCarousel from "vue-slick-carousel";

export default {
    props: ["popularBoats"],
    components: {
        VueSlickCarousel
    },
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
                        },
                    },  
                ],
            },
        }
    }
}
</script>
<style>
.loading-popular-boat .head,
.loading-popular-boat .title,
.loading-popular-boat .card-inner {
    background-color: #ddd ;
    border-radius: 3% ;
    animation-name: loadingEffect ;
    animation-duration: 1s ;
    animation-iteration-count: infinite;
}
.loading-popular-boat .head {
    height: 20px;
    margin-top: 15px;
    width: 75%;
}
.loading-popular-boat .title { 
    height: 20px;
    margin-top: 15px;
    width: 40%;
}
.loading-popular-boat .card-inner {
    aspect-ratio: 4/3;
}
@keyframes loadingEffect {
  from {
    background-color: #ddd;
  }
  to {
    background-color: #e8e9e9;
  }
}
</style>