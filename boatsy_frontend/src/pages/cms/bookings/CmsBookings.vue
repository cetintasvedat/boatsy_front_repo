<template>
  <div class="captain-list-container">
    <button
      v-if="nested != null && nested != undefined"
      class="btn btn-xs btn-link -nested-dsp-row-close-btn"
      style="position:absolute; top:0"
      @click="nested.$toggle(false)"
    >
      <i style="color:red" class="fa fa-times fa-lg"></i>
    </button>
    <div>
      <datatable v-bind="$data"> </datatable>
    </div>
    <div class="loading-image-datatable" v-if="loading">
      <img src="/assets/images/loading.gif" style="width:100px; heigth:100px" />
    </div>
    <button
      id="btnBoatListReflesh"
      @click="handleQueryChange()"
      style="display:none"
    >
      yenile
    </button>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { FETCH_BOAT_TYPE } from "../../../store/actions.type";
export default {
  name: "BoatTable", // `name` is required as a recursive component
  props: ["row", "nested"], // from the parent FriendsTable (if exists)
  data() {
    const amINestedComp = !!this.row;
    return {
      loading: false,
      supportBackup: true,
      supportNested: true,
      filterObjectModel: {
        ascending: 0,
        byColumn: 0,
        limit: 25,
        page: 1,
        query: "",
        extras: "",
        orderBy: null,
        filterObject: {},
      },

      tblClass: "table-bordered",
      HeaderSettings: false,
      pageSizeOptions: [5, 10, 15, 20],
      columns: (() => {
        const cols = [
          {
            title: "ID",
            field: "id",
            sortable: true,
            visible: "true",
            thComp: "thFilterInt",
            colClass: "w-240",
          },
          {
            title: "Tekne ID",
            field: "boatid",
            visible: true,
            thComp: "thFilterInt",
            colClass: "w-240",
          },
          {
            title: "Kullanıcı ID",
            field: "customerid",
            colClass: "w-240",
            thComp: "thFilterInt",
          },
          {
            title: "Captan ID",
            field: "captainid",
            colClass: "w-240",
            thComp: "thFilterInt",
          },
          {
            title: "Toplam Kiralama Bedeli",
            field: "totalamount",
            sortable: true,
            colClass: "w-240",
          },
          {
            title: "Misafir Sayısı",
            field: "personCapacity",
            colClass: "w-240",
            tdComp: "tdPersoncapacity",
          },
          {
            title: "Başlangıç Tarihi",
            field: "startdate",
            colClass: "w-240",
            tdComp: "tdDesc",
          },
          {
            title: "Bitiş Tarihi",
            field: "enddate",
            colClass: "w-240",
            tdComp: "tdDesc",
          },
          {
            title: "Adres",
            field: "address",
            colClass: "w-240",
            tdComp: "tdDesc",
          },
          ,
          {
            title: "Rezervasyon Durumu",
            field: "bookingstatus",
            colClass: "w-240",
            tdComp: "tdBookingStatus",
            thComp: "thFilterBookingStatus",
          },
          {
            title: "Kullanıcı Adı",
            field: "customername",
            sortable: false,
            visible: true,
            colClass: "w-240",
          },
          {
            title: "Tekne Adı",
            field: "boatname",
            sortable: false,
            visible: true,
            colClass: "w-240",
          },
          {
            title: "Oluşturulma Tarihi",
            field: "createdon",
            sortable: true,
            colClass: "w-240",
            tdComp: "tdCreatetime",
            thComp: "thFilterDateRange",
          },
          { title: "Detay", tdComp: "tdBookOpt", visible: "true" }
        ];

        const groupsDef = {
          Normal: ["Email", "Username", "Country", "IP"],
          Sortable: ["UID", "Age", "Create time"],
          Extra: ["Operation", "Color", "Language", "PL"],
        };
        return cols.map((col) => {
          Object.keys(groupsDef).forEach((groupName) => {
            if (groupsDef[groupName].includes(col.title)) {
              col.group = groupName;
            }
          });
          return col;
        });
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
        eventbus: new Vue(),
      },
    };
  },
  watch: {
    query: {
      handler() {
        this.handleQueryChange();
      },
      deep: true,
    },
  },
  mounted: async function() {},
  methods: {
    handleQueryChange: async function() {
      this.loading = true;
      var tempQuery = this.query;
      this.query = this.filterObjectModel;
      if (this.row != null && this.row != undefined) {
        this.$set(tempQuery, "userId", this.row.id);
      }
      var data = await Vue.prototype.$cmsService.getAllBookings(
        this.filterObjectModel
      );

      this.data = data.data;
      this.total = data.count;
      this.loading = false;
    },
    alertSelectedUids() {
      alert(this.selection.map(({ uid }) => uid));
    },
  },
  computed: {
    ...mapGetters(["getBoatTypes"]),
  },
  async created() {
    if (this.getBoatTypes.length < 1) {
      this.$store.dispatch(FETCH_BOAT_TYPE);
    }
  },
};
</script>
