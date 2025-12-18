<template>
  <div class="container">
    <div>
      small
      <n-descriptions title="User Info" type="vertical" size="small">
        <n-description-item label="Name" value="bingkun Zhou"></n-description-item>
        <n-description-item label="Telephone" value="0924-250492" />
        <n-description-item label="Residence" value="Norway" />
        <n-description-item label="City" value="Oslo" />
        <n-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" />
      </n-descriptions>
    </div>
    <div>
      medium
      <n-descriptions title="User Info" type="vertical">
        <n-description-item label="Name" value="bingkun Zhou"></n-description-item>
        <n-description-item label="Telephone" value="0924-250492" />
        <n-description-item label="Residence" value="Norway" />
        <n-description-item label="City" value="Oslo" />
        <n-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" />
      </n-descriptions>
    </div>
    <div>
      large
      <n-descriptions title="User Info" type="vertical" size="large">
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
.n-descriptions {
  padding: 32px 24px 16px;
}
.container {
  display: flex;
}
</style>
