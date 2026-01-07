<template>
  <h-space>
    <h-button type="normal" @click="open1">默认</h-button>
    <h-button type="normal" @click="open2">通知</h-button>
    <h-button type="normal" @click="open3">成功</h-button>
    <h-button type="normal" @click="open4">警告</h-button>
    <h-button type="normal" @click="open5">错误</h-button>
  </h-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Normal',
        {
          type: 'normal',
        },
      );
    };
    const open2 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Info',
        {
          type: 'info',
        },
      );
    };
    const open3 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Success',
        {
          type: 'success',
        },
      );
    };
    const open4 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Warning',
        {
          type: 'warning',
        },
      );
    };
    const open5 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Error',
        {
          type: 'error',
        },
      );
    };

    return {
      open1,
      open2,
      open3,
      open4,
      open5,
    };
  },
});
</script>
