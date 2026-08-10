<template>
  <section class="docs-demo">
    <article class="description-preview">
      <h-descriptions title="INC-2048 · Checkout latency" :column="3">
        <h-description-item label="Owner" value="Mira Chen" />
        <h-description-item label="Severity" value="High" />
        <h-description-item label="Region" value="Asia Pacific" />
        <h-description-item label="Started" value="Aug 3, 14:20" />
        <h-description-item label="Service" value="Payment gateway" :span-col="2" />
      </h-descriptions>
    </article>
  </section>
</template>

<style scoped>
.description-preview {
  overflow-x: auto;
}
</style>
