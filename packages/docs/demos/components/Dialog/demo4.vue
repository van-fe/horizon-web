<template>
  <h-button
    class="mr-2"
    @click="
      size = 'small';
      visible = true;
    "
  >
    小对话框
  </h-button>
  <h-button
    class="mr-2"
    @click="
      size = 'medium';
      visible = true;
    "
  >
    普通对话框
  </h-button>
  <h-button
    class="mr-2"
    @click="
      size = 'large';
      visible = true;
    "
  >
    大对话框
  </h-button>
  <h-button
    class="mr-2"
    @click="
      size = 'huge';
      visible = true;
    "
  >
    超大对话框
  </h-button>
  <h-dialog v-model:visible="visible" title="标题" :size="size" @ok="onPrimary">
    <div>随便写点什么</div>
  </h-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    const onPrimary = () => {
      visible.value = false;
    };
    const size = ref<string | number>('medium');

    return {
      visible,
      onPrimary,
      size,
    };
  },
});
</script>
