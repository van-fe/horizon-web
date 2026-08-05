<template>
  <div class="button-plain-demo">
    <h-space wrap>
      <h-button type="normal" plain>View details</h-button>
      <h-button plain>Approve</h-button>
      <h-button type="danger" plain>Reject</h-button>
    </h-space>

    <h-space class="button-plain-demo__inverse" wrap>
      <h-button type="normal" ghost plain>Preview</h-button>
      <h-button ghost plain>Continue</h-button>
      <h-button type="danger" ghost plain>Stop</h-button>
    </h-space>
  </div>
</template>

<style scoped>
.button-plain-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--h-spacing-4);
}

.button-plain-demo__inverse {
  padding: var(--h-spacing-3);
  background: var(--h-bg-brand-activated);
  border-radius: var(--h-radius-m);
}
</style>
