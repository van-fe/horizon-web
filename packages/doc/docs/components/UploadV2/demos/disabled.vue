<template>
  <n-upload-v2 action="https://lego-inspector.nioint.com/upload-mock" :disabled="true" />
  <n-upload-v2
    action="https://lego-inspector.nioint.com/upload-mock"
    type="gallery"
    :disabled="true"
  />
  <n-upload-v2 action="https://lego-inspector.nioint.com/upload-mock" type="drop" :disabled="true" accept="image/*" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.n-upload-v2 + .n-upload-v2 {
  margin-top: 10px;
}
</style>
