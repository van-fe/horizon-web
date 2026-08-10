import { useLowCaseNamespace } from './namespace';

const resolveCondition = (value: boolean | (() => boolean)): boolean =>
  typeof value === 'boolean' ? value : value();

export class ComponentClassBlock {
  private readonly namespace: string;
  public block: string;

  constructor(block: string, namespace = useLowCaseNamespace()) {
    this.namespace = namespace;
    this.block = `${namespace}-${block}`;
  }

  public e(element: string | undefined, enabled = true): string {
    return this.element(element, enabled);
  }

  public element(element: string | undefined, enabled = true): string {
    return element && enabled ? `${this.block}__${element}` : '';
  }

  public m(modifier: string | undefined, enabled = true): string {
    return this.modifier(modifier, enabled);
  }

  public modifier(modifier: string | undefined, enabled = true): string {
    return modifier && enabled ? `${this.block}--${modifier}` : '';
  }

  public em(element: string | undefined, modifier: string | undefined, enabled = true): string {
    return element && modifier && enabled ? `${this.block}__${element}--${modifier}` : '';
  }

  public status(status: string | undefined, enabled = true, prefix = 'is'): string | undefined {
    return status && enabled ? `${prefix}-${status}` : undefined;
  }

  public is(status: string | undefined, enabled = true): string | undefined {
    return this.status(status, enabled, 'is');
  }

  public has(status: string | undefined, enabled = true): string | undefined {
    return this.status(status, enabled, 'has');
  }

  public color(color: string, withVarWrap = true): string {
    return withVarWrap ? `var(--${this.namespace}-${color})` : `--${this.namespace}-${color}`;
  }
}

export const dynamicClass = <T extends () => boolean>(
  className: string,
  condition: T | boolean,
): string => (resolveCondition(condition) ? className : '');

export type ClassValue =
  | Record<string, boolean | (() => boolean)>
  | string[]
  | string
  | Array<string | undefined>
  | false
  | undefined;

export function cls(...values: ClassValue[]): string {
  return values
    .reduce<string>((classNames, value) => {
      if (
        value === undefined ||
        value === false ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return classNames;
      }

      if (typeof value === 'string') return `${classNames}${value} `;
      if (Array.isArray(value)) return `${classNames}${value.join(' ')} `;

      return `${classNames}${Object.entries(value)
        .filter(([, condition]) => resolveCondition(condition))
        .map(([className]) => className)
        .join(' ')} `;
    }, '')
    .trim();
}
