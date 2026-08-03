<template>
  <h-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      listRef: ref([0, 8, 15, 10000]),
    };
  },
});
</script>
