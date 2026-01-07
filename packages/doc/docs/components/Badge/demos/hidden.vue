<template>
  <div class="mb-4">
    <h-switch v-model="isHidden" label="hidden" label-position="right" />
  </div>
  <h-badge :hidden="isHidden" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge :hidden="isHidden" type="num" :content="0" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge :hidden="isHidden" type="num" :content="99" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge
    :hidden="isHidden"
    type="icon"
    content="owner_os"
    :icoh-size="12"
    icoh-color="#24A7B2"
    align="inner"
    bottom
    class="mr-5"
  >
    <div style="background: gray; border-radius: 50%; width: 50px; height: 50px"></div>
  </h-badge>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isHidden = ref(false);
    return {
      isHidden,
    };
  },
});
</script>
