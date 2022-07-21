<template>
  <div class="images-upload-board">
    <draggable
      class="list-group"
      id="list-group"
      v-model="imageList"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = true"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div
          class="image-card"
          v-for="(imageSource, index) in imageList"
          :key="index"
        >
          <img :src="imageSource.url" />
          <button
            class="btn_1"
            style="border-radius: 999px; float: right; padding: 10px !important"
            @click="deleteImage(index)"
          >
            <i class="fa fa-trash"></i>
          </button>
          <button
            class="btn_1"
            style="
              background: green !important;
              border-radius: 999px;
              float: right;
              padding: 10px !important;
              right: 25px;
            "
            @click="showModal(index)"
          >
            <i class="fa fa-edit"></i>
          </button>

          <i
            v-if="imageSource.isUpload"
            class="fa fa-check fa-2x"
            style="
              color: lightgreen;
              position: absolute;
              float: left !important;
              top: 0px;
              left: 0px;
            "
          ></i>
          <i
            v-if="!imageSource.isUpload && !imageSource.error"
            class="fa fa-clock fa-2x"
            style="
              color: cornflowerblue;
              position: absolute;
              float: left !important;
              top: 0px;
              left: 0px;
            "
          ></i>
          <i
            v-if="imageSource.error"
            class="fa fa-times fa-2x"
            style="
              color: red;
              position: absolute;
              float: left !important;
              top: 0px;
              left: 0px;
            "
          ></i>
        </div>
      </transition-group>
    </draggable>
    <input
      accept="image/*"
      type="file"
      style="display: none"
      id="fileInput"
      @change="imageHandler"
    />

    <div class="add-image" @click="uploadImage">
      <div class="plus-icon">+</div>
    </div>

    <div class="col-12 cms-save-button">
      <button @click="setImage" v-if="!imageButtonLoading">Kaydet</button>
      <button v-else style="width: 90px">
        <img src="/assets/images/loading.gif" width="40px" />
      </button>
    </div>
    <modal name="edit-image-modal" height="auto">
      <div class="modal-header">
        <h4>Fotoğraf Düzenle</h4>
        <i class="fas fa-times" @click="hideModal()"></i>
      </div>
      <div class="modal-body" style="max-height: 500px">
        <cropper
          class="cropper"
          :src="currentEditImageUrl"
          :stencil-props="{
            handlers: {},
            aspectRatio: 1.333,
          }"
          @change="change"
        ></cropper>
        <div class="col-12 cms-save-button">
          <button @click="onCrop()">Kaydet</button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Vue from "vue";
import { IMAGE_URL } from "../../../../config/GlobalVariables";
import draggable from "vuedraggable";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  props: ["images", "boatId"],
  components: {
    Cropper,
    draggable,
  },
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      imageList: [],
      orderList: [],
      imageButtonLoading: false,
      currentEditImageUrl: "",
      currentEditImageIndex: 0,
      currentEditImageResult: null,
    };
  },
  created() {
    if (this.images != null) {
      this.imageList = this.images.split(";");
    }
    this.imageList.forEach((image, index) => {
      var listItem = {
        image: "",
        error: false,
        errorMessage: "",
        isUpload: true,
        path: image,
        url: this.IMAGE_URL + image,
      };
      this.imageList[index] = listItem;
    });
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    async onCrop() {
      this.$nextTick(() => {
        this.imageList[this.currentEditImageIndex].url =
          this.currentEditImageResult;
        this.imageList[this.currentEditImageIndex].image =
          this.currentEditImageResult;
      });
      this.hideModal();
    },
    showModal(index) {
      this.currentEditImageIndex = index;
      this.$nextTick(() => {
        this.currentEditImageUrl = this.imageList[index].isUpload
          ? this.imageList[index].path
          : this.imageList[index].url;
      });
      this.$modal.show("edit-image-modal");
    },
    hideModal() {
      this.$modal.hide("edit-image-modal");
    },
    change({ coordinates, canvas }) {
      this.currentEditImageResult = canvas.toDataURL();
    },
    getBase64: (file) =>
      new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function (error) {
          reject(error);
        };
      }),
    async setImage() {
      this.imageButtonLoading = true;
      var loadedImagePath = "";
      for (var i = 0; i < this.imageList.length; i++) {
        if (!this.imageList[i].isUpload) {
          var newImagePath = "";
          var requestObj = {
            boatId: this.boatId,
            publish_permission: true,
            images: this.imageList[i].image
              .replace("data:", "")
              .replace(/^.+,/, ""),
            key: i,
            name:
              "/assets/boats/" +
              this.boatId +
              "/images/boat-images-" +
              this.getRandomString() +
              "-" +
              i,
          };
          newImagePath =
            newImagePath.length > 0
              ? newImagePath + ";" + requestObj.name + ".jpeg"
              : requestObj.name + ".jpeg";
          requestObj.path = newImagePath;
          var result = await Vue.prototype.$boatService.setBoatImages(
            requestObj
          );
          if (!result.error) {
            if (i == 0) {
              loadedImagePath += result.data.path + ".jpeg";
            } else {
              loadedImagePath += ";" + result.data.path + ".jpeg";
            }
            this.imageList[i].isUpload = true;
            this.imageList[i].url = this.IMAGE_URL + result.data.path + ".jpeg";
          } else {
            this.imageList[i].error = true;
            this.imageList[i].errorMessage = result.errorMessage;
          }
        } else {
          if (i == 0) {
            loadedImagePath += this.imageList[i].path;
          } else {
            loadedImagePath += ";" + this.imageList[i].path;
          }
        }
      }
      var setImagePathRequest = {
        boatId: this.boatId,
        Image: loadedImagePath,
        publish_permission: true,
      };
      var setImagePathResult = await Vue.prototype.$boatService.setImagePath(
        setImagePathRequest
      );
      if (setImagePathResult.error) {
        this.$swal.fire(
          setImagePathResult.errorMessage,
          "Rezervasyon talebi gönderilemedi. Lürfen daha sonra tekrar deneyin.",
          "error"
        );
      } else {
        this.$swal.fire("İşlem Başarılı", "Resimler kaydedildi.", "success");
      }
      this.imageButtonLoading = false;
    },
    getRandomString() {
      var result = "";
      var characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
      var charactersLength = characters.length;
      for (var i = 0; i < 9; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    deleteImage(imageIndex) {
      this.imageList.splice(imageIndex, 1);
    },
    async uploadImage() {
      $("#fileInput").click();
    },
    async imageHandler(target) {
      var image = await this.getBase64(target.target.files[0]);
      var imageUrl = URL.createObjectURL(target.target.files[0]);
      var listItem = {
        image: image,
        error: false,
        errorMessage: "",
        isUpload: false,
        path: "",
        url: imageUrl,
      };
      this.imageList.push(listItem);
    },
  },
};
</script>
<style>
.add-image {
  cursor: pointer;
  border: 6px dotted #c7c2c2;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4/3;
  width: 20%;
}
.list-group span {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
}
.images-upload-board {
  background-color: #f1f0ef;
  padding: 30px;
  margin: 30px 30px 0 30px;
  border-radius: 15px;
}
.images-upload-board img {
  width: 100%;
  border-radius: 15px;
  aspect-ratio: 4/3;
  object-fit: cover;
}
.image-card {
  position: relative;
  aspect-ratio: 4/3;
  cursor: move;
  width: 20%;
}
.image-card .btn_1 {
  position: absolute;
  top: -13px;
  right: -13px;
  border: 3px solid #f1f0ef;
}
.plus-icon {
  color: #c7c2c2;
  font-size: 6em;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
