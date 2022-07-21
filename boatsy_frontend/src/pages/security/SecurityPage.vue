<template>
  <body>
    <div class="container security-trusts" style="max-height:100%;">
      <h2 class="security-trust">{{$t('security-trust')}}</h2>
      <h5 class="security-title">
        {{$t('security-title')}}
      </h5>
      <div class="security-steps">
        <div class="row">
          <div class="col-md-3">
            <div class="">
              <img
                src="/assets/images/analyze.png"
                height="80px;"
                style="margin-top:40px"
              />
            </div>
            <div class="">
              <h5 class="security-risk">{{$t('security-risk')}} </h5>
              <h5>
                {{$t('security-risk-text')}}
              </h5>
            </div>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-3">
            <div class="">
              <img
                src="/assets/images/id-card.png"
                height="80px;"
                style="margin-top:40px"
              />
            </div>
            <div class="">
              <h5 class="security-document">{{$t('security-document')}}</h5>
              <h5>
                {{$t('security-document-text')}}
              </h5>
            </div>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-3">
            <div class="">
              <img
                src="/assets/images/shield.png"
                height="80px;"
                style="margin-top:40px"
              />
            </div>
            <div class="">
              <h5 class="security-pay">{{$t('security-pay')}}</h5>
              <h5>
                {{$t('security-pay-text')}}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <hr class="solid" />
      <div class="row" style="padding-bottom: 30px; align-items: center;">
        <div class="col-md-6">
          <div class="security-help">
            <h2 class="security-help-title">{{$t('security-help-title')}}</h2>
            <h2 class="security-help-title">{{$t('security-help-title2')}}</h2>
            <h5 class="security-help-body">
             {{$t('security-help-body')}}
            </h5>

            <h5 class="security-help-footer">
              {{$t('security-help-footer')}}
            </h5>
          </div>
        </div>
        <div class="col-md-6">
          <div class="security-image">
            <img src="/assets/images/help_desk.png" style="width: 100%; border-radius: 50%;" />
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "trustsecurity",
};
</script> 

<style>
.solid {
  margin-top: 100px;
}
.security-trusts hr{
  padding-bottom: 30px !important;
  border-bottom: 1px solid #bbb !important;
  border-top: none !important;
}
.security-help {
  margin-top: 50px;
}
.security-image {
  margin-top: 50px;
}
.security-help-footer {
  margin-top: 30px;
}
.security-help-body {
  max-width: 500px;
  margin-top: 30px;
}
.security-help-title {
  font-weight: bold;
  font-size: 40px;
  color: rgb(72, 72, 72);
}
.security-risk {
  font-weight: bold;
  margin-top: 25px;
}
.security-document {
  margin-top: 25px;
  font-weight: bold;
}
.security-pay {
  margin-top: 25px;
  font-weight: bold;
}
.work-title {
  margin-top: 100px;
  font-weight: bold;
}
.security-trust {
  margin-top: 75px;
  font-weight: bold;
  font-size: 35px;
  color: rgb(72, 72, 72);
}
</style>