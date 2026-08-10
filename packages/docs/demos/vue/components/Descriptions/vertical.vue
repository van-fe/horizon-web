<template>
  <section class="docs-demo">
    <article class="description-preview">
      <h-descriptions title="Deployment summary" type="vertical" label-position="top" :column="3">
        <h-description-item label="Release" value="Horizon Web 3.8" />
        <h-description-item label="Owner" value="Frontend Platform" />
        <h-description-item label="Window" value="Aug 18 · 02:00–03:30 UTC" />
        <h-description-item
          label="Change set"
          value="Accessibility and performance improvements"
          :span-col="2"
        />
        <h-description-item label="Risk" value="Low" />
      </h-descriptions>
    </article>
  </section>
</template>

<style scoped>
.description-preview {
  overflow-x: auto;
}
</style>
