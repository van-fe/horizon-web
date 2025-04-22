<template>
  <div class="demo-progress">
    <n-progress type="circle" :percentage="60" size="xs" />
    <n-progress type="circle" :percentage="25" size="s" />
    <n-progress type="circle" :percentage="60" size="m" />
    <n-progress type="circle" :percentage="70" size="l" />
    <n-progress type="circle" :percentage="85" size="s" status="success" />
    <n-progress type="circle" :percentage="70" size="m" status="exception" />
    <n-progress type="circle" :percentage="70" size="l" status="warning" />
  </div>
</template>
<style scoped>
.demo-progress {
    display: flex;
    align-items: center;
}
.demo-progress .n-progress--line {
    margin-bottom: 15px;
    width: 350px;
}

.demo-progress .n-progress-circle {
    margin-right: 15px;
}
</style>
