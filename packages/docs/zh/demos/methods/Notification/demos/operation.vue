<template>
  <div class="demo-wrapper">
    <n-button size="medium" type="primary" plain @click="open">操作按钮</n-button>
    <n-button size="medium" type="primary" plain @click="open1">防抖按钮</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify, $message } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        '操作按钮',
        {
          type: 'info',
          showConfirmButton: true,
          showCancelButton: true,
          callback(action, instance) {
            console.info(action, instance);
          },
        },
      );
    };

    const open1 = () => {
      $notify({
        title: '部分导入失败',
        useHTML: true,
        duration: 0,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: '关闭',
        confirmButtonText: '下载失败报告',
        confirmButtonProps: {
          debounceType: 'loading',
          debounceFn: () => {
            console.info('clicked!');
            return new Promise((resolve) => {
              setTimeout(() => {
                $message.success('保存成功！');
                resolve(null);
              }, 2000);
            });
          },
        },
        content: '部分导入失败',
        type: 'error',
      });
    };

    return {
      open,
      open1,
    };
  },
});
</script>

<style scoped>
.demo-wrapper .n-button {
  margin-right: 40px;
}
</style>
