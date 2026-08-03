import type {
  HTableDataFilter,
  HTableDataOperationCandidate,
  HTableDataOperationKind,
  HTableDataPrimitive,
  HTableDataPrimitiveColumn,
  HTableDataProcessingCompatibility,
  HTableDataProcessingCompatibilityIssue,
  HTableDataProcessingInput,
  HTableDataProcessingOutput,
  HTableDataSort,
} from './types';

/**
 * 对列式投影执行内置过滤与稳定多列排序。
 *
 * 此函数有意保持完全自包含，使其源码可以安全嵌入 Blob Worker；不要在函数体内引用模块变量。
 * @param input 列式数据与查询描述
 * @paramEn input Columnar data and query descriptors.
 * @en Applies built-in filters and stable multi-column sorting to a columnar projection.
 */
export function processTableData(input: HTableDataProcessingInput): HTableDataProcessingOutput {
  type RuntimeError = Error & { code?: string };
  type RuntimeFilter = {
    filter: HTableDataFilter;
    column: HTableDataPrimitiveColumn;
    normalizedQuery?: string;
    valueSet?: Set<HTableDataPrimitive>;
  };
  const maxUint32RowCount = 0xffffffff;

  const fail = (code: string, message: string): never => {
    const error = new Error(message) as RuntimeError;
    error.name = 'HTableDataProcessingError';
    error.code = code;
    throw error;
  };

  const sameValueZero = (left: unknown, right: unknown) =>
    left === right ||
    (typeof left === 'number' &&
      typeof right === 'number' &&
      Number.isNaN(left) &&
      Number.isNaN(right));

  const isNullish = (value: unknown) => value === null || typeof value === 'undefined';

  const compareNumbers = (left: number, right: number) => {
    if (Number.isNaN(left)) return Number.isNaN(right) ? 0 : 1;
    if (Number.isNaN(right)) return -1;
    if (left === right) return 0;
    return left < right ? -1 : 1;
  };

  const normalizeText = (
    value: unknown,
    caseSensitive: boolean,
    locale: string | string[] | undefined,
    trim: boolean,
  ) => {
    let result = String(value ?? '');
    if (trim) result = result.trim();
    if (!caseSensitive) result = result.toLocaleLowerCase(locale);
    return result;
  };

  const matchesFilter = (value: HTableDataPrimitive, runtime: RuntimeFilter) => {
    const { filter } = runtime;
    switch (filter.operator) {
      case 'contains':
      case 'starts-with':
      case 'ends-with': {
        const caseSensitive = filter.caseSensitive === true;
        const source = normalizeText(value, caseSensitive, filter.locale, false);
        const query = runtime.normalizedQuery!;
        if (filter.operator === 'contains') return source.includes(query);
        if (filter.operator === 'starts-with') return source.startsWith(query);
        return source.endsWith(query);
      }
      case 'equals':
        return sameValueZero(value, filter.value);
      case 'not-equals':
        return !sameValueZero(value, filter.value);
      case 'in': {
        if (runtime.valueSet!.size === 0) return true;
        return runtime.valueSet!.has(value);
      }
      case 'not-in': {
        if (runtime.valueSet!.size === 0) return true;
        return !runtime.valueSet!.has(value);
      }
      case 'gt':
      case 'gte':
      case 'lt':
      case 'lte': {
        const numericValue = Number(value);
        if (!Number.isFinite(numericValue)) return false;
        if (filter.operator === 'gt') return numericValue > filter.value;
        if (filter.operator === 'gte') return numericValue >= filter.value;
        if (filter.operator === 'lt') return numericValue < filter.value;
        return numericValue <= filter.value;
      }
      case 'between': {
        const numericValue = Number(value);
        if (!Number.isFinite(numericValue)) return false;
        if (typeof filter.min === 'number') {
          const matchesMin =
            filter.includeMin === false ? numericValue > filter.min : numericValue >= filter.min;
          if (!matchesMin) return false;
        }
        if (typeof filter.max === 'number') {
          const matchesMax =
            filter.includeMax === false ? numericValue < filter.max : numericValue <= filter.max;
          if (!matchesMax) return false;
        }
        return true;
      }
      case 'is-null':
        return isNullish(value);
      case 'not-null':
        return !isNullish(value);
    }
  };

  const projection = input?.projection;
  if (!projection || typeof projection !== 'object') {
    fail('INVALID_PROJECTION', 'Table data-processing projection is required.');
  }

  const rowCount = projection.rowCount;
  if (!Number.isSafeInteger(rowCount) || rowCount < 0 || rowCount > maxUint32RowCount) {
    fail(
      'INVALID_ROW_COUNT',
      `Table data-processing rowCount must be an integer between 0 and ${maxUint32RowCount}.`,
    );
  }

  if (!projection.columns || typeof projection.columns !== 'object') {
    fail('INVALID_COLUMNS', 'Table data-processing columns must be an object.');
  }

  const filters = input.filters ?? [];
  const sorts = input.sorts ?? [];
  const referencedColumns = new Set<string>();
  filters.forEach(filter => referencedColumns.add(filter.column));
  sorts.forEach(sort => referencedColumns.add(sort.column));

  referencedColumns.forEach(columnName => {
    if (!Object.prototype.hasOwnProperty.call(projection.columns, columnName)) {
      fail('COLUMN_NOT_FOUND', `Table data-processing column '${columnName}' was not found.`);
    }

    const column = projection.columns[columnName];
    if (!column || typeof column.length !== 'number' || column.length < rowCount) {
      fail(
        'COLUMN_LENGTH_MISMATCH',
        `Table data-processing column '${columnName}' contains fewer than ${rowCount} rows.`,
      );
    }
  });

  const runtimeFilters: RuntimeFilter[] = filters.map(filter => {
    const runtime: RuntimeFilter = {
      filter,
      column: projection.columns[filter.column],
    };
    if (
      filter.operator === 'contains' ||
      filter.operator === 'starts-with' ||
      filter.operator === 'ends-with'
    ) {
      runtime.normalizedQuery = normalizeText(
        filter.value,
        filter.caseSensitive === true,
        filter.locale,
        filter.trim !== false,
      );
    } else if (filter.operator === 'in' || filter.operator === 'not-in') {
      runtime.valueSet = new Set(filter.values);
    }
    return runtime;
  });

  const filtered = new Uint32Array(rowCount);
  let filteredLength = 0;

  rows: for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let filterIndex = 0; filterIndex < runtimeFilters.length; filterIndex++) {
      const runtime = runtimeFilters[filterIndex];
      const value = runtime.column[rowIndex] as HTableDataPrimitive;
      if (!matchesFilter(value, runtime)) continue rows;
    }

    filtered[filteredLength] = rowIndex;
    filteredLength++;
  }

  let indices =
    filteredLength === rowCount ? filtered : filtered.slice(0, Math.max(0, filteredLength));
  if (sorts.length === 0 || indices.length < 2) return { indices };

  const runtimeSorts = sorts.map(sort => {
    const needsCollator = sort.valueType !== 'number' && sort.valueType !== 'boolean';
    return {
      sort,
      column: projection.columns[sort.column],
      collator: needsCollator
        ? new Intl.Collator(sort.locale, {
            numeric: sort.numeric ?? true,
            sensitivity: sort.sensitivity,
            caseFirst: sort.caseFirst,
          })
        : undefined,
    };
  });

  const compareValue = (
    left: HTableDataPrimitive,
    right: HTableDataPrimitive,
    sort: HTableDataSort,
    collator: Intl.Collator | undefined,
  ) => {
    const leftNullish = isNullish(left);
    const rightNullish = isNullish(right);
    if (sort.nulls !== 'auto' && typeof sort.nulls !== 'undefined') {
      if (leftNullish && rightNullish) return 0;
      if (leftNullish !== rightNullish) {
        return leftNullish === (sort.nulls === 'first') ? -1 : 1;
      }
    }

    let result = 0;
    if (sort.valueType === 'number') {
      const leftNumber = Number(left);
      const rightNumber = Number(right);
      result = compareNumbers(leftNumber, rightNumber);
    } else if (sort.valueType === 'boolean') {
      result = Number(Boolean(left)) - Number(Boolean(right));
    } else if (
      sort.valueType !== 'string' &&
      typeof left === 'number' &&
      typeof right === 'number'
    ) {
      result = compareNumbers(left, right);
    } else {
      result = collator!.compare(String(left ?? ''), String(right ?? ''));
    }

    return sort.direction === 'desc' ? -result : result;
  };

  const compareRows = (leftIndex: number, rightIndex: number) => {
    for (let sortIndex = 0; sortIndex < runtimeSorts.length; sortIndex++) {
      const { sort, column, collator } = runtimeSorts[sortIndex];
      const result = compareValue(
        column[leftIndex] as HTableDataPrimitive,
        column[rightIndex] as HTableDataPrimitive,
        sort,
        collator,
      );
      if (result !== 0) return result;
    }

    // Explicit final tie-break makes ordering deterministic across engines and workers.
    return leftIndex - rightIndex;
  };

  // Iterative merge sort avoids boxed row arrays and guarantees stable ordering.
  let source = indices;
  let target = new Uint32Array(indices.length);
  for (let width = 1; width < indices.length; width *= 2) {
    for (let start = 0; start < indices.length; start += width * 2) {
      const middle = Math.min(start + width, indices.length);
      const end = Math.min(start + width * 2, indices.length);
      let left = start;
      let right = middle;
      let output = start;

      while (left < middle && right < end) {
        if (compareRows(source[left], source[right]) <= 0) target[output++] = source[left++];
        else target[output++] = source[right++];
      }
      while (left < middle) target[output++] = source[left++];
      while (right < end) target[output++] = source[right++];
    }

    const previousSource = source;
    source = target;
    target = previousSource;
  }

  indices = source;
  return { indices };
}

