<template>
  <div class="col-12 layout d-flex justify-content-center">
    <div class="col-md-6 col-12 m-auto shadow-lg pb-3 pt-3 mb-5 bg-white rounded">
      <div class="row p-2 pl-3">
        <img src="/assets/images/boatsy.png" />
      </div>
      <div class="row mb-3 pt-2 bg-success">
        <div class="col-12 col-md-12">
          <h3 class="float-left text-white">Şifre değiştirme talebiniz alındı</h3>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 text-dark">
          <h6>
            Şifrenizi değiştirebilmeniz için e-posta adresinize bir mail gönderdik. Mail
            içeriği doğrultusunda yeni şifrenizi belirleyebilirsiniz.<br />
            İyi günler dileriz.
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ForgetPasswordSuccess",
  components: {},

  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.layout {
  min-height: 100vh;
  background-image: url(/assets/images/main_background.jpg);
  background-size: cover;
}
</style>
