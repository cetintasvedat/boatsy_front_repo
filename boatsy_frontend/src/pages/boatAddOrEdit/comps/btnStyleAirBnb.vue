 <template>
    <button class="btnStyleAirBnb-container" v-bind:class="{ 'btnStyleAirBnb-container': !(selected==id),'btnStyleAirBnb-container-selected':(selected==id) }" @click="click(id)" >
        <div class="btnStyleAirBnb-title">
            {{title}}
        </div>
        <div class="btnStyleAirBnb-image-container" v-if="imagePath!=null">
            <img :src="imagePath" class="imageStyle"  /> 
        </div>
    </button> 
</template>
<script>


export default {

  props: {
    onClick: {
      type: Function,
      required: true
    },
    title:{
        type:String,
        required:true,
    },
    imagePath:{
        type:String,
        required:true,
    } ,
    selected:{
        type:Number,
        required:true,
    } ,
    id:{
        
        required:true,
    },

  },

  data: () => ({
    Selected:0,
    
  }),
  mounted () {
    
  },
  methods: {
      click(id){
          this.onClick(id);
      },
  }
}
</script>
<style>
    .btnStyleAirBnb-container{
       -webkit-box-align: center !important;
    -webkit-box-pack: justify !important;
    background-color: rgb(255, 255, 255) !important;
    border: 1px solid rgb(221, 221, 221) !important;
    box-sizing: border-box !important;
    border-radius: 12px !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;

    min-height: 68px !important;
    cursor: pointer !important;
    padding: 0px !important;
    outline: none !important;
    width: 80%;
    margin-top: 30px ;
    }
    .btnStyleAirBnb:hover {
    border-color: transparent !important;
    box-shadow: rgb(34 34 34) 0px 0px 0px 2px !important;
        }
    .btnStyleAirBnb-title{
    font-size: 18px !important;
    line-height: 24px !important;
    text-align: left !important;
    font-weight: 600 !important;
        text-align: left !important;
    width: 100% !important;
    color: rgb(34, 34, 34) !important;
    margin: 10px 16px !important;
    }
    .btnStyleAirBnb-image-container{
          font-size: 18px !important;
    line-height: 24px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    }
    .btnStyleAirBnb-image{
        height: 100% !important;
        width: 100% !important;
        position: static !important;
        object-fit: cover;
        vertical-align: bottom;
        border-radius: 4px;
    }
    .imageStyle{
        width: 48px;
        height: auto;
    }
    .btnStyleAirBnb-container-selected{
       -webkit-box-align: center !important;
    -webkit-box-pack: justify !important;
    background-color: rgb(255, 255, 255) !important;
    border: 1px solid rgb(221, 221, 221) !important;
    box-sizing: border-box !important;
    border-radius: 12px !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;

    min-height: 68px !important;
    cursor: pointer !important;
    padding: 0px !important;
    outline: none !important;
    width: 80%;
    margin-top: 30px ;
    border:3px solid #000 !important;
    background-color: wheat;
    }
  


</style>
