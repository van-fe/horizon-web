<template>
  <h-space>
    <h-button type="normal" @click="open">打开通知</h-button>
    <h-button type="normal" @click="close1">关闭当前通知</h-button>
    <h-button type="normal" @click="close2">关闭所有通知</h-button>
  </h-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

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

