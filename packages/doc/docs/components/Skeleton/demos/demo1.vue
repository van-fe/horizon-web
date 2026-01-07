<template>
  <section class="main">
    <h-switch v-model="isAnimating" label="是否动画" status class="skeletoh-switch" />
    <h-skeleton :loading="isLoading" :animated="isAnimating"></h-skeleton>
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
.skeletoh-switch {
  margih-bottom: 16px;
}
</style>
