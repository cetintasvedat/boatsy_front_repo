<template>
  <div class="btn-group btn-group-sm">
     <button class="btn btn-default" title="Friends"
      :class="{ '-nested-comp-open-btn': true }"
      @click="toggleNestedComp('DisplayRow')">
      <i class="fas fa-user-check"></i>
    </button>
    <button class="btn btn-default" title="Display row"
      :class="{ '-nested-comp-open-btn': true }"
      @click="toggleNestedComp('BoatTable')">
     <i class="fas fa-ship"></i>
    </button>

    
   
  </div>
</template>
<script>

export default {
  props: ['row', 'nested'],

  computed: {
    isDisplayRowVisible () {
      if (this.nested.comp !== 'DisplayRow') return
      return this.nested.visible
    },
    isFriendsTableVisible () {
      if (this.nested.comp !== 'FriendsTable') return
      return this.nested.visible
    }
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
