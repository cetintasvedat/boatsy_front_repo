<template>
  <div class="boat-comment-container" v-if="getBoatComment.length > 0">
    <div class="user-boat-comment">
      <div class="comment-content" v-for="item in getBoatComment">
          <div class="user-info">
            <div class="rev-thumb">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>
            <div class="rev-info">
              <div class="user-name">{{item.name}} {{item.surname}}</div>
              <span class="dateComment"> {{ getInsertDate(item.dtinsertdate) }}</span>
            </div>
          </div>

          <div class="rev-content">
            <div class="rev-text">
              <p class="comment-body">{{ item.body }}</p>
            </div>
            <div class="rating">
                <div class="rev-voted">
                  <i class="icon_star voted" v-for="n in parseInt(item.rate)"></i>
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  <div class="not-found-info-text" v-else> 
    <h4>{{$t('boat_comment_header')}}</h4>
    <span style="padding:20px 0">{{$t('boat_comment')}}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_BOAT_COMMENT } from "../../../store/actions.type.js";
export default {
  data() {
    return {
      name: "boat-card-comment",
      insertDate: ''
    };
  },
  computed: {
    ...mapGetters(["getBoatComment"]),
  },
  async created() {
    this.$store.commit(
      "setBoatDetailId",
      this.$router.history.current.params["boatId"]
    );

    this.$store.dispatch(FETCH_BOAT_COMMENT);
  },
  methods: {
    getInsertDate(date) {
      var months = ['Ocak', 'Şubat', 'Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
      date =  date.split("-");
      var month = months[parseInt(date[1])-1];
      var year = date[0];
      return month+' ' + year;      
    }
  }
};
</script>

<style>
.comment-content {
  display: grid;
  gap: 1rem;
  grid-auto-flow: row;
  padding-top: 30px;
  text-align: start;
  padding-right: 15px;
}

.user-info {
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
}
.user-boat-comment{
  display: grid;
  grid-template-columns: 50% 50%;
}
.user-info img {
  width:100%;
  height: auto;
}

.rev-info{
  padding-left: 10px;
}

.comment-body{
  margin-bottom: 0 !important;
}

.user-name {
  font-weight: 700;
}

@media(max-width:780px){
  .user-boat-comment{
    display: grid;
    grid-template-columns: 100%;
  }
}

</style>
