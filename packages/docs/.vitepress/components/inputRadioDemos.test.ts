import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parse, type SFCDescriptor } from '@vue/compiler-sfc';
import { describe, expect, it } from 'vitest';

const inputDemoDirectory = path.resolve(__dirname, '../../demos/components/Input');
const templateNodeType = {
  element: 1,
  simpleExpression: 4,
  attribute: 6,
  directive: 7,
} as const;

type TemplateAst = NonNullable<NonNullable<SFCDescriptor['template']>['ast']>;
type TemplateChildNode = TemplateAst['children'][number];
type ElementNode = Extract<TemplateChildNode, { type: typeof templateNodeType.element }>;

describe('Input radio demos', () => {
  it.each(['demo1.vue', 'size.vue'])('uses Radio value bindings in %s', filename => {
    const source = readFileSync(path.join(inputDemoDirectory, filename), 'utf8');
    const { descriptor, errors } = parse(source, { filename });
    const radioElements = collectRadioElements(descriptor.template?.ast?.children ?? []);

    expect(errors).toEqual([]);
    expect(radioElements.length).toBeGreaterThan(0);
    radioElements.forEach(element => {
      const propNames = element.props.flatMap(prop => {
        if (prop.type === templateNodeType.attribute) return [prop.name];
        if (
          prop.type === templateNodeType.directive &&
          prop.name === 'bind' &&
          prop.arg?.type === templateNodeType.simpleExpression &&
          prop.arg.isStatic
        ) {
          return [prop.arg.content];
        }
        return [];
      });

      expect(propNames).toContain('value');
      expect(propNames).not.toContain('label');
    });
  });
});

function collectRadioElements(children: TemplateChildNode[]): ElementNode[] {
  return children.flatMap(child => {
    if (child.type !== templateNodeType.element) return [];
    const nestedRadios = collectRadioElements(child.children);
    return child.tag === 'h-radio' ? [child, ...nestedRadios] : nestedRadios;
  });
}
