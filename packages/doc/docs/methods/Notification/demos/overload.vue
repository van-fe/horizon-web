<template>
  <h-space>
    <h-button type="normal" @click="open">overload</h-button>
  </h-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Overload',
        {
          type: 'success',
          showConfirmButton: true,
          showCancelButton: true,
        },
      );
    };
    return {
      open,
    };
  },
});
</script>