function hasNonCloneableValue(value: unknown, seen = new WeakSet<object>()): boolean {
  if (typeof value === 'function' || typeof value === 'symbol') return true;
  if (!value || typeof value !== 'object') return false;
  if (seen.has(value)) return false;
  seen.add(value);

  if (value instanceof WeakMap || value instanceof WeakSet || value instanceof Promise) return true;
  if (Array.isArray(value)) return value.some(item => hasNonCloneableValue(item, seen));
  return Reflect.ownKeys(value).some(key => {
    if (typeof key === 'symbol') return true;
    return hasNonCloneableValue((value as Record<PropertyKey, unknown>)[key], seen);
  });
}

/**
 * 判断一组表格操作能否由当前纯数据引擎执行。
 * @param operations 待检查的操作
 * @paramEn operations Operations to inspect.
 * @param supportedKinds 当前执行计划支持的操作类型
 * @paramEn supportedKinds Operation kinds supported by the current execution plan.
 * @en Determines whether a set of table operations can run in the current pure data engine.
 */
export function analyzeTableDataProcessingCompatibility(
  operations: readonly HTableDataOperationCandidate[],
  supportedKinds: readonly HTableDataOperationKind[] = ['filter', 'sort'],
): HTableDataProcessingCompatibility {
  const supported = new Set(supportedKinds);
  const issues: HTableDataProcessingCompatibilityIssue[] = [];
  operations.forEach(operation => {
    if (typeof operation.handler === 'function') {
      issues.push({ kind: operation.kind, key: operation.key, reason: 'custom-function' });
      return;
    }
    if (!supported.has(operation.kind)) {
      issues.push({
        kind: operation.kind,
        key: operation.key,
        reason: 'unsupported-operation',
      });
      return;
    }
    if (hasNonCloneableValue(operation.handler)) {
      issues.push({
        kind: operation.kind,
        key: operation.key,
        reason: 'non-cloneable-handler',
      });
    }
  });

  return {
    compatible: issues.length === 0,
    issues,
  };
}
