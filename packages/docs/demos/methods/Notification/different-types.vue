<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open1">normal</h-button>
    <h-button size="medium" type="primary" plain @click="open2">info</h-button>
    <h-button size="medium" type="primary" plain @click="open3">success</h-button>
    <h-button size="medium" type="primary" plain @click="open4">warning</h-button>
    <h-button size="medium" type="primary" plain @click="open5">error</h-button>
  </div>
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

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
