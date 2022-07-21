<template>
  <div class="host-boats-page" style="overflow:hidden">
    <div class="container-host-boats-title">
      <h1 style="font-size:2.5rem;color:white;" class="host-boats">{{$t('host-boats-title')}}</h1>
      <button class="host-boats-button">
        <h3 class="host-boats-button-title">
          <a href="https://play.google.com/store/apps/details?id=com.atilabs.boatsy&gl=TR" target="_blank">
            <h3 class="host-boats-button-title">
              {{$t('host-boats-button-title')}}
            </h3>
          </a>
        </h3>
      </button>
    </div>
    <div class="container-host-boats-body">
      <h2 class="host-boats-body">{{$t('host-boats-body')}}</h2>
      <h2 class="host-boats-body">
        {{$t('host-boats-body-two')}}
      </h2>
      <div class="row" style="margin: 30px 0; position: relative; flex-wrap: nowrap;" id="slideRow">
        <div class="col-lg-4" style="text-align: center;">
          <img src="/assets/images/how_1.png" height="300px;" width="300px;" style="margin-bottom: 30px;"/>
        </div>
        <div class="col-lg-4" style="text-align: center;">
          <img src="/assets/images/how_2.png" height="300px;" width="300px;" style="margin-bottom: 30px;"/>
        </div>
        <div class="col-lg-4" style="text-align: center;">
          <img src="/assets/images/how_3.png" height="300px;" width="300px;" style="margin-bottom: 30px;"/>
        </div>
      </div>
    </div>
    <div class="container-host-boats-footer">
      <div class="host-boats-footer-step">
        <h2 class="host-boats-footer-one">{{$t('host-boats-footer-one')}} </h2>
        <h2 class="host-boats-footer-two">{{$t('host-boats-footer-two')}} </h2>
        <h2 class="host-boats-footer-three">{{$t('host-boats-footer-three')}}</h2>
      </div>
    </div>
    <div class="container-host-boats-charter">
      <div class="row">
        <div class="col-12 col-lg-6">
          <img
            src="/assets/images/how-boats-charter.png"
            style="width: 100%;
                  object-fit: cover;"
          />
        </div>
        <div class="col-12 col-lg-6" style="display: flex;
                                            flex-direction: column;
                                            align-items: center;
                                            justify-content: center;">
          <h1 class="host-boats-charter-title">
            {{$t('host-boats-charter-title')}}
          </h1>
          <h4 class="host-small-title">
            {{$t('host-small-title')}}
          </h4>
          <button class="host-boats-charter-button">
            <h3 class="host-boats-charters">
              <a href="https://play.google.com/store/apps/details?id=com.atilabs.boatsy&gl=TR" target="_blank">
                <h3 class="host-boats-charters">{{$t('host-boats-charters')}}</h3>
              </a>
            </h3>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hostboats",
};
</script> 

<style>
.host-small-title {
  text-align: center;
  font-size: 16px;
  margin: 15px 0;
}
.host-boats-charter-title {
  font-weight: bold;
  font-size: 52px;
  text-align: center;
  color: black;
}
.host-boats-footer-one {
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 40px;
}
.host-boats-footer-two {
  color: white;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
}
.host-boats-footer-three {
  color: white;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
}
.host-boats-button-title {
  font-size: 15px;
  color: white;
  font-weight: bold;
  margin-bottom: 0 !important;
}
.host-boats-charters {
  font-size: 15px;
  color: white;
  font-weight: bold;
  margin-top: 0.5rem;
}
.host-boats-charter-button {
  word-wrap: normal;
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 0.5rem;
  background-color: #ef4036;
}
.host-boats-button {
  word-wrap: normal;
  margin-left: 15px;
  width: 250px;
  height: 50px;
  border-radius: 0.5rem;
  background-color: #ef4036;
  border: none;
}
.container-host-boats-title {
  background-image: url(/img/captain-ust.webp);
  height: 700px;
  padding: 20px;
  background-color: black;
}
.container-host-boats-footer {
  background-image: url(/img/captain-alt.webp);
  height: 700px;
  padding: 20px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container-host-boats-body {
  height: 300px;
  background-color: white;
  margin-top: 150px;
}
.container-host-boats-charter {
  background-color: white;
}
.host-boats-body {
  font-size: 45px;
  margin-left: 35px;
  font-weight: bold;
  color: rgb(22, 21, 21);
}
.host-boats {
  padding: 15px;
  font-weight: bold;
  font-size: 35px;
  color: white;
  margin-top: 156px;
}
div#slideRow{
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
}
div#slideRow::-webkit-scrollbar {
  display: none;
}
.host-boats-footer-step{
  margin-top: 155px;
}
@media (max-width: 992px) {
  .host-boats-charter-button {
    margin-bottom: 100px;
  }
  .host-boats-charter-title{
    margin-top: 100px;
  }
}
@media (max-width: 768px) {
  .host-boats-charter-title,
  .host-boats-footer-step h2,
  .host-boats-body {
    font-size: 32px;
  }
  .container-host-boats-body {
    margin-top: 50px;
  }
}
</style>