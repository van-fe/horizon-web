<template>
  <div class="block">
    <n-button v-tooltip="tooltipMsgOptions" type="normal" plain>设置Tooltip指令</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const tooltipMsgOptions = ref({
      content: 'options message Tooltip',
    });
    return {
      tooltipMsgOptions,
    };
  },
});
</script>
