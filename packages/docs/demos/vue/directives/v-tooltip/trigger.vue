<template>
  <div class="block">
    <h-button v-tooltip="hoverMsg">hover top</h-button>
    <h-button v-tooltip.click.left="clickMsg">click left</h-button>
    <h-button v-tooltip.right.focus="focusMsg">focus right</h-button>
    <h-button v-tooltip.manual="contextmenuMsg">manual top</h-button>
    <h-button v-tooltip.disabled>disabled</h-button>
    <h-button v-tooltip.visible="'visible'">visible</h-button>
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
  margin-left: 20px;
}
</style>
