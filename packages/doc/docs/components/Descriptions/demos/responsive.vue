<template>
    <div class="container">
      <div>
        <n-descriptions title="User Info" type="vertical" border :column="3" :xs="1" :sm="2" label-class="label-style" >
          <n-description-item label="Name" value="bingkun Zhou" :xs="1"  :sm="1" />
          <n-description-item label="Telephone" value="0924-250492" :sm="1" />
          <n-description-item label="Residence" value="Norway" />
          <n-description-item label="City" value="Oslo" />
          <n-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" :span-col="2" :xs="1" :sm="2" />
        </n-descriptions>
      </div>
    </div>
  </template>
  
  <style scoped>
    .container {
      /* display: flex;
      flex-direction: column; */
      width: 100%;
    }
  </style>
  <style>
    .label-style {
      min-width: 80px;
      max-width: 80px;
    }
  </style>