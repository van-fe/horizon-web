<template>
  <div class="demo-block">
    <h-row>
      <h-col :xs="8" :sm="4" :md="{span: 4, offset: 2}" :lg="2" :xl="2" :xxl="1"></h-col>
      <h-col :xs="4" :sm="8" :md="12" :lg="{span: 6, offset: 2}" :xl="12" :xxl="8"></h-col>
      <h-col :xs="4" :sm="8" :md="3" :lg="{span: 8, offset: 4}" :xl="8" :xxl="10"></h-col>
      <h-col :xs="8" :sm="4" :md="{span: 1, offset: 2}" :lg="2" :xl="2" :xxl="5"></h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-block .h-col {
  height: 30px;
}

.demo-block .h-col:nth-child(odd) {
  background: #b7e8ea;
}

.demo-block .h-col:nth-child(even) {
  background: #00bcbc;
}
</style>
