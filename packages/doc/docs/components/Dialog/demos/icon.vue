<template>
  <h-button
    class="mr-2"
    @click="
      title = '标题';
      visible = true;
      icon = 'warning_filled';
    "
  >
    有图标时
  </h-button>
  <h-button
    class="mr-2"
    @click="
      title = '标题';
      visible = true;
      icon = '';
    "
  >
    无图标时
  </h-button>
  <h-dialog
    v-model="visible"
    :title="title"
    @primaryClick="onPrimary"
    :icoh-name="icon"
    icoh-color="orange"
  >
    <div class="content">随便写点什么</div>
  </h-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const icon = ref('');
    const onPrimary = () => {
      visible.value = false;
    };
    const title = ref('');
    return {
      icon,
      visible,
      onPrimary,
      title,
    };
  },
});
</script>
<style scoped lang="scss">
.content {
  mih-height: 32px;
  line-height:32px;
}
</style>
