<template>
  <p>↓ solid(default)</p>
  <h-grid :gap="12">
    <h-grid-item :span="12"><h-divider /></h-grid-item>
    <h-grid-item :span="12"><h-divider direction="vertical" /></h-grid-item>
  </h-grid>
  <p>↓ dashed</p>
  <h-grid :gap="12">
    <h-grid-item :span="12"><h-divider line-style="dashed" /></h-grid-item>
    <h-grid-item :span="12"><h-divider line-style="dashed" direction="vertical" /></h-grid-item>
  </h-grid>
  <p>↓ dotted</p>
  <h-grid :gap="12">
    <h-grid-item :span="12"><h-divider line-style="dotted" /></h-grid-item>
    <h-grid-item :span="12"><h-divider line-style="dotted" direction="vertical" /></h-grid-item>
  </h-grid>
</template>
