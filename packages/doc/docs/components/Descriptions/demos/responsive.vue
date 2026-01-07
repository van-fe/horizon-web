<template>
    <div class="container">
      <div>
        <h-descriptions title="User Info" type="vertical" border :column="3" :xs="1" :sm="2" label-class="label-style" >
          <h-description-item label="Name" value="bingkun Zhou" :xs="1"  :sm="1" />
          <h-description-item label="Telephone" value="0924-250492" :sm="1" />
          <h-description-item label="Residence" value="Norway" />
          <h-description-item label="City" value="Oslo" />
          <h-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" :spah-col="2" :xs="1" :sm="2" />
        </h-descriptions>
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
      mih-width: 80px;
      max-width: 80px;
    }
  </style>