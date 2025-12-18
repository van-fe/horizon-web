<template>
  <p>↓ solid(default)</p>
  <n-row>
    <n-col :span="12"><n-divider /></n-col>
    <n-col :span="12"><n-divider direction="vertical" /></n-col>
  </n-row>
  <p>↓ dashed</p>
  <n-row>
    <n-col :span="12"><n-divider line-style="dashed" /></n-col>
    <n-col :span="12"><n-divider line-style="dashed" direction="vertical" /></n-col>
  </n-row>
  <p>↓ dotted</p>
  <n-row>
    <n-col :span="12"><n-divider line-style="dotted" /></n-col>
    <n-col :span="12"><n-divider line-style="dotted" direction="vertical" /></n-col>
  </n-row>
</template>
