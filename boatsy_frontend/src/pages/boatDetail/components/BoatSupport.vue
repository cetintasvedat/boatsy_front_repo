<template>
  <div class="support-container">
    <div class="support-header" style="padding-top: 32px">
      <h4 class="answer-support" style="text-align: start">{{$t('boat_support_answer-support')}}</h4>
    </div>
    <div class="support-body">
      <div class="support-body-text">
       {{$t('boat_support_body-text')}}
      </div>
      <div class="support-body-button" style="padding-bottom: 32px;">
        <button v-on:click="sendMessage" v-if="getProfileModel.id>0">{{$t('boat_support_signIn-modal')}}</button>
        <button v-on:click="show('non-auth-send-booking-modal')" v-else>{{$t('boat_support_signIn-modal')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { SET_MESSAGE_FOR_BOAT_SUPPORT } from "../../../store/actions.type";
export default {
  props: ["boatData", "loading"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getProfileModel'])
  },
  methods: {
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    },
    async sendMessage() {
      var data = {
        link:
          "boats/" +
          this.boatData.boattypename +
          "-" +
          this.boatData.state +
          "-" +
          this.boatData.city +
          "-" +
          this.boatData.id,
        boatId: this.boatData.id,
      };
      this.loading(true);
      var result = await this.$store.dispatch(SET_MESSAGE_FOR_BOAT_SUPPORT, data);
      if (!result.error) {
        this.$router.push({
          name: "Message",
          params: {
            room: ".79.." + JSON.parse(localStorage.getItem("profileModel")).id + ".",
          },
        });
        this.loading(false);
      } else {
      }
    },
  },
};
</script>

<style>
.support {
  text-align: start;
}
.support-body {
  font-size: 16px;
}
.support-body-text {
  padding-bottom: 20px;
  text-align: start;
}
.support-body-button button {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #000;
  background-color: #fff;
}
</style>
