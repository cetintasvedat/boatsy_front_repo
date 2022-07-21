<template>
  <div
    class="dashboard-container container container-custom"
    style="margin-top: 120px; min-height: 100vh"
  >
    <div class="dashboard-row row">
      <div class="dashboard-col col-lg-4 col-md-6 col-6">
        <div class="small-box-wp" style="background: #f1931b">
          <div class="small-box-top d-flex">
            <div class="small-box-icon">
              <img src="img/icons/customer.png" alt="" />
            </div>
            <div class="inner">
              <p>{{ paidBookingsCount.data }}</p>
              <p>{{ $t("paid-reservation") }}</p>
            </div>
          </div>
          <router-link to="/cms/bookings">
            <div
              class="small-box-footer"
              style="background: rgba(0, 0, 0, 0.1)"
            >
              {{ $t("more-info") }} <i class="fas fa-arrow-circle-right"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div class="dashboard-col col-lg-4 col-md-6 col-6">
        <div class="small-box-wp" style="background: #720017">
          <div class="small-box-top d-flex">
            <div class="inner">
              <p>{{ bookingPendingPaymentCount.data }}</p>
              <p>{{ $t("reservation-pending-payment") }}</p>
            </div>
            <div class="small-box-icon">
              <img src="img/icons/customer.png" alt="" />
            </div>
          </div>
          <router-link to="/cms/bookings">
            <div
              class="small-box-footer"
              style="background: rgba(0, 0, 0, 0.1)"
            >
              {{ $t("more-info") }} <i class="fas fa-arrow-circle-right"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div class="dashboard-col col-lg-4 col-md-6 col-6">
        <div class="small-box-wp" style="background: #0294a5">
          <div class="small-box-top d-flex">
            <div class="small-box-icon">
              <img src="img/icons/customer.png" alt="" />
            </div>
            <div class="inner">
              <p>{{ paidBookingsCount.data }}</p>
              <p>{{ $t("reservation-pending-confirmation") }}</p>
            </div>
          </div>
          <router-link to="/cms/bookings">
            <div
              class="small-box-footer"
              style="background: rgba(0, 0, 0, 0.1)"
            >
              {{ $t("more-info") }} <i class="fas fa-arrow-circle-right"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div class="dashboard-col col-lg-4 col-md-6 col-6">
        <div class="small-box-wp" style="background: #1b6535">
          <div class="small-box-top d-flex">
            <div class="small-box-icon">
              <img src="img/icons/customer.png" alt="" />
            </div>
            <div class="inner">
              <p>{{ approvedBoatCount.data }}</p>
              <p>{{ $t("approved-boats") }}</p>
            </div>
          </div>
          <router-link to="/cms/boat/list">
            <div
              class="small-box-footer"
              style="background: rgba(0, 0, 0, 0.1)"
            >
              {{ $t("more-info") }} <i class="fas fa-arrow-circle-right"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div class="dashboard-col col-lg-4 col-md-6 col-6">
        <div class="small-box-wp" style="background: #500472">
          <div class="small-box-top d-flex">
            <div class="small-box-icon">
              <img src="img/icons/customer.png" alt="" />
            </div>
            <div class="inner">
              <p>{{ unapprovedBoatCount.data }}</p>
              <p>{{ $t("boats-pending-approval") }}</p>
            </div>
          </div>
          <router-link to="/cms/boat/list">
            <div
              class="small-box-footer"
              style="background: rgba(0, 0, 0, 0.1)"
            >
              {{ $t("more-info") }} <i class="fas fa-arrow-circle-right"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div class="dashboard-col col-lg-4 col-md-6 col-6">
        <div class="small-box-wp" style="background: #1f1641">
          <div class="small-box-top d-flex">
            <div class="small-box-icon">
              <img src="img/icons/customer.png" alt="" />
            </div>
            <div class="inner">
              <p>{{ boatsWithMissingDocumentsCount.data }}</p>
              <p>{{ $t("boats-with-missing-documents") }}</p>
            </div>
          </div>
          <router-link to="/cms/boat/list">
            <div
              class="small-box-footer"
              style="background: rgba(0, 0, 0, 0.1)"
            >
              {{ $t("more-info") }} <i class="fas fa-arrow-circle-right"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div class="dashboard-col col-lg-4 col-md-6 col-6">
        <div class="small-box-wp" style="background: #f1931b">
          <div class="small-box-top d-flex">
            <div class="small-box-icon">
              <img src="img/icons/customer.png" alt="" />
            </div>
            <div class="inner">
              <p>{{ captainCount.data }}</p>
              <p>Kaptan Sayısı</p>
            </div>
          </div>
          <router-link to="/cms/captain/list">
            <div
              class="small-box-footer"
              style="background: rgba(0, 0, 0, 0.1)"
            >
              {{ $t("more-info") }} <i class="fas fa-arrow-circle-right"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div class="dashboard-col col-lg-4 col-md-6 col-6">
        <div class="small-box-wp" style="background: #720017">
          <div class="small-box-top d-flex">
            <div class="small-box-icon">
              <img src="img/icons/customer.png" alt="" />
            </div>
            <div class="inner">
              <p>{{ userCount.data }}</p>
              <p>Kullanıcı Sayısı</p>
            </div>
          </div>
          <router-link to="/cms/captain/list">
            <div
              class="small-box-footer"
              style="background: rgba(0, 0, 0, 0.1)"
            >
              {{ $t("more-info") }} <i class="fas fa-arrow-circle-right"></i>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      attachedClass: false,
      unapprovedBoatCount: 0,
      approvedBoatCount: 0,
      boatsWithMissingDocumentsCount: 0,
      paidBookingsCount: 0,
      bookingPendingPaymentCount: 0,
      pendingBookingCount: 0,
      captainCount: 0,
      userCount: 0,
    };
  },
  async created() {
    [
      this.unapprovedBoatCount,
      this.approvedBoatCount,
      this.boatsWithMissingDocumentsCount,
      this.paidBookingsCount,
      this.bookingPendingPaymentCount,
      this.pendingBookingCount,
      this.captainCount,
      this.userCount,
    ] = await Promise.all([
      Vue.prototype.$boatService.getUnapprovedBoatCount(),
      Vue.prototype.$boatService.getApprovedBoatCount(),
      Vue.prototype.$boatService.getBoatsWithMissingDocumentsCount(),
      Vue.prototype.$bookService.getPaidBookingsCount(),
      Vue.prototype.$bookService.getBookingPendingPaymentCount(),
      Vue.prototype.$bookService.getPendingBookingCount(),
      Vue.prototype.$boatService.getCaptainCount(),
      Vue.prototype.$boatService.getUsersCount(),
    ]);
  },
  methods: {
    imgInc() {},
  },
};
</script>

