<template>
  <h-upload action="https://horizon-web-inspector.nioint.com/upload-mock" :disabled="true" />
  <h-upload
    action="https://horizon-web-inspector.nioint.com/upload-mock"
    type="gallery"
    :disabled="true"
  />
  <h-upload action="https://horizon-web-inspector.nioint.com/upload-mock" type="drop" :disabled="true" accept="image/*" />
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
.h-upload + .h-upload {
  margin-top: 10px;
}
</style>
