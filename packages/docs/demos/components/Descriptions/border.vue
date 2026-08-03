<template>
  <section class="docs-demo">
    <article class="description-preview">
      <h-descriptions title="PO-2026-0814" type="vertical" border :column="3">
        <h-description-item label="Vendor" value="Northstar Studio" />
        <h-description-item label="Amount" value="$12,480" />
        <h-description-item label="Status" value="Awaiting approval" />
        <h-description-item label="Requested by" value="Design Operations" />
        <h-description-item label="Purpose" value="Research participant program" :span-col="2" />
      </h-descriptions>
    </article>
  </section>
</template>

<style scoped>
.description-preview {
  overflow-x: auto;
}
</style>
