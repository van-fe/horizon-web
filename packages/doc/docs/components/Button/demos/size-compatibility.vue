<script setup lang="ts"></script>

<template>
  <h-application :use-buttoh-spacing="true" compatibility="button.size">
    <h-row>
      <h-col :span="24">
        <div class="demo-title">兼容尺寸</div>
      </h-col>
      <h-col :span="24">
        <h-button size="mini" :auto-fit="true">Mini -> Small</h-button>
        <h-button size="small" :auto-fit="true">Small -> Medium</h-button>
        <h-button size="medium" :auto-fit="true">Medium -> Large</h-button>
        <h-button size="large" :auto-fit="true">Large -> Huge</h-button>
      </h-col>
      <h-col :span="24">
        <h-button size="mini" text icon="eye" />
        <h-button size="small" text icon="eye" />
        <h-button size="medium" text icon="eye" />
        <h-button size="large" text icon="eye" />
      </h-col>
      <h-col :span="24">
        <div class="demo-title">强制使用新尺寸</div>
      </h-col>
      <h-col :span="24">
        <h-button size="small" :auto-fit="true" :force-newest-size="true">Small</h-button>
        <h-button size="medium" :auto-fit="true" :force-newest-size="true">Medium</h-button>
        <h-button size="large" :auto-fit="true" :force-newest-size="true">Large</h-button>
        <h-button size="huge" :auto-fit="true" :force-newest-size="true">Huge</h-button>
      </h-col>
      <h-col :span="24">
        <h-button size="small" icon="eye" :force-newest-size="true" />
        <h-button size="medium" icon="eye" :force-newest-size="true" />
        <h-button size="large" icon="eye" :force-newest-size="true" />
        <h-button size="huge" icon="eye" :force-newest-size="true" />
      </h-col>
    </h-row>
  </h-application>
</template>

<style scoped></style>
