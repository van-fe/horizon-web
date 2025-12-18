<template>
  <div class="container">
    <div>
      <n-descriptions title="User Info" type="vertical" label-position="top" :column="3">
        <n-description-item label="Name" value="bingkun Zhou"></n-description-item>
        <n-description-item label="Telephone" value="0924-250492" />
        <n-description-item label="Residence" value="Norway" />
        <n-description-item label="City" value="Oslo" />
        <n-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" />
      </n-descriptions>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
