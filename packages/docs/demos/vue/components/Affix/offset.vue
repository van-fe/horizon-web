<template>
  <div class="affix-offset-demo">
    <h-affix :offset="64" class="affix-offset-demo__affix">
      <h-button type="normal">保存并继续</h-button>
    </h-affix>
  </div>
</template>

<style scoped>
.affix-offset-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.affix-offset-demo__affix {
  display: inline-block;
  width: fit-content;
}
</style>
