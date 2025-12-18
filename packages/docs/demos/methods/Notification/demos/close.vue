<template>
  <div class="demo-wrapper">
    <n-button size="medium" type="primary" plain @click="open">隐藏关闭按钮</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open = () => {
      $notify({
        title: '隐藏关闭按钮',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        showClose: false,
      });
    };
    return {
      open,
    };
  },
});
</script>

<style scoped>
.demo-wrapper .n-button {
  margin-right: 40px;
}
</style>
