<template>
  <section class="main">
    <n-switch v-model="isAnimating" label="是否动画" status class="skeleton-switch" />
    <n-skeleton :loading="isLoading" :animated="isAnimating"></n-skeleton>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const isLoading = ref(true);
const isAnimating = ref(false);
const timer1 = setInterval(function () {
  isLoading.value = !isLoading.value;
}, 3000);
onMounted(() => {
  clearInterval(timer1);
});
</script>

<style scoped>
.skeleton-switch {
  margin-bottom: 16px;
}
</style>
