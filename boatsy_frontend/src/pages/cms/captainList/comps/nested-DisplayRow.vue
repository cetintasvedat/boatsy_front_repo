<template>
  <div class="-nested-dsp-row-comp">
    <button class="btn btn-xs btn-link -nested-dsp-row-close-btn"
      @click="nested.$toggle(false)">
      <i class="fa fa-times fa-lg"></i>
    </button>
      <button class="btn btn-xs btn-link -nested-dsp-row-edit-btn"
      @click="show('edit-modal')">
     <i class="far fa-edit"></i>
    </button>
    <dl class="dl-horizontal">
  
   <CMSCaptainProfileCard :row="row" />
    </dl>
  </div>
</template>
<script>
export default {
  props: ['row', 'nested'],
  methods:{
     show(ModalName) {
      this.$modal.show(ModalName);
    },
  }
}
</script>
<style>
.-nested-dsp-row-comp {
  position: relative;
  padding: 10px;
}
.-nested-dsp-row-close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>
