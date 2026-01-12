<template>
  <div class="box">
    <img src="./1.png" alt="" />
    <h-mask absolute :is-fuzzification="true"></h-mask>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const show = ref(true);
    return {
      show,
    };
  },
});
</script>

<style scoped>
.box {
  position: relative;
  width: 200px;
  height: 200px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
