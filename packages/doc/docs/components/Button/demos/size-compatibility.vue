<script setup lang="ts"></script>

<template>
  <n-application :use-button-spacing="true" compatibility="button.size">
    <n-row>
      <n-col :span="24">
        <div class="demo-title">兼容尺寸</div>
      </n-col>
      <n-col :span="24">
        <n-button size="mini" :auto-fit="true">Mini -> Small</n-button>
        <n-button size="small" :auto-fit="true">Small -> Medium</n-button>
        <n-button size="medium" :auto-fit="true">Medium -> Large</n-button>
        <n-button size="large" :auto-fit="true">Large -> Huge</n-button>
      </n-col>
      <n-col :span="24">
        <n-button size="mini" text icon="eye" />
        <n-button size="small" text icon="eye" />
        <n-button size="medium" text icon="eye" />
        <n-button size="large" text icon="eye" />
      </n-col>
      <n-col :span="24">
        <div class="demo-title">强制使用新尺寸</div>
      </n-col>
      <n-col :span="24">
        <n-button size="small" :auto-fit="true" :force-newest-size="true">Small</n-button>
        <n-button size="medium" :auto-fit="true" :force-newest-size="true">Medium</n-button>
        <n-button size="large" :auto-fit="true" :force-newest-size="true">Large</n-button>
        <n-button size="huge" :auto-fit="true" :force-newest-size="true">Huge</n-button>
      </n-col>
      <n-col :span="24">
        <n-button size="small" icon="eye" :force-newest-size="true" />
        <n-button size="medium" icon="eye" :force-newest-size="true" />
        <n-button size="large" icon="eye" :force-newest-size="true" />
        <n-button size="huge" icon="eye" :force-newest-size="true" />
      </n-col>
    </n-row>
  </n-application>
</template>

<style scoped></style>
