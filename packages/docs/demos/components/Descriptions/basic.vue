<template>
  <div class="container">
    <h-descriptions title="User Info">
      <h-description-item label="Name:" value="bingkun Zhou"></h-description-item>
      <h-description-item label="Telephone:" value="0924-250492" />
      <h-description-item label="Residence:" value="Norway" />
      <h-description-item label="City:" value="Oslo" />
      <h-description-item label="Address:" value="Leg.Kiropraktor Iréne Johnson" />
    </h-descriptions>
  </div>
</template>

<style scoped>
.container {
  width: 876px;
}

.container .h-descriptions__item {
  width: 264px;
}

.container .h-descriptions__item:last-child {
  width: auto;
}
</style>
