<template>
  <div @click="show" style="cursor:pointer;">
    <div class="row popular-location-card" style="flex-flow: nowrap;margin-left:0px">
      <img
        v-bind:src="image"
        style="width: 42px; height: 42px; border-radius: 20%"
      />

      <div
        style="
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        "
      >
        <p
          style="
            margin: 0;
            padding: 0;
            font-size: 16px;
            font-weight: 600;
            color: #014B67
          "
        >
          {{ $t(title) }}
        </p>
        <p style="margin: 0 10px 0 0; padding: 0; font-size: 14px; color: #014B67">
          {{ $t(desc) }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "desc", "image"],
  methods: {
    show(){
      this.$modal.show("InfoCardModal");
    }
  },
};
</script>
