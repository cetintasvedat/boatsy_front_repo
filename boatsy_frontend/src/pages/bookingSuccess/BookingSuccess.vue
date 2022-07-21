<template>
  <div
    class="container"
    style="text-align: center;
              padding-top: 80px;
              min-height:100vh;"
  >
    <div class="row booking-success" style="margin:auto">
      <div class="col-12 col-sm-3 success-icon">
        <i class="far fa-thumbs-up"></i>
      </div>
      <div class="col-12 col-sm-9 success-body">
        <h3>Rezervasyon Talebiniz İletildi.</h3>
        <span>
          Rezervasyon talebin Tekne sahibine iletilidi, 24 saat içinde geri
          dönüş yapılcaktır, rezervasyon detaylarına
          <router-link :to="'/my-bookings/' + bookingId">buradan</router-link>
          ulaşabilirsin. Tüm rezervasyonlarını görüntülemek için
          <router-link to="/my-bookings">rezervasyonlarım</router-link>
          sayfasına tıklayabilirsin.
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookingId: this.$router.history.current.params["bookingId"],
    };
  },
};
</script>
<style>
.booking-success {
  width: 60%;
  align-items: center;
  justify-content: center;
  margin: auto;
  text-align: start;
}
.success-icon i {
  font-size: 130px;
}
.success-icon {
  padding: 20px;
  text-align: center;
}
.success-body a {
  font-weight: 600;
  text-decoration: underline;
}
@media ( max-width:992px ) {
  .booking-success{
    width: 100%;
  }
  .success-icon i {
    font-size: 105px;
  }
}
</style>
