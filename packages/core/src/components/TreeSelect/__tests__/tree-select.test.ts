import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { TreeOption } from '../../Tree';
import {
  TREE_SELECT_DEFAULTS,
  TreeSelectController,
  cloneTreeSelectModelValue,
  createTreeSelectTags,
  equalTreeSelectValues,
  formatTreeSelectSummary,
  getTreeSelectSelectedNodes,
  isTreeSelectModelValue,
  isTreeSelectReserveKeyword,
  normalizeTreeSelectValue,
  resolveTreeSelectDisplay,
  resolveTreeSelectKeywordAfterSelection,
  treeSelectApiContract,
  treeSelectManifest,
} from '..';

const treeData: TreeOption<string>[] = [
  {
    value: 'root',
    label: 'Root',
    children: [
      { value: 'alpha', label: 'Alpha' },
      { value: 'disabled', label: 'Disabled', disabled: true },
      {
        value: 'branch',
        label: 'Branch',
        children: [{ value: 2, label: 'Numeric' }],
      },
    ],
  },
  { value: 'other', label: 'Other' },
];

describe('TreeSelect contract', () => {
  it('defines shared defaults, validators, manifest and package exports', () => {
    const nullableModel: unknown = null;
    if (isTreeSelectModelValue(nullableModel))
      expectTypeOf(nullableModel).toEqualTypeOf<TreeSelectModelValue>();
    expect(TREE_SELECT_DEFAULTS).toMatchObject({
      trigger: 'click',
      initialValue: [],
      multiple: false,
      multipleLimit: Number.POSITIVE_INFINITY,
      needConfirm: false,
      reserveKeyword: true,
    });
    expect(isTreeSelectModelValue('alpha')).toBe(true);
    expect(isTreeSelectModelValue(2)).toBe(true);
    expect(isTreeSelectModelValue(['alpha', 2])).toBe(true);
    expect(isTreeSelectModelValue(null)).toBe(true);
    expect(isTreeSelectModelValue(undefined)).toBe(true);
    expect(isTreeSelectModelValue(Number.NaN)).toBe(false);
    expect(isTreeSelectModelValue([{}])).toBe(false);
    expect(isTreeSelectReserveKeyword('reserve-special')).toBe(true);
    expect(isTreeSelectReserveKeyword('invalid')).toBe(false);
    expect(treeSelectApiContract.validators?.size?.('medium')).toBe(true);
    expect(treeSelectApiContract.validators?.treeSize?.('huge')).toBe(true);
    expect(treeSelectApiContract.validators?.placement?.('bottom-start')).toBe(true);
    expect(treeSelectApiContract.validators?.multipleLimit?.(-1)).toBe(false);
    expect(treeSelectManifest.contract.props.map(field => field.name)).toContain('treeData');
    expect(treeSelectManifest.contract.emits.map(field => field.name)).toContain(
      'pendingValueChange',
    );
    expect(treeSelectManifest.contract.exposes.map(field => field.name)).toContain('confirm');
  });
});

