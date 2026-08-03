<template>
  <div class="container">
    <div>
      <h-descriptions title="User Info" type="vertical" label-position="top" :column="3">
        <h-description-item label="Name" value="bingkun Zhou"></h-description-item>
        <h-description-item label="Telephone" value="0924-250492" />
        <h-description-item label="Residence" value="Norway" />
        <h-description-item label="City" value="Oslo" />
        <h-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" />
      </h-descriptions>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