<style scoped>
.small-box-wp {
  margin-bottom: 10px;
  border-radius: 7px;
}

.small-box-icon img {
  position: absolute;
  top: 25px;
  right: 30px;
  z-index: 0;
  transition: transform 0.3s linear;
  color: rgba(0, 0, 0, 0.15) !important;
}

.inner {
  padding: 10px 0 0 10px;
  color: whitesmoke;
  height: 120px !important;
  width: 100% !important;
}

.inner p:first-child {
  margin-bottom: 0 !important;
  font-size: 2.5rem;
}

.inner p:last-child {
  font-size: 1rem;
  position: relative;
  z-index: 1;
  padding-right: 50px;
}

.small-box-footer {
  text-align: center;
  padding: 6px;
  cursor: pointer;
  font-weight: 700;
  color: whitesmoke;
}

.small-box-footer:hover {
  background-color: rgba(0, 0, 0, 0.35) !important;
}

@media (max-width: 767px) {
  .inner p:last-child {
    font-size: 1.2rem !important;
  }
}

@media (max-width: 591px) {
  .dashboard-container {
    margin-top: 40px !important;
  }
}

@media (max-width: 576px) {
  .small-box-icon img {
    display: none;
  }

  .inner {
    padding-left: 0 !important;
    text-align: center !important;
  }

  .inner p:last-child {
    text-align: center !important;
    padding-right: 0 !important;
  }

  .inner p:first-child {
    text-align: center !important;
    margin-bottom: 10px !important;
  }
}

@media (max-width: 413px) {
  .inner p:last-child {
    font-size: 1rem !important;
  }
}
</style>
