<script setup lang="ts">
const portfolio = [
  {
    account: 'Northwind',
    owner: 'Mina Park',
    region: ['APAC', 'Singapore'],
    arr: '$248k',
    renewal: 'Sep 12',
  },
  {
    account: 'Contoso',
    owner: 'Noah Chen',
    region: ['EMEA', 'Berlin'],
    arr: '$186k',
    renewal: 'Sep 18',
  },
  {
    account: 'Fabrikam',
    owner: 'Iris Wang',
    region: ['AMER', 'Toronto'],
    arr: '$322k',
    renewal: 'Oct 02',
  },
  {
    account: 'Globex',
    owner: 'Leo Martin',
    region: ['APAC', 'Sydney'],
    arr: '$141k',
    renewal: 'Oct 14',
  },
];
</script>

<template>
  <h-table :data="portfolio" row-key="account" use-column-manager max-height="300">
    <h-table-column
      title="Account"
      field="account"
      width="160"
      fixed
      lock-position
      lock-visible
      lock-fixed
    />
    <h-table-column title="Owner" field="owner" width="140" resizable />
    <h-table-column title="Region">
      <h-table-column title="Market" field="region[0]" width="110" />
      <h-table-column title="Hub" field="region[1]" width="130" />
    </h-table-column>
    <h-table-column title="ARR" field="arr" width="110" align="right" header-align="right" />
    <h-table-column title="Renewal" field="renewal" width="116" />
  </h-table>
</template>
