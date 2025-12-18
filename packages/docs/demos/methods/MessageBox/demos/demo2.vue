<template>
  <n-button class="mr-2" @click="showConfirm()">Confirm</n-button>
  <n-button class="mr-2" @click="showConfirm('info')">Info</n-button>
  <n-button class="mr-2" @click="showConfirm('success')">Success</n-button>
  <n-button class="mr-2" @click="showConfirm('warning')">Warning</n-button>
  <n-button class="mr-2" @click="showConfirm('error')">Error</n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $confirm } from '@nio-fe/lego';
export default defineComponent({
  setup() {
    const showConfirm = (type?: 'info' | 'success' | 'warning' | 'error') => {
      $confirm('这是一段文本', '提示', {
        type,
      })
        .then(close => {
          console.log('Confirmed!');
          close();
        })
        .catch(() => {
          console.log('Cancelled!');
        });
    };
    return {
      showConfirm,
    };
  },
});
</script>
