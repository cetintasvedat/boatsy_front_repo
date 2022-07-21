<template>
  <div  style="justify-content: center;
    align-items: center;
    padding:20px;
    display:flex;
    
    height: 90%;
    border:1px solid #000;
    width:100%">

     
    
   <inputStyleAirBnb label="Tekne Yılı" v-model="model.year" type="number" />



  </div>
</template>
<script>



export default {
 props: {
   model:{
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
    
  
    
    

  },
  
  
  data: () => ({
    data:[
        {id:0, name:'Kaptansız', },
        {id:1, name:'Kaptanlı', },
        {id:2, name:'Mürettebatlı', }
    ]
    
  }),
  mounted () {
    
  },
  methods: {
      click(id){
          this.onClick(id);
      }
  }
}
</script>
<style>
input[type=search]::-webkit-search-cancel-button {
  -webkit-appearance: searchfield-cancel-button;
  cursor: pointer;
}

.active{
  display: block !important;
    position: absolute;
    position: absolute!important;
    top: 100%;
    top: 100%!important;
    width: 100%;
    left: -50%;
}
</style>
