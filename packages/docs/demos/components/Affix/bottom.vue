<template>
  <h-space>
    <h-affix target=".h-main" position="bottom" style="display: inline-block">
      <h-button>Affix bottom</h-button>
    </h-affix>
    <h-affix target=".h-main" position="bottom" :offset="100" style="display: inline-block">
      <h-button>Affix bottom with 100px offset</h-button>
    </h-affix>
  </h-space>
</template>

<script setup lang="ts">
</script>
