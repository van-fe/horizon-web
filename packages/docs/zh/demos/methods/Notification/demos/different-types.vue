<template>
  <div class="demo-wrapper">
    <n-button size="medium" type="primary" plain @click="open1">normal</n-button>
    <n-button size="medium" type="primary" plain @click="open2">info</n-button>
    <n-button size="medium" type="primary" plain @click="open3">success</n-button>
    <n-button size="medium" type="primary" plain @click="open4">warning</n-button>
    <n-button size="medium" type="primary" plain @click="open5">error</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@nio-fe/lego';

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

<style scoped>
.demo-wrapper .n-button {
  margin-right: 40px;
}
</style>
