<template>
<div class="boat-add-container">

    <div class="boat-add-left-container">
    </div>
    <div class="boat-add-right-container">
      
        <boatType :selected="boatType" :onClick="boatTypeClick" v-if="widgetIndex==1"  /> 
         <imageUpload :selected="boatInfo" :onClick="boatTypeClick" v-if="widgetIndex==0" :model="boatInfo" />
         <locationsSelect :selected="boatInfo" :onClick="boatTypeClick" v-if="widgetIndex==3" :model="boatInfo" />
        <boatInfo :selected="boatInfo" :onClick="boatTypeClick" v-if="widgetIndex==2" :model="boatInfo" />   

         <progress-bar size="tiny" bar-color="#ef4036" :val="progressRatio"  style="width:100%" /> 
          <div class="boat-add-right-container-tool">
                <div class="boat-add-right-container-btn-container">
                    <button aria-label="Önceki adıma geri dön"  type="button" class="boat-add-right-container-btn-back">{{$t('boat_add_or_edit_back')}}</button>
                </div>
                <div class="_dt53i0">
                    <button type="button" class="boat-add-right-container-btn-next">{{$t('boat_add_or_edit_next')}}</button>
                </div>
        </div>
       
   
    </div>
</div>
</template>
<script>
import ProgressBar from 'vue-simple-progress'
import { mapGetters } from "vuex";

import { FETCH_BOAT_TYPE } from "../../store/actions.type";
export default {
    name:"boatAddOrEdit",
     components: {
    ProgressBar
  },
  
 data () {
  
    return {
        loading:false,
        boatType:0,
        progressRatio:0,
        widgetIndex:0,
        boatInfo:{
      year: {
      type: Number,
      required: true
    },
      description: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    material: {
      type: String,
      required: true
    },
    hp:{
      type: Float32Array,
      required: true
    },
    sail:{
      type: Float32Array,
      required: true
    },
    draft:{
      type: Float32Array,
      required: true
    },
    waterCapacity:{
      type: Float32Array,
      required: true
    },
    fuelCapacity:{
      type: Float32Array,
      required: true
    },
    length:{
      type: Float32Array,
      required: true
    },
    minRateTime:{
      type: Number,
      required: true
    },
   }
    }
},
 async created(){
    if(this.getBoatTypes.length<1){
    this.$store.dispatch(FETCH_BOAT_TYPE)}
  },
methods: {
    boatTypeClick(id){
        this.boatType=id;
    },
    next(){
        this.widgetIndex=this.widgetIndex+1;
    },
    back(){
        if(this.widgetIndex!=0){
            this.widgetIndex=this.widgetIndex-1
        }
       
    }
  },
  computed:{
     ...mapGetters(["getBoatTypes"]),
  }
};
</script>
<style >
.boat-add-container{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
}
.boat-add-left-container {
    background-image: url(/vueassets/img/b3.4ffc0bd4.jpg);
    background-position: center;
    background-size: cover;
    width: 50%;
    height: 100%;
}
.boat-add-right-container{
    display: flex;
    flex-direction: column;
    width: 50%;
}
.boat-add-right-container-tool{
    -webkit-box-align: center !important;
    -webkit-box-pack: justify !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding-top: 16px !important;
    padding-bottom: 16px !important;
    padding-top: 16px !important;
     padding: 10px;
}
.boat-add-bar-container{
    -webkit-box-align: center !important;
    display: flex !important;
    align-items: center !important;
   

}
.boat-add-right-container-btn-container{
   

}
.boat-add-right-container-btn-back{
     border-radius: 10px;
      padding: 10px;
    color: black;
    text-decoration: underline;
    border: 0px;
    background-color: transparent;
    font-weight: 700;
    font-size: 16px;
}
.boat-add-right-container-btn-next{
     border-radius: 10px;
     color:white;
    border: 0px;
    padding: 10px;
      font-weight: 700;
    background-color: #222222;
    
    font-size: 16px;
}
.boat-add-right-container-btn-back:hover {
    border: none !important;
    background: #F7F7F7 !important;
    color: #000000 !important;
}
.boat-add-right-container-btn-next:hover {
    border: none !important;
    background: #000000 !important;
    color: #FFFFFF !important;
}
</style>
