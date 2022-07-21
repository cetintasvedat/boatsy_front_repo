<template>
  <div>
    <modal name="add-new-booking-modal" :height="500" :width="500">
      <div v-if="!newBooking">
        <div class="modal-header">
          <h5>Rezervasyon Oluştur</h5>
          <i class="fas fa-times" @click="hide('add-new-booking-modal')"></i>
        </div>
        <div class="modal-body row">
          <div class="col-12" style="margin-bottom: 16px">
            <span style="font-weight: bold">Seçili Tarihler: </span> {{ dates }}
          </div>
          <div class="col-md-6 mb-3">
            <label style="float: left">Rezervasyon Durumu</label>
            <select
              class="form-control"
              style="border: 1px solid silver"
              v-model="bookingRequest.bookingStatus"
            >
              <option value="0">Talep Kabul Edilmedi</option>
              <option value="1">Rezervasyon Talebi</option>
              <option value="2">Talep Kabul Edildi</option>
              <option value="3">Ödeme Tamamlandı</option>
              <option value="100">Rezervasyon Tamamlandı</option>
              <option value="200">Rezervasyon İptal Talebi</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label style="float: left">Kullanıcı ID</label>
            <input
              type="number"
              class="form-control"
              v-model="bookingRequest.userId"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label style="float: left">Misafir Sayısı</label>
            <input
              type="number"
              class="form-control"
              v-model="bookingRequest.personCapacity"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label style="float: left">Kullanıcı E-Mail</label>
            <input
              type="text"
              class="form-control"
              v-model="bookingRequest.userEmail"
            />
          </div>
          <div class="col-md-12 mb-3">
            <label style="float: left">Rezervasyon Notu</label>
            <textarea
              type="number"
              class="form-control"
              v-model="bookingRequest.notes"
            />
          </div>
          <div class="col-12 cms-save-button">
            <button @click="createBooking" v-if="!loadingButton">
              Oluştur
            </button>
            <button v-else style="width:90px;">
              <img src="/assets/images/loading.gif" width="40px" />
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="modal-header">
          <h5>Rezervasyon Başarılı</h5>
          <i class="fas fa-times" @click="hide('add-new-booking-modal')"></i>
        </div>
        <div class="modal-body row">
          <div class="col-12" style="margin-bottom: 16px">
            <span style="font-weight: bold">Rezervasyon Ödeme Linki : </span>
            {{ bookingLink }}
          </div>
        </div>
        <div class="col-12 cms-save-button">
          <button @click="copyLink">
            Kopyala
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import format from "date-fns/format";
import { FETCH_BOOKING, FETCH_DISABLED_DATES } from "../../../../store/actions.type";
import { mapGetters } from "vuex";
export default {
  props: ["dates","dailyPrice"],
  data() {
    return {
      bookingLink: "https://boatsy.net/payment/public/",
      loadingButton: false,
      newBooking: false,
      dateAndPriceList: [],
      bookingRequest: {
        startDate: "",
        endDate: "",
        notes: "",
        personCapacity: 1,
        boatId: this.$router.history.current.params["boatId"],
        userId: 79,
        bookingStatus: 1,
        userEmail: "info@boatsy.net",
        dateAndPriceList: {}
      },
    };
  },
  watch: {
    getStartDate: function () {
      this.differentPriceChecker();
    },
    getEndDate: function () {
      this.differentPriceChecker();
    },
  },
  async created() {
    var boatId = this.$router.history.current.params["boatId"];
    await this.$store.dispatch(FETCH_DISABLED_DATES, boatId);
    this.differentPriceChecker();
  },
  methods: {
    hide(ModalName) {
      this.$modal.hide(ModalName);
    },
    copyLink() {
      navigator.clipboard.writeText(this.bookingLink);
    },
    async createBooking() {
      this.loadingButton = true;
      this.bookingRequest.startDate = this.getStartDate;
      this.bookingRequest.endDate = this.getEndDate;
      this.bookingRequest.dateAndPriceList = this.dateAndPriceList

      this.$store.commit("setBookingModel", this.bookingRequest);
      this.bookingResponse = await this.$store.dispatch(FETCH_BOOKING);
      this.loadingButton = false;

      if (this.bookingResponse.error == false) {
        var bookingId = this.bookingResponse.data.bookingId;
        this.bookingLink += `${bookingId}-${this.bookingResponse.data.reservationCode}`;
        this.newBooking = true;
      } else {
        this.error = "İşlem Başarısız";
        this.$swal.fire(
          this.error,
          "Rezervasyon talebi gönderilemedi. Lürfen daha sonra tekrar deneyin.",
          "error"
        );
      }
    },
    differentPriceChecker() {
      this.dateAndPriceList = [];
      var startDate = new Date(this.getStartDate);
      var endDate = new Date(this.getEndDate);
      var dayDiff = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10);
      var tempDate = new Date(startDate);
      var bookingDayList = [tempDate];

      for (var i = 0; i < dayDiff; i++) {
        tempDate = new Date(
          tempDate.getFullYear(),
          tempDate.getMonth(),
          tempDate.getDate() + 1
        );
        bookingDayList.push(new Date(tempDate));
      }
      bookingDayList.forEach((bookingDayListElement) => {
        var resultFind = this.getDifferencePriceList.find(
          (x) =>
            x.date.getFullYear() +
              "" +
              x.date.getMonth() +
              "" +
              x.date.getDate() ==
            bookingDayListElement.getFullYear() +
              "" +
              bookingDayListElement.getMonth() +
              "" +
              bookingDayListElement.getDate()
        );
        if (resultFind != undefined) {
          this.dateAndPriceList.push({
            price: resultFind.price,
            date: format(resultFind.date,"DD-MM-YYYY")
          });
        } else {
          this.dateAndPriceList.push({
            price: parseInt(this.dailyPrice),
            date: format(bookingDayListElement,"DD-MM-YYYY")
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters(["getStartDate", "getEndDate","getDifferencePriceList"]),
  },
};
</script>
