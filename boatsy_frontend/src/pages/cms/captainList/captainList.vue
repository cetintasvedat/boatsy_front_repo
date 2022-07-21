<template>
  <div class="captain-list-container">
     <div style="margin: 0 auto; width:100%">
    <datatable v-bind="$data" >
    </datatable>
     </div>
    <div class="loading-image-datatable" v-if="loading">
        <img
          
          src="/assets/images/loading.gif"
          style="width:100px; heigth:100px"
        />
        </div>
          <button  id="btnCaptainListReflesh" @click="handleQueryChange()" style="display:none">
          </button>
  </div>
</template>
<script>
import Vue from 'vue'


export default {

  name: 'FriendsTable', // `name` is required as a recursive component
  props: ['row'], // from the parent FriendsTable (if exists)
  data () {
    const amINestedComp = !!this.row
    return {
        loading:false,
      supportBackup: true,
      supportNested: true,
        
  
    tblClass: 'table-bordered',
      tblStyle: 'color: #666; font-size:5px!important',
      HeaderSettings:false,
      pageSizeOptions: [5, 10, 15, 20],
      columns: (() => {
        const cols = [
          { title: 'id', field: 'id',  sortable: true, visible: 'true',thComp: 'thFilterInt',colClass: 'w-240', },
          { title: 'Adı', field: 'name', visible: true, thComp: 'thFilter', colClass: 'w-240'},
          { title: 'SoyAdı', field: 'surname', visible: true, thComp: 'thFilter', ccolClass: 'w-240'},
          { title: 'Rozet', field: 'rosette',  thComp: 'thFilter',colClass: 'w-240' },
          { title: 'E-posta', field: 'email', visible: true, thComp: 'thFilter', tdComp: 'tdEmail' ,colClass: 'w-240' },
          { title: 'Telefon Numarası', field: 'phoneNumber',  colStyle:"font-size:9px", colClass: 'w-240',thComp: 'thFilter' },
          { title: 'TC', field: 'identificationNumber', visible: true, thComp: 'thFilter', colClass: 'w-240' },
          { title: 'Vergi No', field: 'taxNumber', visible: true, thComp: 'thFilter', colClass: 'w-240' },
          { title: 'Şirket', field: 'companyName', visible: true, thComp: 'thFilter', colClass: 'w-240' },
          { title: 'Telefon Dogrulaması', field: 'phoneVerify',  colClass: 'w-240',tdComp: 'tdStatus',thComp: 'thFilterStatus'},
          { title: 'Kimlik Dogrulaması', field: 'identityVerify',  colClass: 'w-240',tdComp: 'tdStatus',thComp: 'thFilterStatus'},
          { title: 'E-posta Dogrulaması', field: 'emailVerify',  colClass: 'w-240',tdComp: 'tdStatus' ,thComp: 'thFilterStatus' },
          { title: 'Eklenme Tarihi', field: 'dtInsert', sortable: true, colClass: 'w-240', tdComp: 'tdCreatetime' ,thComp:'thFilterDateRange' },
          { title: 'Son Güncelleme Tarihi', field: 'dtUpdate', sortable: true, colClass: 'w-240', tdComp: 'tdCreatetime',thComp:'thFilterDateRange' },
          { title: 'işlemler', tdComp: 'tdOpt',  visible:true,},
        
        ]
        const groupsDef = {
          Normal: ['Adı', 'SoyAdı', 'E-posta', 'TC'],
          Sortable: ['id', 'Son Güncelleme Tarihi', 'Eklenme Tarihi'],
          Extra: ['İşlemler', 'Color', 'Language', 'PL']
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
       var data=await Vue.prototype.$cmsService.getCaptainList(this.query)
       this.data = data.data.rows;
            this.total=data.data.total;
            this.loading=false;
      
    },
    alertSelectedUids () {
      alert(this.selection.map(({ uid }) => uid))
    }
  }
}
</script>
<style>
.w-240 {
  width: 60px;
}
.w-100 {
  width: 30px;
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

