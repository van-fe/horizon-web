<template>
  <p>↓ solid(default)</p>
  <h-row>
    <h-col :span="12"><h-divider /></h-col>
    <h-col :span="12"><h-divider direction="vertical" /></h-col>
  </h-row>
  <p>↓ dashed</p>
  <h-row>
    <h-col :span="12"><h-divider line-style="dashed" /></h-col>
    <h-col :span="12"><h-divider line-style="dashed" direction="vertical" /></h-col>
  </h-row>
  <p>↓ dotted</p>
  <h-row>
    <h-col :span="12"><h-divider line-style="dotted" /></h-col>
    <h-col :span="12"><h-divider line-style="dotted" direction="vertical" /></h-col>
  </h-row>
</template>
