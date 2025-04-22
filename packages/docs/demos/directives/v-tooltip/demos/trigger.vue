<template>
  <div class="block">
    <n-button v-tooltip="hoverMsg">hover top</n-button>
    <n-button v-tooltip.click.left="clickMsg">click left</n-button>
    <n-button v-tooltip.right.focus="focusMsg">focus right</n-button>
    <n-button v-tooltip.manual="contextmenuMsg">manual top</n-button>
    <n-button v-tooltip.disabled>disabled</n-button>
    <n-button v-tooltip.visible="'visible'">visible</n-button>
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
