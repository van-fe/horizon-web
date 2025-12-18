<template>
  <div class="block">
    <n-button v-tooltip="hoverMsg" type="normal">Hover</n-button>
    <n-button v-tooltip.click.left="clickMsg" type="normal">Click</n-button>
    <n-button v-tooltip.right.focus="focusMsg" type="normal">Focus</n-button>
    <n-button v-tooltip.manual="contextmenuMsg" type="normal">Controls</n-button>
    <n-button v-tooltip.disabled type="normal">Disabled</n-button>
    <n-button v-tooltip.visible="'visible'" type="normal">Always display</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let hoverMsg = ref('hover top');
    let clickMsg = ref('click left');
    let focusMsg = ref('focus right');
    let contextmenuMsg = ref('contextmenu top');
    return {
      hoverMsg,
      clickMsg,
      focusMsg,
      contextmenuMsg,
    };
  },
});
</script>

<style scoped>
.block {
  display: flex;
}

.block .n-button {
  margin-left: 20px;
}
</style>
