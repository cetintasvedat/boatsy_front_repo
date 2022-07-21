<template>
  <div class="container">
    <!--UPLOAD-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Upload images</h1>
      <div class="dropbox">
        <input
          type="file"
          multiple
          :name="uploadFieldName"
          :disabled="isSaving"
          @change="
            filesChange($event.target.name, $event.target.files);
            fileCount = $event.target.files.length;
          "
          accept="image/*"
          class="input-file"
        />
        <p v-if="isInitial">
          {{$t('image_upload')}} <br />
          {{$t('image_upload_option')}}
        </p>
        <p v-if="isSaving">Resimler yükleniyor</p>

        <li v-for="item in uploadedFiles">
          <img
            :src="item.url"
            class="img-responsive img-thumbnail"
            :alt="item.originalName"
          />
        </li>
      </div>
    </form>
    <!--SUCCESS-->
    <div v-if="isSuccess">
      <ul class="list-unstyled">
        <li v-for="item in uploadedFiles">
          <img
            :src="item.url"
            class="img-responsive img-thumbnail"
            :alt="item.originalName"
          />
        </li>
      </ul>
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Uploaded failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos",
      fileCount: 0,
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    async save(file) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      var data = {
        name: "fieldName." + file.type.split("/")[1],
        boatId: file.name,
        key: 0,
      };
      const reader = new FileReader();
      await reader.readAsDataURL(file);
      reader.onload = async function () {
        var base64 = reader.result;
        data["images"] = base64.replace("data:", "").replace(/^.+,/, "");
        var res = await Vue.prototype.$boatService.uploadImage(data);

        if (!res.error) {
          this.uploadedFiles = [].concat(res.data.path);
          this.currentStatus = STATUS_SUCCESS;
        } else {
          this.uploadError = res.errorMessage;
          this.currentStatus = STATUS_FAILED;
        }
      }.bind(this);
    },
    async filesChange(fieldName, fileList) {
      // handle file changes

      if (!fileList.length) return;

      Array.from(Array(fileList.length).keys()).map((x) => {
        this.save(fileList[x]);
      });
      // save it
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<style lang="scss">
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
