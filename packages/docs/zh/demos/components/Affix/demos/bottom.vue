<template>
  <n-space>
    <n-affix target=".n-main" position="bottom" style="display: inline-block">
      <n-button>Affix bottom</n-button>
    </n-affix>
    <n-affix target=".n-main" position="bottom" :offset="100" style="display: inline-block">
      <n-button>Affix bottom with 100px offset</n-button>
    </n-affix>
  </n-space>
</template>

<script setup lang="ts">
</script>
