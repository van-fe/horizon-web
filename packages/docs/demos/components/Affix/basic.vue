<template>
  <div class="affix-page-demo">
    <h-affix class="affix-page-demo__affix">
      <h-button>创建新任务</h-button>
    </h-affix>
  </div>
</template>

<style scoped>
.affix-page-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.affix-page-demo__affix {
  display: inline-block;
  width: fit-content;
}
</style>
