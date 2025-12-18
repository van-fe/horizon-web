<template>
  <n-button class="mr-2" @click="showAlert()">Alert</n-button>
  <n-button class="mr-2" @click="showAlert('info')">Info</n-button>
  <n-button class="mr-2" @click="showAlert('success')">Success</n-button>
  <n-button class="mr-2" @click="showAlert('warning')">Warning</n-button>
  <n-button class="mr-2" @click="showAlert('error')">Error</n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $alert } from '@nio-fe/lego';
export default defineComponent({
  setup() {
    const showAlert = (type?: 'info' | 'success' | 'warning' | 'error') => {
      $alert('这是一段文本', '提示', {
        type,
      }).then(() => {
        console.log('OK clicked!');
      }).catch(() => {
        console.log('Close clicked!');
      });
    };
    return {
      showAlert,
    };
  },
});
</script>
