<script setup lang="ts">
import { ref } from 'vue';

interface ShipmentRow {
  id: string;
  destination: string;
  carrier: string;
  eta: string;
  status: string;
}

const shipmentPool: ShipmentRow[] = [
  {
    id: 'SHP-310',
    destination: 'Singapore',
    carrier: 'Atlas Air',
    eta: 'Aug 06',
    status: 'In transit',
  },
  {
    id: 'SHP-311',
    destination: 'Rotterdam',
    carrier: 'Northstar',
    eta: 'Aug 08',
    status: 'Customs',
  },
  {
    id: 'SHP-312',
    destination: 'Vancouver',
    carrier: 'Blue Freight',
    eta: 'Aug 09',
    status: 'Booked',
  },
  {
    id: 'SHP-313',
    destination: 'Osaka',
    carrier: 'Atlas Air',
    eta: 'Aug 10',
    status: 'In transit',
  },
  { id: 'SHP-314', destination: 'Hamburg', carrier: 'Northstar', eta: 'Aug 12', status: 'Booked' },
  {
    id: 'SHP-315',
    destination: 'Sydney',
    carrier: 'Blue Freight',
    eta: 'Aug 13',
    status: 'Customs',
  },
  { id: 'SHP-316', destination: 'Dubai', carrier: 'Atlas Air', eta: 'Aug 15', status: 'Booked' },
  {
    id: 'SHP-317',
    destination: 'Busan',
    carrier: 'Northstar',
    eta: 'Aug 16',
    status: 'In transit',
  },
];
const shipments = ref<ShipmentRow[]>(shipmentPool.slice(0, 3));

function addShipment() {
  const next = shipmentPool[shipments.value.length];
  if (next) shipments.value = [...shipments.value, next];
}

function resetShipments() {
  shipments.value = shipmentPool.slice(0, 3);
}
</script>

<template>
  <div class="table-fluid-demo">
    <h-space wrap>
      <h-button
        size="small"
        :disabled="shipments.length === shipmentPool.length"
        @click="addShipment"
      >
        Add shipment
      </h-button>
      <h-button
        size="small"
        type="normal"
        :disabled="shipments.length === 3"
        @click="resetShipments"
      >
        Reset
      </h-button>
    </h-space>
    <h-table :data="shipments" row-key="id" :max-height="280" stripe>
      <h-table-column title="Shipment" field="id" width="116" />
      <h-table-column title="Destination" field="destination" min-width="150" />
      <h-table-column title="Carrier" field="carrier" min-width="140" />
      <h-table-column title="ETA" field="eta" width="104" />
      <h-table-column title="Status" field="status" width="118" />
    </h-table>
    <p aria-live="polite">{{ shipments.length }} records · max-height 280px</p>
  </div>
</template>

<style scoped>
.table-fluid-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-fluid-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
