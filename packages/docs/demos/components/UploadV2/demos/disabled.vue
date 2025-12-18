<template>
  <n-upload action="https://lego-inspector.nioint.com/upload-mock" :disabled="true" />
  <n-upload
    action="https://lego-inspector.nioint.com/upload-mock"
    type="gallery"
    :disabled="true"
  />
  <n-upload action="https://lego-inspector.nioint.com/upload-mock" type="drop" :disabled="true" accept="image/*" />
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
.n-upload + .n-upload {
  margin-top: 10px;
}
</style>
