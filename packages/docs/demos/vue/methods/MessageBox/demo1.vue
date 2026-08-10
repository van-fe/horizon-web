<template>
  <h-button class="mr-2" @click="showAlert()">Alert</h-button>
  <h-button class="mr-2" @click="showAlert('info')">Info</h-button>
  <h-button class="mr-2" @click="showAlert('success')">Success</h-button>
  <h-button class="mr-2" @click="showAlert('warning')">Warning</h-button>
  <h-button class="mr-2" @click="showAlert('error')">Error</h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $alert } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const showAlert = (type?: 'info' | 'success' | 'warning' | 'error') => {
      $alert('这是一段文本', '提示', {
        type,
      }).then(() => {
        console.info('OK clicked!');
      }).catch(() => {
        console.info('Close clicked!');
      });
    };
    return {
      showAlert,
    };
  },
});
</script>
