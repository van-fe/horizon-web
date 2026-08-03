import { useNamespace } from '../useHelpler';

const realVal = (val: boolean | (() => boolean)) => {
  return typeof val === 'boolean' ? val : val();
};

export class ComponentClassBlock {
  private namespace: string;
  public block: string;

  constructor(block: string, n = useNamespace().toLowerCase()) {
    this.namespace = n;
    this.block = `${n}-${block}`;
  }
  e(element: string | undefined, judge = true) {
    return this.element(element, judge);
  }
  element(element: string | undefined, judge = true) {
    return element && judge ? `${this.block}__${element}` : '';
  }
  m(modifier: string | undefined, judge = true) {
    return this.modifier(modifier, judge);
  }
  modifier(modifier: string | undefined, judge = true) {
    return modifier && judge ? `${this.block}--${modifier}` : '';
  }
  em(element: string | undefined, modifier: string | undefined, judge = true) {
    return element && modifier && judge ? `${this.block}__${element}--${modifier}` : '';
  }
  status(status: string | undefined, judge = true, prefix = 'is') {
    return status && judge ? `${prefix}-${status}` : undefined;
  }
  is(status: string | undefined, judge = true) {
    return this.status(status, judge, 'is');
  }
  has(status: string | undefined, judge = true) {
    return this.status(status, judge, 'has');
  }
  color(color: string, withVarWrap = true) {
    return withVarWrap ? `var(--${this.namespace}-${color})` : `--${this.namespace}-${color}`;
  }
}

export const dynamicClass = <T extends () => boolean>(
  classname: string,
  condition: T | boolean,
) => {
  if (typeof condition === 'boolean') {
    return condition ? classname : '';
  }

  return condition?.() ? classname : '';
};

type ClsOptions =
  | {
      [key: string]: boolean | (() => boolean);
    }
  | string[]
  | string
  | Array<string | undefined>
  | false
  | undefined;

export const cls = (...options: ClsOptions[]) => {
  return options
    .reduce<string>((classNames, option) => {
      if (
        option === undefined ||
        option === false ||
        option === '' ||
        (Array.isArray(option) && option.length === 0)
      ) {
        // do nothing
      } else if (typeof option === 'string') {
        classNames += option + ' ';
      } else if (Array.isArray(option)) {
        classNames += option.join(' ') + ' ';
      } else {
        classNames +=
          Object.entries(option)
            .filter(([, val]) => realVal(val))
            .map(([key]) => key)
            .join(' ') + ' ';
      }

      return classNames;
    }, '')
    .trim();
};