describe('TreeSelect presentation', () => {
  const controller = new TreeSelectController({ treeData, multiple: true });
  const tree = controller.snapshot.tree;

  it('creates tags in value order and preserves labels for missing values', () => {
    const tags = createTreeSelectTags(tree, ['alpha', 'disabled', 'missing'], {
      previousLabels: new Map([['missing', 'Previous']]),
    });
    expect(tags.map(tag => tag.label)).toEqual(['Alpha', 'Disabled', 'Previous']);
    expect(tags.map(tag => tag.removable)).toEqual([true, false, true]);
    expect(tags[0].node?.originOption.label).toBe('Alpha');
    expect(tags[2].node).toBeUndefined();
    expect(createTreeSelectTags(tree, ['alpha'], { disabled: true })[0]).toMatchObject({
      disabled: true,
      removable: false,
    });
  });

  it('honors strict removal for descendants of disabled nodes', () => {
    const disabledTree = new TreeSelectController({
      treeData: [
        {
          value: 'locked',
          label: 'Locked',
          disabled: true,
          children: [{ value: 'nested', label: 'Nested' }],
        },
      ],
    }).snapshot.tree;
    expect(createTreeSelectTags(disabledTree, ['nested'])[0].removable).toBe(false);
    expect(
      createTreeSelectTags(disabledTree, ['nested'], { checkStrictly: true })[0].removable,
    ).toBe(true);
  });

  it('formats summaries, display text and selected-node projection', () => {
    expect(
      formatTreeSelectSummary(2, { text: 'Chosen', singularText: 'item', pluralText: 'items' }),
    ).toBe('Chosen (2)');
    expect(formatTreeSelectSummary(1, { singularText: 'item', pluralText: 'items' })).toBe('item');
    expect(formatTreeSelectSummary(3, { singularText: 'item', pluralText: 'items' })).toBe(
      'items (3)',
    );
    expect(formatTreeSelectSummary(0, { singularText: 'item', pluralText: 'items' })).toBe('');
    expect(resolveTreeSelectDisplay(tree, ['alpha'])).toBe('Alpha');
    expect(
      resolveTreeSelectDisplay(tree, ['missing'], {
        previousLabels: new Map([['missing', 'Old']]),
      }),
    ).toBe('Old');
    expect(resolveTreeSelectDisplay(tree, [], { filterable: true, filterValue: 'alp' })).toBe(
      'alp',
    );
    expect(resolveTreeSelectDisplay(tree, ['alpha'], { multiple: true })).toBe(' ');
    expect(
      resolveTreeSelectDisplay(tree, ['alpha', 'other'], {
        multiple: true,
        useStatistic: true,
        singularText: 'node',
        pluralText: 'nodes',
      }),
    ).toBe('nodes (2)');
    expect(resolveTreeSelectDisplay(tree, [], { multiple: true })).toBe('');
    expect(
      getTreeSelectSelectedNodes(tree, ['other', 'missing', 'alpha']).map(node => node.value),
    ).toEqual(['other', 'alpha']);
  });

  it('resolves every keyword-retention policy without mutating inputs', () => {
    expect(resolveTreeSelectKeywordAfterSelection(false, true, 'a', 'a')).toEqual({
      inputValue: '',
      filterValue: '',
    });
    expect(resolveTreeSelectKeywordAfterSelection('reserve-deselect', true, 'a', 'a')).toEqual({
      inputValue: '',
      filterValue: '',
    });
    expect(resolveTreeSelectKeywordAfterSelection('reserve-deselect', false, 'a', 'a')).toEqual({
      inputValue: 'a',
      filterValue: 'a',
    });
    expect(resolveTreeSelectKeywordAfterSelection('reserve-special', true, 'a', 'a')).toEqual({
      inputValue: '',
      filterValue: 'a',
    });
    expect(resolveTreeSelectKeywordAfterSelection(true, true, 'a', 'a')).toEqual({
      inputValue: 'a',
      filterValue: 'a',
    });
  });
});

