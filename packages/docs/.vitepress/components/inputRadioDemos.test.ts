import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parse, type SFCDescriptor } from '@vue/compiler-sfc';
import { describe, expect, it } from 'vitest';

const inputDemoDirectory = path.resolve(__dirname, '../../demos/vue/components/Input');
const templateNodeType = {
  element: 1,
  simpleExpression: 4,
  attribute: 6,
  directive: 7,
} as const;

type TemplateAst = NonNullable<NonNullable<SFCDescriptor['template']>['ast']>;
type TemplateChildNode = TemplateAst['children'][number];
type ElementNode = Extract<TemplateChildNode, { type: typeof templateNodeType.element }>;

describe('Input segmented-control demos', () => {
  it.each(['demo1.vue', 'size.vue'])('uses SegmentedItem value props in %s', filename => {
    const source = readFileSync(path.join(inputDemoDirectory, filename), 'utf8');
    const { descriptor, errors } = parse(source, { filename });
    const segmentedItems = collectElements(
      descriptor.template?.ast?.children ?? [],
      'h-segmented-item',
    );

    expect(errors).toEqual([]);
    expect(segmentedItems.length).toBeGreaterThan(0);
    segmentedItems.forEach(element => {
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
      expect(propNames).toContain('label');
    });
  });
});

function collectElements(children: TemplateChildNode[], tag: string): ElementNode[] {
  return children.flatMap(child => {
    if (child.type !== templateNodeType.element) return [];
    const nestedMatches = collectElements(child.children, tag);
    return child.tag === tag ? [child, ...nestedMatches] : nestedMatches;
  });
}
