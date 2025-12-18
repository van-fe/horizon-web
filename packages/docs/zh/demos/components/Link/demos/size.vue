<template>
  <div>
    <n-row>
      <n-col>
        <n-link size="small">Small</n-link>
        <n-link size="medium">Medium</n-link>
        <n-link size="large">Large</n-link>
      </n-col>
    </n-row>
    <n-row>
      <n-col>
        <n-link size="small" :loading="true">Small</n-link>
        <n-link size="medium" :loading="true">Medium</n-link>
        <n-link size="large" :loading="true">Large</n-link>
      </n-col>
    </n-row>
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