describe('TreeSelect controller values', () => {
  it('normalizes and clones public values', () => {
    const input = ['alpha', 2];
    expect(normalizeTreeSelectValue(undefined)).toEqual([]);
    expect(normalizeTreeSelectValue(null)).toEqual([]);
    expect(normalizeTreeSelectValue(2)).toEqual([2]);
    expect(normalizeTreeSelectValue(input)).toEqual(input);
    expect(normalizeTreeSelectValue(input)).not.toBe(input);
    expect(equalTreeSelectValues(input, ['alpha', 2])).toBe(true);
    expect(equalTreeSelectValues(input, [2, 'alpha'])).toBe(false);
    expect(equalTreeSelectValues(input, ['alpha'])).toBe(false);
    expect(cloneTreeSelectModelValue(input)).toEqual(input);
    expect(cloneTreeSelectModelValue(input)).not.toBe(input);
    expect(cloneTreeSelectModelValue(null)).toBeNull();
  });

  it('supports uncontrolled single selection and closes after selection', () => {
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();
    const controller = new TreeSelectController({
      defaultValue: 'alpha',
      defaultOpen: true,
      treeData,
      checkStrictly: true,
      onValueChange,
      onOpenChange,
    });
    const result = controller.select(2, 'keyboard');
    expect(result).toMatchObject({
      status: 'selected',
      committed: true,
      value: 2,
      pendingValue: 2,
    });
    expect(controller.snapshot).toMatchObject({ value: 2, open: false });
    expect(onValueChange).toHaveBeenCalledWith(2, { reason: 'select', committed: true });
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'select' });
  });

  it('stages and confirms values without re-running selection interactions', () => {
    const onValueChange = vi.fn();
    const onPendingValueChange = vi.fn();
    const onConfirm = vi.fn();
    const controller = new TreeSelectController({
      defaultValue: ['alpha'],
      treeData,
      multiple: true,
      needConfirm: true,
      defaultOpen: true,
      onValueChange,
      onPendingValueChange,
      onConfirm,
    });
    const staged = controller.stageValues(['alpha', 2]);
    expect(staged).toMatchObject({
      changed: true,
      committed: false,
      value: ['alpha'],
      pendingValue: ['alpha', 2],
    });
    expect(onPendingValueChange).toHaveBeenCalledWith(['alpha', 2], {
      reason: 'select',
      committed: false,
    });
    expect(controller.confirm()).toEqual(['alpha', 2]);
    expect(controller.snapshot).toMatchObject({ value: ['alpha', 2], open: false });
    expect(onValueChange).toHaveBeenCalledWith(['alpha', 2], {
      reason: 'confirm',
      committed: true,
    });
    expect(onConfirm).toHaveBeenCalledWith(['alpha', 2]);
  });

  it('supports cancel and each dismissal policy', () => {
    const reset = new TreeSelectController({
      defaultValue: ['alpha'],
      treeData,
      multiple: true,
      needConfirm: true,
      defaultOpen: true,
    });
    reset.stageValues(['other']);
    expect(reset.cancel()).toEqual(['alpha']);
    expect(reset.snapshot.pendingValue).toEqual(['alpha']);

    const nextOpen = new TreeSelectController({
      defaultValue: ['alpha'],
      treeData,
      multiple: true,
      needConfirm: true,
      dismissBehavior: 'reset-on-open',
      defaultOpen: true,
    });
    nextOpen.stageValues(['other']);
    nextOpen.setOpen(false, 'outside-pointer');
    expect(nextOpen.snapshot.value).toEqual(['alpha']);
    expect(nextOpen.snapshot.pendingValue).toEqual(['other']);
    nextOpen.setOpen(true, 'trigger');
    expect(nextOpen.snapshot.pendingValue).toEqual(['alpha']);

    const preserve = new TreeSelectController({
      defaultValue: ['alpha'],
      treeData,
      multiple: true,
      needConfirm: true,
      dismissBehavior: 'preserve',
      defaultOpen: true,
    });
    preserve.stageValues(['other']);
    preserve.setOpen(false, 'escape');
    preserve.setOpen(true, 'trigger');
    expect(preserve.snapshot.pendingValue).toEqual(['other']);
  });

  it('offers strict and optimistic controlled proposals', () => {
    const strictChange = vi.fn();
    const strict = new TreeSelectController({
      value: 'alpha',
      treeData,
      checkStrictly: true,
      controlledPolicy: 'strict',
      onValueChange: strictChange,
    });
    expect(strict.stageValues([2])).toMatchObject({
      value: 'alpha',
      pendingValue: 2,
      committed: true,
    });
    expect(strict.snapshot.value).toBe('alpha');
    expect(strictChange).toHaveBeenCalledWith(2, { reason: 'select', committed: true });
    strict.syncValue(2);
    expect(strict.snapshot).toMatchObject({ value: 2, pendingValue: 2 });

    const optimistic = new TreeSelectController({
      value: 'alpha',
      treeData,
      checkStrictly: true,
      controlledPolicy: 'optimistic',
    });
    optimistic.stageValues([2]);
    expect(optimistic.snapshot.value).toBe(2);
    optimistic.syncValue('alpha');
    expect(optimistic.snapshot.value).toBe('alpha');
  });

  it('preserves unknown, numeric and explicit empty value shapes', () => {
    const unknown = new TreeSelectController({
      value: 'external',
      treeData,
      controlledPolicy: 'optimistic',
    });
    expect(unknown.snapshot).toMatchObject({ value: 'external', values: ['external'] });
    unknown.syncValue(2);
    expect(unknown.snapshot).toMatchObject({ value: 2, values: [2] });
    unknown.syncValue(null);
    expect(unknown.snapshot).toMatchObject({ value: null, values: [] });
    unknown.syncValue(undefined);
    expect(unknown.snapshot.value).toBeUndefined();

    const multiple = new TreeSelectController({ value: [], treeData, multiple: true });
    expect(multiple.snapshot.value).toEqual([]);
  });

  it('converges values when multiple mode and limits change', () => {
    const onValueChange = vi.fn();
    const controller = new TreeSelectController({
      defaultValue: ['alpha', 'other', 2],
      treeData,
      multiple: true,
      multipleLimit: 3,
      onValueChange,
    });
    controller.setOptions({ multipleLimit: 2 });
    expect(controller.snapshot.value).toEqual(['alpha', 'other']);
    controller.setOptions({ multiple: false });
    expect(controller.snapshot.value).toBe('alpha');
    expect(onValueChange).toHaveBeenLastCalledWith('alpha', {
      reason: 'mode-change',
      committed: true,
    });
    controller.setUncontrolledValue(2);
    expect(controller.snapshot).toMatchObject({ controlled: false, value: 2 });
  });

  it('silently synchronizes draft state for renderer reconstruction', () => {
    const onPendingValueChange = vi.fn();
    const controller = new TreeSelectController({
      value: ['alpha'],
      pendingValue: ['other', 2],
      treeData,
      multiple: true,
      multipleLimit: 1,
      needConfirm: true,
      onPendingValueChange,
    });
    expect(controller.snapshot.pendingValue).toEqual(['other']);
    controller.syncPendingValue([2]);
    expect(controller.snapshot.pendingValue).toEqual([2]);
    expect(onPendingValueChange).not.toHaveBeenCalled();
  });

  it('rebuilds field-mapped data and preserves proposals during tree changes', () => {
    const mapped = [{ id: 'mapped', text: 'Mapped' }] as unknown as TreeOption<string>[];
    const controller = new TreeSelectController({ defaultValue: 'mapped', treeData: [] });
    controller.setTreeData(mapped, { value: 'id', label: 'text' });
    expect(controller.snapshot.tree.byValue.get('mapped')?.stringLabel).toBe('Mapped');
    expect(controller.snapshot.value).toBe('mapped');
    controller.setOptions({ treeData, fieldMap: {} });
    expect(controller.snapshot.tree.byValue.get('alpha')?.stringLabel).toBe('Alpha');
  });
});

