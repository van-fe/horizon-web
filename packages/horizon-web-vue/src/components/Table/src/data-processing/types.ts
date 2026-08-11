export type HTableDataPrimitive = string | number | boolean | null | undefined;

export type HTableDataNumericColumn =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

/**
 * 可由结构化克隆传递给 Worker 的列数据。
 * @en Column data that can be passed to a worker through structured cloning.
 */
export type HTableDataPrimitiveColumn = readonly HTableDataPrimitive[] | HTableDataNumericColumn;

/**
 * 表格数据的列式投影。每列长度必须不小于 `rowCount`。
 * @en Columnar table-data projection. Every column must contain at least `rowCount` values.
 */
export interface HTableDataProjection {
  rowCount: number;
  columns: Readonly<Record<string, HTableDataPrimitiveColumn>>;
}

interface HTableDataFilterBase {
  column: string;
}

export interface HTableDataTextFilter extends HTableDataFilterBase {
  operator: 'contains' | 'starts-with' | 'ends-with';
  value: HTableDataPrimitive;
  caseSensitive?: boolean;
  locale?: string | string[];
  trim?: boolean;
}

export interface HTableDataEqualityFilter extends HTableDataFilterBase {
  operator: 'equals' | 'not-equals';
  value: HTableDataPrimitive;
}

export interface HTableDataSetFilter extends HTableDataFilterBase {
  operator: 'in' | 'not-in';
  values: readonly HTableDataPrimitive[];
}

export interface HTableDataComparisonFilter extends HTableDataFilterBase {
  operator: 'gt' | 'gte' | 'lt' | 'lte';
  value: number;
}

export interface HTableDataBetweenFilter extends HTableDataFilterBase {
  operator: 'between';
  min?: number;
  max?: number;
  includeMin?: boolean;
  includeMax?: boolean;
}

export interface HTableDataNullFilter extends HTableDataFilterBase {
  operator: 'is-null' | 'not-null';
}

/**
 * Worker 数据引擎支持的内置过滤描述。
 * @en Built-in filter descriptor supported by the worker data engine.
 */
export type HTableDataFilter =
  | HTableDataTextFilter
  | HTableDataEqualityFilter
  | HTableDataSetFilter
  | HTableDataComparisonFilter
  | HTableDataBetweenFilter
  | HTableDataNullFilter;

/**
 * Worker 数据引擎支持的排序描述。
 * @en Sort descriptor supported by the worker data engine.
 */
export interface HTableDataSort {
  column: string;
  direction: 'asc' | 'desc';
  valueType?: 'auto' | 'number' | 'string' | 'boolean';
  nulls?: 'auto' | 'first' | 'last';
  locale?: string | string[];
  numeric?: boolean;
  sensitivity?: Intl.CollatorOptions['sensitivity'];
  caseFirst?: Intl.CollatorOptions['caseFirst'];
}

/**
 * 一次纯数据处理任务。
 * @en A single pure data-processing job.
 */
export interface HTableDataProcessingInput {
  projection: HTableDataProjection;
  filters?: readonly HTableDataFilter[];
  sorts?: readonly HTableDataSort[];
}

/**
 * 数据处理结果。索引始终指向原始投影中的行。
 * @en Data-processing result. Indices always point to rows in the original projection.
 */
export interface HTableDataProcessingOutput {
  indices: Uint32Array;
}

export type HTableDataOperationKind = 'filter' | 'sort' | 'group' | 'aggregation';

/**
 * 用于判断自定义能力能否进入 Worker 的操作描述。
 * @en Operation descriptor used to determine whether custom behavior can run in a worker.
 */
export interface HTableDataOperationCandidate {
  kind: HTableDataOperationKind;
  key?: string;
  handler?: unknown;
}

export interface HTableDataProcessingCompatibilityIssue {
  kind: HTableDataOperationKind;
  key?: string;
  reason: 'custom-function' | 'unsupported-operation' | 'non-cloneable-handler';
}

export interface HTableDataProcessingCompatibility {
  compatible: boolean;
  issues: HTableDataProcessingCompatibilityIssue[];
}
