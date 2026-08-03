<template>
  <div>
    <h-grid :gap="12">
      <h-grid-item :span="24">
        <h-link size="small">Small</h-link>
        <h-link size="medium">Medium</h-link>
        <h-link size="large">Large</h-link>
      </h-grid-item>
    </h-grid>
    <h-grid :gap="12">
      <h-grid-item :span="24">
        <h-link size="small" :loading="true">Small</h-link>
        <h-link size="medium" :loading="true">Medium</h-link>
        <h-link size="large" :loading="true">Large</h-link>
      </h-grid-item>
    </h-grid>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loading: false,
    };
  },
};
</script>
