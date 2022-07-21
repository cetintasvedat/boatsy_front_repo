<template>
  <body>
    <div class="container boatsy-works" style="max-height:100%">
      <h1 class="how-boatsy-works">{{$t('how_boatsy_work_title')}}</h1>
      <div class="row boatsy-work-one" style="padding:10px;">
        <div class="col-12 col-md-6">
          <img
            class="howboatsywork-image-1"
            src="/assets/images/howboatsywork-1.jpg"
            width="400px"
          />
        </div>
        <div class="col-12 col-md-6">
          <h4 class="work-title"> {{$t('how_boatsy_work_one')}} </h4>
          <h2 class="work-titles" style="font-size:1.5rem;">
            {{$t('how_boatsy_work_titles')}}
          </h2>
        </div>
      </div>
      <div class="row boatsy-work-two" style="padding:10px;">
        <div class="col-12 col-md-6">
          <h4 class="work-title">{{$t('how_boatsy_work_two')}}</h4>
          <h2 class="work-titles" style="font-size:1.5rem;">
            {{$t('how_boatsy_work_two-title')}}
          </h2>
        </div>
        <div class="col-12 col-md-6">
          <img src="/assets/images/howboatsywork-2.jpg" height="300px;" />
        </div>
      </div>
      <div class="row boatsy-work-three" style="padding:10px;">
        <div class="col-12 col-md-6">
          <img src="/assets/images/howboatsywork-3.jpg" height="350px;" />
        </div>
        <div class="col-12 col-md-6">
          <h4 class="work-title">{{$t('how_boatsy_work_three')}}</h4>
          <h2 class="work-titles" style="font-size:1.5rem;">
            {{$t('how_boatsy_work_three-title')}}
          </h2>
        </div>
      </div>
      <div class="row boatsy-work-four" style="padding:10px;">
        <div class="col-12 col-md-6">
          <h4 class="work-title">{{$t('how_boatsy_work_four')}}</h4>
          <h2 class="work-titles" style="font-size:1.5rem;">
            {{$t('how_boatsy_work_four-title')}}
          </h2>
        </div>
        <div class="col-12 col-md-6">
          <img src="/assets/images/howboatsywork-4.png" height="250px;" />
        </div>
      </div>
      <hr class="solid" />
      <h2 class="col boatsy-work-help" style="padding-top: 30px">
        {{$t('how_boatsy_work_help')}}
      </h2>
      <h2 class="col boatsy-work-help">{{$t('how_boatsy_work_helps')}}</h2>
      <div class="row col" style="margin-bottom: 30px">
        <div class="col-12 col-md-4">
          <div class="row">
            <img
              src="/assets/images/5_health.png"
              height="50px;"
              style="margin-top:40px"
            />
          </div>
          <div class="row">
            <h5 class="howworks-health">{{$t('how_boatsy_work_health')}}</h5>
            <h5>
              {{$t('how_boatsy_work_health-text')}}
            </h5>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="row">
            <img
              src="/assets/images/7_support.png"
              height="50px;"
              style="margin-top:40px"
            />
          </div>
          <div class="row">
            <h5 class="howworks-support">{{$t('how_boatsy_work-support')}}</h5>
            <h5>
              {{$t('how_boatsy_work-support-text')}}
            </h5>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="row">
            <img
              src="/assets/images/6_cancel.png"
              height="50px;"
              style="margin-top:40px"
            />
          </div>
          <div class="row">
            <h5 class="howworks-cancel">{{$t('how_boatsy_work_cancel')}}</h5>
            <h5>
             {{$t('how_boatsy_work_cancel-text')}}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "howboatsyworks",
};
</script> 

<style>
.howworks-health {
  font-weight: bold;
  margin-top: 25px;
}
.howworks-support {
  margin-top: 25px;
  font-weight: bold;
}
.howworks-cancel {
  margin-top: 25px;
  font-weight: bold;
}
.boatsy-work-help {
  font-weight: bold;
  margin-left: -15px;
  font-size: 35px;
}
.work-title {
  margin-top: 100px;
  font-weight: bold;
}
.container .boatsy-works {
  max-width: 600px;
}
.how-boatsy-works {
  margin-top: 75px;
  font-weight: bold;
  font-size: 35px;
  text-align: center;
  padding: 20px;
}
@media (max-width:991px) {
  .boatsy-work-two,
  .boatsy-work-three,
  .boatsy-work-four,
  .boatsy-work-one {
    align-items: center;
    margin-bottom: 30px;
  }
  .boatsy-work-two img,
  .boatsy-work-three img,
  .boatsy-work-four img,
  .boatsy-work-one img{
    width: 100%;
  }
  .work-title{
    margin-top: 0 !important;
  }
}
</style>