<template>
  <div class="container">
    <n-descriptions title="User Info">
      <n-description-item label="Name:" value="bingkun Zhou"></n-description-item>
      <n-description-item label="Telephone:" value="0924-250492" />
      <n-description-item label="Residence:" value="Norway" />
      <n-description-item label="City:" value="Oslo" />
      <n-description-item label="Address:" value="Leg.Kiropraktor Iréne Johnson" />
    </n-descriptions>
  </div>
</template>

<style scoped>
.container {
  width: 876px;
}

.container .n-descriptions__item {
  width: 264px;
}

.container .n-descriptions__item:last-child {
  width: auto;
}
</style>
