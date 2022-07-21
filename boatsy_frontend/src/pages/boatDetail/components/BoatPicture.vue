<template>
  <div class="image-gallery" style="position: relative">
    <div class="light-box-container">
      <lightbox :cells="4" :items="getBoatImages(boatDetail.image)"></lightbox>
    </div>
  </div>
</template>

<script>
import { IMAGE_URL } from "../../../config/GlobalVariables";

export default {
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      images: [],
    };
  },
  props: ["boatDetail"],
  methods: {
    getBoatImages(image) {
      if (image !== undefined) {
        this.images = image.split(";");
        this.images.forEach((element, index) => {
          this.images[index] = IMAGE_URL + element;
        });
      }
      return this.images;
    },
    show(ModalName) {
      this.$modal.show(ModalName);
    },
    hide(ModalName) {
      this.$modal.hide(ModalName);
    },
  },
};
</script>

<style>
.lb-item {
  border-radius: 10px;
}
.lb-more {
  border-radius: 10px;
}
.lb-grid {
  min-height: 480px;
}

.lb-modal-close:hover,
.lb-modal-next:hover,
.lb-modal-prev:hover,
.lb-modal-close,
.lb-modal-next,
.lb-modal-prev {
  color: #fff !important;
  border-color: #fff !important;
}


.modal-body-image {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.all-image-button {
  padding: 5px 10px;
  color: #fff;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 8px;
}

.all-image-button-content {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0 25px 10px 0;
}

.full-screen-images {
  top: 0 !important;
  left: 0 !important;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100% !important;
  height: 100% !important;
  position: fixed;
  z-index: 105;
}

.full-screen-images .modal-header {
  justify-content: flex-end;
}

.boat-image-gallery:hover {
  opacity: 0.7;
}
.prev-image,
.next-image {
  position: absolute;
  font-size: 42px;
  color: #fff !important;
  font-weight: 900;
  padding: 0 20px;
  border: 1px solid #fff;
  top: 50%;
  left: calc(100% - 85px);
  border-radius: 8px;
}
.prev-image {
  top: 50%;
  left: 15px;
}

.all-image-button-content:hover,
.prev-image:hover,
.next-image:hover {
  background-color: rgba(240, 240, 240, 0.2);
}
.boat-location-map .vue2leaflet-map {
  position: relative;
}
</style>
