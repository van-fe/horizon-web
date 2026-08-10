<script setup lang="ts">
const teams = [
  {
    team: 'Platform',
    lead: 'Mina Park',
    week1: [32, 29],
    week2: [36, 34],
    week3: [28, 31],
    week4: [40, 37],
  },
  {
    team: 'Growth',
    lead: 'Noah Chen',
    week1: [24, 26],
    week2: [30, 28],
    week3: [32, 30],
    week4: [34, 33],
  },
  {
    team: 'Design systems',
    lead: 'Iris Wang',
    week1: [18, 18],
    week2: [20, 22],
    week3: [24, 21],
    week4: [20, 19],
  },
  {
    team: 'Security',
    lead: 'Leo Martin',
    week1: [26, 24],
    week2: [28, 27],
    week3: [30, 30],
    week4: [28, 25],
  },
];
</script>

<template>
  <h-table :data="teams" row-key="team" max-height="320">
    <h-table-column title="Team" field="team" width="170" fixed />
    <h-table-column title="Lead" field="lead" width="140" />
    <h-table-column v-for="week in 4" :key="week" :title="'Week ' + week">
      <h-table-column
        title="Plan"
        :field="'week' + week + '[0]'"
        width="84"
        align="right"
        header-align="right"
      />
      <h-table-column
        title="Actual"
        :field="'week' + week + '[1]'"
        width="84"
        align="right"
        header-align="right"
      />
    </h-table-column>
  </h-table>
</template>
