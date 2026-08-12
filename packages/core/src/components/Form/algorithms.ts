import type { FormRule, FormValidateEvent, FormValidateTrigger } from './contract';

/** 将单个值归一化为数组。 @en Normalizes one value or an array to an array. */
export function normalizeFormFields(
  fields?: string | readonly string[],
): readonly string[] | undefined {
  if (fields === undefined) return undefined;
  return typeof fields === 'string' ? [fields] : fields;
}

/** 解析字段级与表单级校验触发时机。 @en Resolves field-level and form-level validation triggers. */
export function resolveFormValidateEvents(
  fieldTrigger: FormValidateTrigger | undefined,
  formTrigger: FormValidateTrigger | undefined,
): readonly FormValidateEvent[] {
  const trigger = fieldTrigger === undefined ? formTrigger : fieldTrigger;
  if (trigger === false || trigger === undefined) return [];
  return typeof trigger === 'string' ? [trigger] : [...trigger];
}

/** 判断规则是否包含必填约束。 @en Tests whether rules contain a required constraint. */
export function hasRequiredFormRule(rules?: FormRule | readonly FormRule[]): boolean {
  if (!rules) return false;
  return (Array.isArray(rules) ? rules : [rules]).some(rule => rule.required === true);
}

/** 解析字段是否展示必填标记。 @en Resolves whether a field displays a required mark. */
export function resolveFormRequiredMark(options: {
  formVisible: boolean;
  fieldVisible: boolean;
  label?: string;
  field?: string;
  rules?: FormRule | readonly FormRule[];
  required?: boolean;
}): boolean {
  if (!options.formVisible || !options.fieldVisible || !options.label || !options.field)
    return false;
  return hasRequiredFormRule(options.rules) || options.required === true;
}

/** 格式化必填校验消息。 @en Formats a required validation message. */
export function formatFormRequiredMessage(template: string, fieldName: string): string {
  return template.replace('{prop}', fieldName);
}

/** 读取点号或方括号字段路径。 @en Reads a dotted or bracketed field path. */
export function getFormPathValue<T = unknown>(source: unknown, path: string): T | undefined {
  let current = source;
  for (const segment of parsePath(path)) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<PropertyKey, unknown>)[segment];
  }
  return current as T | undefined;
}

/** 写入点号或方括号字段路径。 @en Writes a dotted or bracketed field path. */
export function setFormPathValue(source: unknown, path: string, value: unknown): void {
  const segments = parsePath(path);
  if (!segments.length || source === null || typeof source !== 'object') return;
  let current = source as Record<PropertyKey, unknown>;
  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    const nextSegment = segments[index + 1];
    let next = current[segment];
    if (next === null || typeof next !== 'object') {
      next = /^\d+$/.test(nextSegment) ? [] : {};
      current[segment] = next;
    }
    current = next as Record<PropertyKey, unknown>;
  }
  current[segments.at(-1)!] = value;
}

/** 为字段重置保存独立快照。 @en Creates an independent snapshot for field reset. */
export function cloneFormValue<T>(value: T): T {
  if (Array.isArray(value)) return value.map(item => cloneFormValue(item)) as T;
  if (value instanceof Date) return new Date(value.getTime()) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, cloneFormValue(item)]),
    ) as T;
  }
  return value;
}

function parsePath(path: string): string[] {
  const segments: string[] = [];
  path.replace(/[^.[\]]+|\[(?:(['"])(.*?)\1|([^\]]+))\]/g, (_match, _quote, quoted, bare) => {
    segments.push((quoted ?? bare ?? _match).trim());
    return '';
  });
  return segments;
}
