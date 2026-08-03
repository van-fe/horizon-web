<script setup lang="ts">
const accounts = [
  {
    id: 'AC-184',
    account: 'Northwind Retail',
    owner: 'Mina Park',
    balance: '$18,420',
    invoices: [
      { invoice: 'INV-8821', issued: 'Jul 01', amount: '$9,200', state: 'Paid' },
      { invoice: 'INV-8944', issued: 'Aug 01', amount: '$9,220', state: 'Open' },
    ],
  },
  {
    id: 'AC-217',
    account: 'Contoso Energy',
    owner: 'Noah Chen',
    balance: '$12,860',
    invoices: [
      { invoice: 'INV-8796', issued: 'Jul 01', amount: '$6,430', state: 'Paid' },
      { invoice: 'INV-8927', issued: 'Aug 01', amount: '$6,430', state: 'Review' },
    ],
  },
  {
    id: 'AC-249',
    account: 'Fabrikam Health',
    owner: 'Iris Wang',
    balance: '$24,180',
    invoices: [
      { invoice: 'INV-8810', issued: 'Jul 01', amount: '$12,090', state: 'Paid' },
      { invoice: 'INV-8961', issued: 'Aug 01', amount: '$12,090', state: 'Open' },
    ],
  },
];
</script>

<template>
  <h-table :data="accounts" row-key="id" max-height="420">
    <h-table-column type="expand" width="48">
      <template #expand="{ row }">
        <div class="table-nested-demo__table">
          <h-table :data="row.invoices" row-key="invoice" border="full" size="small">
            <h-table-column title="Invoice" field="invoice" min-width="130" />
            <h-table-column title="Issued" field="issued" width="110" />
            <h-table-column
              title="Amount"
              field="amount"
              width="120"
              align="right"
              header-align="right"
            />
            <h-table-column title="State" field="state" width="108" />
          </h-table>
        </div>
      </template>
    </h-table-column>
    <h-table-column title="Account" field="account" min-width="190" />
    <h-table-column title="ID" field="id" width="106" />
    <h-table-column title="Owner" field="owner" min-width="140" />
    <h-table-column
      title="Balance"
      field="balance"
      width="130"
      align="right"
      header-align="right"
    />
  </h-table>
</template>

<style scoped>
.table-nested-demo__table {
  padding: var(--h-spacing-3);
}
</style>
