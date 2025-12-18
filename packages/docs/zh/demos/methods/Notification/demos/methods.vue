<template>
  <div class="demo-wrapper">
    <n-button size="medium" type="primary" plain @click="open">打开实例</n-button>
    <n-button size="medium" type="primary" plain @click="close1">关闭当前实例</n-button>
    <n-button size="medium" type="primary" plain @click="close2">关闭所有实例</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@nio-fe/lego';

export default defineComponent({
  setup() {
    let instance: any = null;
    const open = async () => {
      instance = await $notify({
        title: '实例',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
      });
    };

    function close1() {
      instance.close();
    }

    function close2() {
      instance.closeAll();
    }

    return {
      open,
      close1,
      close2,
    };
  },
});
</script>

<style scoped>
.demo-wrapper .n-button {
  margin-right: 40px;
}
</style>