describe('TreeSelect direct operations and guards', () => {
  it('ignores confirm and cancel commands outside an enabled confirmation session', () => {
    const onValueChange = vi.fn();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const controller = new TreeSelectController({
      defaultValue: 'alpha',
      treeData,
      onValueChange,
      onConfirm,
      onCancel,
    });
    controller.syncPendingValue('other');
    expect(controller.confirm()).toBe('alpha');
    expect(controller.cancel()).toBe('alpha');
    controller.setOptions({ needConfirm: true, disabled: true });
    controller.syncPendingValue('other');
    expect(controller.confirm()).toBe('alpha');
    expect(controller.cancel()).toBe('alpha');
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('preserves initialValue shape on direct clear and resets filtering', () => {
    const onValueChange = vi.fn();
    const onFilterValueChange = vi.fn();
    const onClear = vi.fn();
    const controller = new TreeSelectController({
      value: 'alpha',
      initialValue: [],
      treeData,
      filterValue: 'query',
      controlledPolicy: 'optimistic',
      onValueChange,
      onFilterValueChange,
      onClear,
    });
    expect(controller.clear()).toMatchObject({
      committed: true,
      value: [],
      pendingValue: undefined,
    });
    expect(controller.snapshot.value).toEqual([]);
    expect(onValueChange).toHaveBeenCalledWith([], { reason: 'clear', committed: true });
    expect(onFilterValueChange).toHaveBeenCalledWith('', { reason: 'clear' });
    expect(onClear).toHaveBeenCalledWith([]);
  });

  it('retains disabled multiple values during clear and only falls back when none remain', () => {
    const onValueChange = vi.fn();
    const controller = new TreeSelectController({
      defaultValue: ['alpha', 'disabled'],
      initialValue: ['other'],
      treeData,
      multiple: true,
      checkStrictly: true,
      onValueChange,
    });
    expect(controller.clear()).toMatchObject({ value: ['disabled'], pendingValue: ['disabled'] });
    expect(onValueChange).toHaveBeenCalledWith(['disabled'], {
      reason: 'clear',
      committed: true,
    });

    const allRemovable = new TreeSelectController({
      defaultValue: ['alpha'],
      initialValue: ['other'],
      treeData,
      multiple: true,
    });
    expect(allRemovable.clear()).toMatchObject({ value: ['other'] });
  });

  it('can keep clear and removal inside the confirmation session', () => {
    const controller = new TreeSelectController({
      defaultValue: ['alpha', 'other'],
      treeData,
      multiple: true,
      needConfirm: true,
      clearBehavior: 'session',
      removeBehavior: 'session',
    });
    expect(controller.removeValue('alpha')).toMatchObject({
      changed: true,
      committed: false,
      value: ['alpha', 'other'],
      pendingValue: ['other'],
    });
    expect(controller.clear()).toMatchObject({ committed: false, pendingValue: [] });
    expect(controller.snapshot.value).toEqual(['alpha', 'other']);
  });

  it('directly removes tags by default and ignores missing values', () => {
    const onValueChange = vi.fn();
    const controller = new TreeSelectController({
      defaultValue: ['alpha', 'other'],
      treeData,
      multiple: true,
      needConfirm: true,
      onValueChange,
    });
    expect(controller.removeValue('alpha')).toMatchObject({ committed: true, value: ['other'] });
    expect(controller.removeValue('missing')).toMatchObject({ changed: false, committed: false });
    expect(onValueChange).toHaveBeenCalledOnce();
  });

  it('tracks filter/open state and rejects duplicate or disabled transitions', () => {
    const onOpenChange = vi.fn();
    const onFilterValueChange = vi.fn();
    const controller = new TreeSelectController({ treeData, onOpenChange, onFilterValueChange });
    expect(controller.setFilterValue('alpha')).toBe(true);
    expect(controller.setFilterValue('alpha')).toBe(false);
    expect(controller.setOpen(true, 'keyboard')).toBe(true);
    expect(controller.setOpen(true, 'trigger')).toBe(false);
    controller.setOptions({ disabled: true });
    expect(controller.snapshot.open).toBe(false);
    expect(controller.setOpen(true, 'trigger')).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'disabled' });
    expect(onFilterValueChange).toHaveBeenCalledWith('', { reason: 'close' });
  });

  it('proposes controlled open state and waits for strict external synchronization', () => {
    const onOpenChange = vi.fn();
    const strict = new TreeSelectController({ open: false, treeData, onOpenChange });
    expect(strict.setOpen(true, 'trigger')).toBe(true);
    expect(strict.snapshot.open).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'trigger' });
    strict.syncOpen(true);
    expect(strict.snapshot.open).toBe(true);

    const optimistic = new TreeSelectController({
      open: false,
      treeData,
      controlledPolicy: 'optimistic',
    });
    optimistic.setOpen(true, 'trigger');
    expect(optimistic.snapshot.open).toBe(true);
    optimistic.syncOpen(false);
    expect(optimistic.snapshot.open).toBe(false);
    optimistic.setUncontrolledOpen(true);
    expect(optimistic.snapshot.open).toBe(true);
  });

  it('respects disabled controller and Tree selection statuses', () => {
    const controller = new TreeSelectController({
      defaultValue: 'alpha',
      treeData,
      disabled: true,
      checkStrictly: true,
    });
    expect(controller.select(2)).toMatchObject({ committed: false, value: 'alpha' });
    expect(controller.setSelected(2, true)).toMatchObject({ committed: false, value: 'alpha' });
    expect(controller.stageValues([2])).toMatchObject({ changed: false, committed: false });
    expect(controller.clear()).toMatchObject({ changed: false, committed: false });
    expect(controller.removeValue('alpha')).toMatchObject({ changed: false, committed: false });

    const enabled = new TreeSelectController({ treeData, multiple: true });
    expect(enabled.select('disabled')).toMatchObject({ status: 'disabled', committed: false });
    expect(enabled.select('missing')).toMatchObject({ status: 'missing', committed: false });
    expect(enabled.setSelected('alpha', true, 'imperative')).toMatchObject({
      status: 'selected',
      committed: true,
    });
  });

  it('stops callbacks after destroy', () => {
    const onValueChange = vi.fn();
    const controller = new TreeSelectController({ defaultValue: 'alpha', treeData, onValueChange });
    controller.destroy();
    expect(controller.setOpen(true)).toBe(false);
    expect(controller.setFilterValue('query')).toBe(false);
    expect(controller.confirm()).toBe('alpha');
    expect(controller.cancel()).toBe('alpha');
    expect(controller.clear()).toMatchObject({ changed: false, committed: false });
    expect(controller.removeValue('alpha')).toMatchObject({ changed: false, committed: false });
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
