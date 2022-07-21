<template>
  <fieldset style="width:100%">
  <label >
    {{ label }} </label>
    <input :type="type" :name="name" :value="value" @input="onInput" @change="onChange" :label="label"  class="form-control airBnbStyleInput" ref="input" style="width:100%;"/>
 
    </fieldset>
</template>

<script>

export default {
 
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    type:{
        type: String,
      required: true,
    }
  },
   data: () => ({
    keyword: '',
    isActive:false
  }),
  computed: {
    name() {
      return this.label.toLowerCase();
    },
  },
  methods: {
    onInput(event) {
      // Can add validation here
      this.$emit('input', event.target.value);
    },
    onChange(event) { // Supports .lazy
      // Can add validation here
      this.$emit('change', event.target.value);
    },
  },
}
</script>
<style>
input::-webkit-search-cancel-button {
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
.airBnbStyleInput{
  width: 100% !important;

    padding: 0px !important;
    margin: 26px 12px 10px !important;
    min-height: 1px !important;
    color: inherit !important;
    background-color: transparent !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    appearance: none !important;
}
</style>