<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open">overload</h-button>
  </div>
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

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
