<template>
  默认倒计时10秒
  <span v-show="finished" class="ml-2">----计时完成！</span>
  <n-time @finished="finished = true" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const finished = ref(false);

    return {
      finished,
    };
  },
});
</script>
