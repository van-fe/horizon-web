<template>
  <div>
    <div class="text-subtitle-2 mb-2">medium(default)</div>
    <n-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]" />
    <div class="text-subtitle-2 mt-4 mb-2">small</div>
    <n-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]" size="small" />
  </div>
</template>

