<template>
  <div  style="justify-content: center;
    align-items: center;
    padding:20px;
    display:flex;
    
    height: 90%;
    width:100%">

    <div class="" style="    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 60%;
    overflow: scroll;"
     >
            <btnStyleAirBnb v-for="item in data" :key="item.id"   :onClick="click" :title="item.name" imagePath=null :selected="selected" :id="item.id" />
              
              
            
            
      </div>
    
  

  </div>
</template>
<script>



export default {
 props: {
    onClick: {
      type: Function,
      required: true
    },
  
    selected:{
        type:Number,
        required:true,
    } ,
    

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
