<template>
  <div class="block">
    <h-button v-tooltip="hoverMsg" type="normal">Hover</h-button>
    <h-button v-tooltip.click.left="clickMsg" type="normal">Click</h-button>
    <h-button v-tooltip.right.focus="focusMsg" type="normal">Focus</h-button>
    <h-button v-tooltip.manual="contextmenuMsg" type="normal">Controls</h-button>
    <h-button v-tooltip.disabled type="normal">Disabled</h-button>
    <h-button v-tooltip.visible="'visible'" type="normal">Always display</h-button>
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

.block .h-button {
  margih-left: 20px;
}
</style>
