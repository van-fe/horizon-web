<script setup lang="ts">
const requests = [
  { ticket: 'SUP-731', customer: 'Northwind', topic: 'Webhook retries', waiting: '18m' },
  { ticket: 'SUP-734', customer: 'Contoso', topic: 'Role permissions', waiting: '24m' },
  { ticket: 'SUP-738', customer: 'Fabrikam', topic: 'Invoice correction', waiting: '31m' },
  { ticket: 'SUP-740', customer: 'Globex', topic: 'Data retention', waiting: '42m' },
  { ticket: 'SUP-744', customer: 'Initech', topic: 'SSO certificate', waiting: '51m' },
  { ticket: 'SUP-747', customer: 'Umbrella', topic: 'Export timeout', waiting: '1h 04m' },
];
</script>

<template>
  <h-table :data="requests" stripe row-key="ticket">
    <h-table-column title="Ticket" field="ticket" width="104" />
    <h-table-column title="Customer" field="customer" min-width="130" />
    <h-table-column title="Topic" field="topic" min-width="180" />
    <h-table-column
      title="Waiting"
      field="waiting"
      width="100"
      align="right"
      header-align="right"
    />
  </h-table>
</template>
