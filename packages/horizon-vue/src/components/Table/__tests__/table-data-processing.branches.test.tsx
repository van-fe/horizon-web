import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn, HTableSortOrderEnum } from '..';
import { processTableData } from '../src/data-processing/engine';
import {
  H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
  type HTableDataProcessingRequest,
} from '../src/data-processing/protocol';

async function settle() {
  await nextTick();
  await nextTick();
  await Promise.resolve();
  await nextTick();
}

class BrowserEngineWorker extends EventTarget {
  readonly posted: HTableDataProcessingRequest[] = [];
  readonly terminate = vi.fn();

  postMessage(request: HTableDataProcessingRequest) {
    this.posted.push(request);
    const { indices } = processTableData(request);
    queueMicrotask(() => {
      this.dispatchEvent(
        new MessageEvent('message', {
          data: {
            protocolVersion: H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
            type: 'result',
            requestId: request.requestId,
            indices,
            duration: 0,
          },
        }),
      );
    });
  }
}

describe('Table data processing browser branches', () => {
  test('reports no-operation before creating a requested worker', async () => {
    const factory = vi.fn(() => new BrowserEngineWorker() as unknown as Worker);
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Alpha' }]}
        rowKey="id"
        dataProcessing={{ mode: 'worker', workerFactory: factory, debounce: 0 }}
      >
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));
    await settle();
    await settle();

    expect(factory).not.toHaveBeenCalled();
    expect(
      wrapper.findComponent(HTable).getCurrentComponent().exposed?.getDataProcessingState(),
    ).toMatchObject({ status: 'ready', mode: 'sync', fallbackReason: 'no-operation' });
  });

  test('reports remote-query and tree-data fallbacks without changing rows', async () => {
    const remote = mount(() => (
      <HTable
        data={[{ id: 1, score: 1 }, { id: 2, score: 2 }]}
        rowKey="id"
        queryMode="remote"
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.DESC }]}
        dataProcessing={{ mode: 'worker', debounce: 0 }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settle();
    await settle();
    expect(remote.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['1', '2']);
    expect(
      remote.findComponent(HTable).getCurrentComponent().exposed?.getDataProcessingState(),
    ).toMatchObject({ fallbackReason: 'remote-query', mode: 'sync' });
    remote.unmount();

    const tree = mount(() => (
      <HTable
        data={[{ id: 1, score: 1, children: [{ id: 2, score: 2 }] }]}
        rowKey="id"
        defaultExpandAll
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.DESC }]}
        dataProcessing={{ mode: 'worker', debounce: 0 }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settle();
    await settle();
    expect(tree.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['1', '2']);
    expect(
      tree.findComponent(HTable).getCurrentComponent().exposed?.getDataProcessingState(),
    ).toMatchObject({ fallbackReason: 'tree-data', mode: 'sync' });
  });

  test('serializes multi-select primitive filters into the worker plan', async () => {
    const worker = new BrowserEngineWorker();
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, status: 1 }, { id: 2, status: 2 }, { id: 3, status: 3 }]}
        rowKey="id"
        dataProcessing={{
          mode: 'worker',
          debounce: 0,
          workerFactory: () => worker as unknown as Worker,
        }}
      >
        <HTableColumn
          title="Status"
          field="status"
          filterable
          filterType="tree-select"
          filterOptions={{ multiple: true }}
        />
      </HTable>
    ));
    await settle();
    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({ filters: { status: [1, 3] } });
    await settle();
    await settle();

    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['1', '3']);
    expect(table.getDataProcessingState()).toMatchObject({ status: 'ready', mode: 'worker' });
    expect(worker.posted.at(-1)?.filters).toEqual([
      expect.objectContaining({ operator: 'in', values: [1, 3] }),
    ]);
  });

  test('serializes input-number contains filters into a worker projection', async () => {
    const worker = new BrowserEngineWorker();
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, amount: 12 }, { id: 2, amount: 20 }, { id: 3, amount: 3 }]}
        rowKey="id"
        dataProcessing={{
          mode: 'worker',
          debounce: 0,
          workerFactory: () => worker as unknown as Worker,
        }}
      >
        <HTableColumn title="Amount" field="amount" filterable filterType="input-number" />
      </HTable>
    ));
    await settle();
    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({ filters: { amount: 2 } });
    await settle();
    await settle();

    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['12', '20']);
    expect(worker.posted.at(-1)?.filters).toEqual([
      expect.objectContaining({ operator: 'contains', value: '2' }),
    ]);
    expect(worker.posted.at(-1)?.projection.columns['filter:0']).toEqual(['12', '20', '3']);
  });

  test('clamps fractional auto-worker options and still runs the worker immediately', async () => {
    const worker = new BrowserEngineWorker();
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, score: 1 }, { id: 2, score: 2 }]}
        rowKey="id"
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.DESC }]}
        dataProcessing={{
          mode: 'auto',
          workerThreshold: -2.8,
          debounce: -4.2,
          workerTimeout: -10.7,
          workerFactory: () => worker as unknown as Worker,
        }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settle();
    await settle();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    expect(table.getDataProcessingState()).toMatchObject({
      status: 'ready',
      requestedMode: 'auto',
      mode: 'worker',
    });
    expect(worker.posted).toHaveLength(1);
    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['2', '1']);
  });

  test('falls back for a built-in date filter that cannot be projected to a worker', async () => {
    const factory = vi.fn(() => new BrowserEngineWorker() as unknown as Worker);
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, date: '2026-01-01' }, { id: 2, date: '2025-01-01' }]}
        rowKey="id"
        dataProcessing={{ mode: 'worker', debounce: 0, workerFactory: factory }}
      >
        <HTableColumn title="Date" field="date" filterable filterType="date-picker" />
      </HTable>
    ));
    await settle();
    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({ filters: { date: '2026-01-01' } });
    await settle();
    await settle();

    expect(factory).not.toHaveBeenCalled();
    expect(table.getDataProcessingState()).toMatchObject({
      status: 'ready',
      mode: 'sync',
      fallbackReason: 'custom-operation',
    });
  });

  test('falls back to sync for non-primitive worker values', async () => {
    const active = { code: 'active' };
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, status: active }, { id: 2, status: { code: 'idle' } }]}
        rowKey="id"
        dataProcessing={{ mode: 'worker', debounce: 0 }}
      >
        <HTableColumn
          title="Status"
          field="status"
          filterable
          filterType="select"
          filterOptions={{ options: [] }}
        />
      </HTable>
    ));
    await settle();
    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({ filters: { status: [active] } });
    await settle();
    await settle();

    expect(wrapper.findAll('tbody .h-table__row')).toHaveLength(0);
    expect(table.getDataProcessingState()).toMatchObject({
      status: 'ready',
      mode: 'sync',
      fallbackReason: 'custom-operation',
    });
  });

  test('cancels a debounced worker request before a worker is constructed', async () => {
    const factory = vi.fn(() => new BrowserEngineWorker() as unknown as Worker);
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, score: 1 }, { id: 2, score: 2 }]}
        rowKey="id"
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.DESC }]}
        dataProcessing={{ mode: 'worker', debounce: 100, workerFactory: factory }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await nextTick();
    await nextTick();
    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.cancelDataProcessing();
    expect(table.getDataProcessingState()).toMatchObject({ status: 'cancelled', duration: 0 });
    await new Promise(resolve => setTimeout(resolve, 120));
    expect(factory).not.toHaveBeenCalled();
    expect(table.getDataProcessingState().status).toBe('cancelled');
  });
});
