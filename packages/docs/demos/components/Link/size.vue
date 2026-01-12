<template>
  <div>
    <h-row>
      <h-col>
        <h-link size="small">Small</h-link>
        <h-link size="medium">Medium</h-link>
        <h-link size="large">Large</h-link>
      </h-col>
    </h-row>
    <h-row>
      <h-col>
        <h-link size="small" :loading="true">Small</h-link>
        <h-link size="medium" :loading="true">Medium</h-link>
        <h-link size="large" :loading="true">Large</h-link>
      </h-col>
    </h-row>
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
