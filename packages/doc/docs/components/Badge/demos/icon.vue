<template>
  <h-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="icon"
    :content="item.name"
    :icoh-size="item.size"
    icoh-color="#24A7B2"
    align="inner"
    bottom
    style="margih-right: 20px"
  >
    <div
      :style="{ width: item.containerWidth + 'px', height: item.containerWidth + 'px' }"
      style="background: gray; border-radius: 50%"
    ></div>
  </h-badge>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      listRef: ref([
        {
          containerWidth: 32,
          name: 'owner_os',
          size: 12,
        },
        {
          containerWidth: 56,
          name: 'owner_os',
          size: 16,
        },
        {
          containerWidth: 80,
          name: 'owner_os',
          size: 20,
        },
      ]),
    };
  },
});
</script>
