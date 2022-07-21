<template>
  <div class="btn-group btn-group-sm">
     <a :href='"/cms/bookings/"+row.id+"/"+row.reservationcode' class="btn btn-default" title="info" target="_blank"
      :class="{ '-nested-comp-open-btn': true }"
       >
      <i class="fas fa-info-circle"></i>
    </a>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: ['row', 'nested'],

  computed: {
 
  },
  methods: {
    toggleNestedComp (comp) {
      const { nested } = this
      if (nested.comp === comp) return nested.$toggle()
      nested.$toggle(comp, true)
    }

  }
}
</script>
<style>
.-nested-comp-open-btn {
  color: #fff !important;
  background-color: #337ab7 !important;
}
</style>
