import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn, HTableSortOrderEnum } from '..';
import type { HTableDataProcessingState } from '../src/utils/types';
import { processTableData } from '../src/data-processing/engine';
import { H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION } from '../src/data-processing/protocol';
import type { HTableDataProcessingRequest } from '../src/data-processing/protocol';

async function settleProcessing() {
  await nextTick();
  await nextTick();
  await Promise.resolve();
  await nextTick();
}

class EngineBackedWorker extends EventTarget {
  readonly posted: HTableDataProcessingRequest[] = [];
  private terminated = false;
  readonly terminate = vi.fn(() => {
    this.terminated = true;
  });

  constructor(
    private readonly delayFor: (request: HTableDataProcessingRequest) => number = () => 0,
  ) {
    super();
  }

  postMessage(request: HTableDataProcessingRequest) {
    this.posted.push(request);
    const { indices } = processTableData(request);
    const respond = () => {
      if (this.terminated) return;
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
    };
    const delay = this.delayFor(request);
    if (delay > 0) setTimeout(respond, delay);
    else queueMicrotask(respond);
  }
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Table data processing integration', () => {
  test('runs flat filtering and stable sorting through the centralized sync pipeline', async () => {
    const data = ref([
      { id: 1, name: 'Alice', score: 20 },
      { id: 2, name: 'Bob', score: 10 },
      { id: 3, name: 'Carol', score: 30 },
    ]);
    const onProcessingChange = vi.fn();
    const wrapper = mount(() => (
      <HTable
        data={data.value}
        rowKey="id"
        watchData={false}
        dataProcessing="sync"
        onDataProcessingChange={onProcessingChange}
      >
        <HTableColumn title="Name" field="name" filterable />
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({
      filters: { name: 'a' },
      sorting: [{ columnKey: 'score', field: 'score', order: HTableSortOrderEnum.DESC }],
    });
    await settleProcessing();
    await settleProcessing();

    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual([
      'Carol30',
      'Alice20',
    ]);
    expect(table.getDataProcessingState()).toMatchObject({
      status: 'ready',
      requestedMode: 'sync',
      mode: 'sync',
      rowCount: 3,
      resultRowCount: 2,
    });
    expect(onProcessingChange).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ready', resultRowCount: 2 }),
    );

    data.value = [...data.value, { id: 4, name: 'David', score: 40 }];
    await settleProcessing();
    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual([
      'David40',
      'Carol30',
      'Alice20',
    ]);
  });

  test('uses sync below the auto threshold and reports the reason', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[
          { id: 1, score: 1 },
          { id: 2, score: 2 },
        ]}
        rowKey="id"
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.DESC }]}
        dataProcessing={{ mode: 'auto', workerThreshold: 100, debounce: 0 }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settleProcessing();
    await settleProcessing();

    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['2', '1']);
    expect(
      wrapper.findComponent(HTable).getCurrentComponent().exposed?.getDataProcessingState(),
    ).toMatchObject({
      status: 'ready',
      mode: 'sync',
      fallbackReason: 'below-threshold',
    });
  });

  test('keeps sync as the default when an options object omits mode', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[
          { id: 1, score: 1 },
          { id: 2, score: 2 },
        ]}
        rowKey="id"
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.DESC }]}
        dataProcessing={{ workerThreshold: 0, debounce: 0 }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settleProcessing();
    await settleProcessing();

    expect(
      wrapper.findComponent(HTable).getCurrentComponent().exposed?.getDataProcessingState(),
    ).toMatchObject({ status: 'ready', requestedMode: 'sync', mode: 'sync' });
  });

  test('falls back when Worker is unavailable without changing results', async () => {
    vi.stubGlobal('Worker', undefined);
    const wrapper = mount(() => (
      <HTable
        data={[
          { id: 1, score: 1 },
          { id: 2, score: 2 },
        ]}
        rowKey="id"
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.DESC }]}
        dataProcessing={{ mode: 'worker', workerThreshold: 0, debounce: 0 }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settleProcessing();
    await settleProcessing();

    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['2', '1']);
    expect(
      wrapper.findComponent(HTable).getCurrentComponent().exposed?.getDataProcessingState(),
    ).toMatchObject({
      status: 'ready',
      requestedMode: 'worker',
      mode: 'sync',
      fallbackReason: 'worker-unavailable',
    });
  });

  test('keeps single-select coercion identical in Worker and sync modes', async () => {
    const worker = new EngineBackedWorker();
    const wrapper = mount(() => (
      <HTable
        data={[
          { id: 1, value: 1 },
          { id: 2, value: 2 },
        ]}
        rowKey="id"
        dataProcessing={{
          mode: 'worker',
          debounce: 0,
          workerFactory: () => worker as unknown as Worker,
        }}
      >
        <HTableColumn
          title="Value"
          field="value"
          filterable
          filterType="select"
          filterOptions={{ multiple: false }}
        />
      </HTable>
    ));
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({ filters: { value: '1' } });
    await settleProcessing();
    await settleProcessing();

    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['1']);
    expect(table.getDataProcessingState()).toMatchObject({ status: 'ready', mode: 'worker' });
  });

  test('runs custom operations synchronously when worker mode is requested', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ]}
        rowKey="id"
        dataProcessing={{ mode: 'worker', workerThreshold: 0, debounce: 0 }}
      >
        <HTableColumn
          title="Name"
          field="name"
          filterable
          filterMethod={(value: string, row: { name: string }) => row.name.endsWith(value)}
        />
      </HTable>
    ));
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({ filters: { name: 'e' } });
    await settleProcessing();
    await settleProcessing();

    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['Alice']);
    expect(table.getDataProcessingState()).toMatchObject({
      mode: 'sync',
      fallbackReason: 'custom-operation',
    });
  });

  test('does not execute a throwing synchronous custom filter twice', async () => {
    const filterMethod = vi.fn(() => {
      throw new Error('custom filter failed');
    });
    const wrapper = mount(() => (
      <HTable
        data={[
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ]}
        rowKey="id"
        dataProcessing="sync"
      >
        <HTableColumn title="Name" field="name" filterable filterMethod={filterMethod} />
      </HTable>
    ));
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({ filters: { name: 'A' } });
    await settleProcessing();
    await settleProcessing();

    expect(filterMethod).toHaveBeenCalledOnce();
    expect(table.getDataProcessingState()).toMatchObject({ status: 'error', mode: 'sync' });
  });

  test('does not reschedule when a parent recreates equivalent inline options', async () => {
    const processing = ref<HTableDataProcessingState>();
    const data = [
      { id: 1, score: 1 },
      { id: 2, score: 2 },
    ];
    const defaultSort = [{ prop: 'score', order: HTableSortOrderEnum.DESC }];
    const onProcessingChange = vi.fn((state: HTableDataProcessingState) => {
      processing.value = state;
    });
    const wrapper = mount(() => (
      <div data-revision={processing.value?.revision}>
        <HTable
          data={data}
          rowKey="id"
          defaultSort={defaultSort}
          dataProcessing={{ mode: 'auto', workerThreshold: 100, debounce: 0 }}
          onDataProcessingChange={onProcessingChange}
        >
          <HTableColumn title="Score" field="score" sortable />
        </HTable>
      </div>
    ));
    await settleProcessing();
    await settleProcessing();

    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['2', '1']);
    expect(processing.value).toMatchObject({ status: 'ready', fallbackReason: 'below-threshold' });
    // The initial empty-column pass and the mounted-column pass each emit processing + ready.
    expect(onProcessingChange).toHaveBeenCalledTimes(4);
  });

  test('reprocesses an active filter when stable filter options change', async () => {
    const multiple = ref(false);
    const data = [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
    ];
    const wrapper = mount(() => (
      <HTable data={data} rowKey="id" dataProcessing="sync">
        <HTableColumn
          title="Value"
          field="value"
          filterable
          filterType="select"
          filterOptions={{ multiple: multiple.value }}
        />
      </HTable>
    ));
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({ filters: { value: '1' } });
    await settleProcessing();
    await settleProcessing();
    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['1']);

    multiple.value = true;
    await settleProcessing();
    await settleProcessing();
    expect(wrapper.findAll('tbody .h-table__row')).toHaveLength(0);
  });

  test('preserves expanded-row state while a filter temporarily hides the row', async () => {
    const data = [
      { id: 1, name: 'Alice', detail: 'Alice details' },
      { id: 2, name: 'Bob', detail: 'Bob details' },
    ];
    const wrapper = mount(() => (
      <HTable data={data} rowKey="id">
        <HTableColumn type="expand">
          {{
            expand: ({ row }: { row: { detail: string } }) => (
              <span class="expanded-content">{row.detail}</span>
            ),
          }}
        </HTableColumn>
        <HTableColumn title="Name" field="name" filterable />
      </HTable>
    ));
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    await wrapper.find('tbody .h-table__expand-icon').trigger('click');
    await settleProcessing();
    expect(wrapper.find('.expanded-content').text()).toBe('Alice details');

    table.setState({ filters: { name: 'Bob' } });
    await settleProcessing();
    await settleProcessing();
    expect(wrapper.find('.expanded-content').exists()).toBe(false);
    expect(table.getState().expanded).toEqual([1]);

    table.setState({ filters: { name: undefined } });
    await settleProcessing();
    await settleProcessing();
    expect(wrapper.find('.expanded-content').text()).toBe('Alice details');
  });

  test('cleans legacy row visibility when a filtered dynamic column unmounts', async () => {
    const showFilter = ref(true);
    const data = [
      { id: 1, name: 'Alice', children: [] },
      { id: 2, name: 'Bob', children: [] },
    ];
    const wrapper = mount(() => (
      <HTable data={data} rowKey="id">
        <HTableColumn title="ID" field="id" />
        {showFilter.value && <HTableColumn title="Name" field="name" filterable />}
      </HTable>
    ));
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({ filters: { name: 'Alice' } });
    await settleProcessing();
    await settleProcessing();
    expect(wrapper.findAll('tbody .h-table__row')).toHaveLength(1);

    showFilter.value = false;
    await settleProcessing();
    await settleProcessing();
    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['1', '2']);
  });

  test('reuses an idle Worker across sequential queries and disposes it on unmount', async () => {
    const workers: EngineBackedWorker[] = [];
    const data = [
      { id: 1, score: 1 },
      { id: 2, score: 2 },
    ];
    const wrapper = mount(() => (
      <HTable
        data={data}
        rowKey="id"
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.ASC }]}
        dataProcessing={{
          mode: 'worker',
          debounce: 0,
          workerFactory: () => {
            const worker = new EngineBackedWorker();
            workers.push(worker);
            return worker as unknown as Worker;
          },
        }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settleProcessing();
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({
      sorting: [{ columnKey: 'score', field: 'score', order: HTableSortOrderEnum.DESC }],
    });
    await settleProcessing();
    await settleProcessing();

    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['2', '1']);
    expect(workers).toHaveLength(1);
    expect(workers[0].posted).toHaveLength(2);
    expect(workers[0].terminate).not.toHaveBeenCalled();

    wrapper.unmount();
    expect(workers[0].terminate).toHaveBeenCalledOnce();
  });

  test('uses a replaced Worker factory for the next query without reactive rescheduling', async () => {
    const firstWorkers: EngineBackedWorker[] = [];
    const secondWorkers: EngineBackedWorker[] = [];
    const firstFactory = () => {
      const worker = new EngineBackedWorker();
      firstWorkers.push(worker);
      return worker as unknown as Worker;
    };
    const secondFactory = () => {
      const worker = new EngineBackedWorker();
      secondWorkers.push(worker);
      return worker as unknown as Worker;
    };
    const workerFactory = ref(firstFactory);
    const data = [
      { id: 1, score: 1 },
      { id: 2, score: 2 },
    ];
    const defaultSort = [{ prop: 'score', order: HTableSortOrderEnum.ASC }];
    const wrapper = mount(() => (
      <HTable
        data={data}
        rowKey="id"
        defaultSort={defaultSort}
        dataProcessing={{ mode: 'worker', debounce: 0, workerFactory: workerFactory.value }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settleProcessing();
    await settleProcessing();
    expect(firstWorkers).toHaveLength(1);

    workerFactory.value = secondFactory;
    await nextTick();
    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    table.setState({
      sorting: [{ columnKey: 'score', field: 'score', order: HTableSortOrderEnum.DESC }],
    });
    await settleProcessing();
    await settleProcessing();

    expect(firstWorkers[0].terminate).toHaveBeenCalledOnce();
    expect(secondWorkers).toHaveLength(1);
    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['2', '1']);
  });

  test('resolves a refreshed task as cancelled when a newer debounced query supersedes it', async () => {
    let requestSequence = 0;
    const workers: EngineBackedWorker[] = [];
    const data = [
      { id: 1, score: 1 },
      { id: 2, score: 2 },
    ];
    const wrapper = mount(() => (
      <HTable
        data={data}
        rowKey="id"
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.ASC }]}
        dataProcessing={{
          mode: 'worker',
          debounce: 10,
          workerFactory: () => {
            const worker = new EngineBackedWorker(() => (++requestSequence === 2 ? 100 : 0));
            workers.push(worker);
            return worker as unknown as Worker;
          },
        }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await new Promise(resolve => setTimeout(resolve, 15));
    await settleProcessing();
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    const refreshed = table.refreshDataProcessing() as Promise<HTableDataProcessingState>;
    await nextTick();
    table.setState({
      sorting: [{ columnKey: 'score', field: 'score', order: HTableSortOrderEnum.DESC }],
    });
    await nextTick();

    await expect(refreshed).resolves.toMatchObject({ status: 'cancelled' });
    await new Promise(resolve => setTimeout(resolve, 15));
    await settleProcessing();
    expect(table.getDataProcessingState()).toMatchObject({ status: 'ready', mode: 'worker' });
    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['2', '1']);
    expect(workers.some(worker => worker.terminate.mock.calls.length > 0)).toBe(true);
  });

  test('cancels and disposes an in-flight custom worker', async () => {
    class NeverSettlesWorker extends EventTarget {
      terminate = vi.fn();
      postMessage() {}
    }

    const workers: NeverSettlesWorker[] = [];
    const wrapper = mount(() => (
      <HTable
        data={[
          { id: 1, score: 1 },
          { id: 2, score: 2 },
        ]}
        rowKey="id"
        defaultSort={[{ prop: 'score', order: HTableSortOrderEnum.DESC }]}
        dataProcessing={{
          mode: 'worker',
          workerThreshold: 0,
          debounce: 0,
          workerFactory: () => {
            const worker = new NeverSettlesWorker();
            workers.push(worker);
            return worker as unknown as Worker;
          },
        }}
      >
        <HTableColumn title="Score" field="score" sortable />
      </HTable>
    ));
    await settleProcessing();

    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    const pending = table.refreshDataProcessing() as Promise<HTableDataProcessingState>;
    await nextTick();
    expect(table.getDataProcessingState().status).toBe('processing');

    table.cancelDataProcessing();
    await expect(pending).resolves.toMatchObject({ status: 'cancelled' });
    expect(table.getDataProcessingState().status).toBe('cancelled');
    expect(workers.some(worker => worker.terminate.mock.calls.length > 0)).toBe(true);
  });
});
