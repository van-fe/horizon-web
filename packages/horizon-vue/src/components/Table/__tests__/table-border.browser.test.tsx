import { createApp } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import { HTable, HTableColumn } from '..';
import '../../../styles/base.scss';
import '../../../styles/global-variables.scss';
import '../src/style/index.scss';

const mountedApps: ReturnType<typeof createApp>[] = [];

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
});

describe('Table grouped header borders', () => {
  it('keeps the divider after a nested header that is not the table edge', async () => {
    const root = document.createElement('div');
    document.body.append(root);

    const app = createApp({
      render: () => (
        <HTable data={[{ account: 'Northwind', market: 'APAC', hub: 'Singapore', arr: '$248k' }]}>
          <HTableColumn title="Account" field="account" />
          <HTableColumn title="Region">
            <HTableColumn title="Market" field="market" />
            <HTableColumn title="Hub" field="hub" />
          </HTableColumn>
          <HTableColumn title="ARR" field="arr" />
        </HTable>
      ),
    });
    mountedApps.push(app);
    app.mount(root);
    await new Promise(resolve => requestAnimationFrame(resolve));

    const headerCells = [...root.querySelectorAll<HTMLTableCellElement>('thead th')];
    const hub = headerCells.find(cell => cell.textContent === 'Hub');
    const arr = headerCells.find(cell => cell.textContent === 'ARR');

    expect(hub).toBeInstanceOf(HTMLTableCellElement);
    expect(arr).toBeInstanceOf(HTMLTableCellElement);
    expect(getComputedStyle(hub!).borderRightWidth).toBe('1px');
    expect(getComputedStyle(arr!).borderRightWidth).toBe('0px');
  });
});
