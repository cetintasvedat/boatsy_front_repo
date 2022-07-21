<template>
  <div class="captain-list-container">
    <div class="payment-button" style="text-align: end; margin-bottom:20px;">
      <button @click="show">Tekne Ekle</button>
    </div>
      <button v-if="nested!=null&&nested!=undefined " class="btn btn-xs btn-link -nested-dsp-row-close-btn" style="position:absolute; top:0"
      @click="nested.$toggle(false)">
      <i  style="color:red" class="fa fa-times fa-lg"></i>
    </button>
    <div>
        <datatable v-bind="$data" >
        </datatable>
    </div>
    <div class="loading-image-datatable" v-if="loading">
        <img
          
          src="/assets/images/loading.gif"
          style="width:100px; heigth:100px"
        />
        </div>
     <button  id="btnBoatListReflesh" @click="handleQueryChange()" style="display:none">
    yenile
  </button>
  <add-new-boat-modal></add-new-boat-modal>
  </div>
 
</template>
<script>
import Vue from 'vue'
import { mapGetters } from "vuex";
import addNewBoat from "./comps/addNewBoat.vue";
import { FETCH_BOAT_TYPE } from "../../../store/actions.type";
export default {
   
  name: 'BoatTable', // `name` is required as a recursive component
  props: ['row','nested'], // from the parent FriendsTable (if exists)
  data () {
    const amINestedComp = !!this.row
    return {
       loading:false,
      supportBackup: true,
      supportNested: true,
   
    tblClass: 'table-bordered',
      HeaderSettings:false,
      pageSizeOptions: [5, 10, 15, 20],
      columns: (() => {
        const cols = [
          { title: 'id', field: 'id',  sortable: true, visible: 'true',thComp: 'thFilterInt',colClass: 'w-240' },
          { title: 'İsim', field: 'name', visible: true, thComp: 'thFilter', colClass: 'w-240' },
          { title: 'Tekne Markası', field: 'brandName',  colClass: 'w-240',thComp: 'thFilter' },
          { title: 'Tekne Tipi', field: 'boatTypeId',  colClass: 'w-240',thComp: 'thFilterSelectBox',tdComp:"tdBoatType" },
          { title: 'Mürettebat Tipi', field: 'captain',  colClass: 'w-240',thComp: 'thFilterSelectBox',tdComp:"tdBoatPersonerType" },
          { title: 'Kapasitesi', field: 'personCapacity',  colClass: 'w-240', tdComp:"tdPersoncapacity" },
          { title: 'Açıklama', field: 'description', colClass: 'w-240'  , tdComp: 'tdDesc'},
          
          { title: 'İlçe', field: 'cState',  colClass: 'w-240' },
          { title: 'İl', field: 'cCountry',  colClass: 'w-240' },
          { title: 'Adres', field: 'address',  colClass: 'w-240'  , tdComp: 'tdDesc'},
   
          { title: 'Belgeler', tdComp: 'tdBoatDocuments', visible: 'true' },
          { title: 'Status', field: 'boatStatus',  colClass: 'w-240', tdComp:'tdBoatStatus',thComp:"thFilterBoatStatus" },
          { title: 'Yıl', field: 'year',sortable: false, visible: true,  colClass: 'w-240' },
          { title: 'Eklenme Tarihi', field: 'dtInsert', sortable: true, colClass: 'w-240', tdComp: 'tdCreatetime' ,thComp:'thFilterDateRange' },
          { title: 'Son Güncelleme Tarihi', field: 'dtUpdate', sortable: true, colClass: 'w-240', tdComp: 'tdCreatetime',thComp:'thFilterDateRange' },
        { title: 'İşlemler', tdComp: 'tdBoatOpt', visible: 'true'   }
        ]
       
        const groupsDef = {
          Normal: ['Email', 'Username', 'Country', 'IP'],
          Sortable: ['UID', 'Age', 'Create time'],
          Extra: ['Operation', 'Color', 'Language', 'PL']
        }
        return cols.map(col => {
           
          Object.keys(groupsDef).forEach(groupName => {
            if (groupsDef[groupName].includes(col.title)) {
              col.group = groupName
            }
          })
          return col
        })
      })(),
      data: [],
      total: 0,

      summary: {},
      // `query` will be initialized to `{ limit: 10, offset: 0, sort: '', order: '' }` by default
      // other query conditions should be either declared explicitly in the following or set with `Vue.set / $vm.$set` manually later
      // otherwise, the new added properties would not be reactive
      query: amINestedComp ? { uid: this.row.friends } : {},
      // any other staff that you want to pass to dynamic components (thComp / tdComp / nested components)
      xprops: {
        eventbus: new Vue()
      }
    }
  },
  components:{
    "add-new-boat-modal" : addNewBoat
  },
  watch: {
    query: {
      handler () {
        this.handleQueryChange()
      },
      deep: true
    }
  },
  mounted:async function(){
  },
  methods: {
    handleQueryChange: async function () {
        this.loading=true;
        var tempQuery=this.query;
        if(this.row!=null && this.row!=undefined){
          this.$set(tempQuery, "userId", this.row.id) 


        }
       var data=await Vue.prototype.$cmsService.getBoatList(tempQuery)
       this.data = data.data.rows;
            this.total=data.data.total;
            this.loading=false;
      
    },
    alertSelectedUids () {
      alert(this.selection.map(({ uid }) => uid))
    },
    show(){
      this.$modal.show("new-boat-modal")
    }
  },
  computed:{
     ...mapGetters(["getBoatTypes"]),
  },
  async created(){
   if(this.getBoatTypes.length<1){
    this.$store.dispatch(FETCH_BOAT_TYPE)}
  }
}
</script>
<style>
.w-240 {
  width: 120px;
}
.captain-list-container{
    margin-top: 60px;
    padding: 20px;
    display: flex;
  flex-direction: column;
    justify-content: center;
    align-content: center;
    background: #f5f5f5;
    position: relative;
   
}
.loading-image-datatable{
    width:  100%;
    height:500px;
     display: flex;
    justify-content: center;
    align-content: center;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top:0;
    left: 0;
    z-index: 10;
}
.-table-footer::-webkit-scrollbar ,.table-striped::-webkit-scrollbar  {
  width: 10px;
}

/* Track */
.-table-footer::-webkit-scrollbar-track ,.table-striped::-webkit-scrollbar-track  {
  background: #f1f1f1;
}

/* Handle */
.-table-footer::-webkit-scrollbar-thumb,.-table-footer::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.-table-footer::-webkit-scrollbar-thumb:hover,.-table-footer::-webkit-scrollbar-thumb :hover{
  background: #555;
}

</style>

