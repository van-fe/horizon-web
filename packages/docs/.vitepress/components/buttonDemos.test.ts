import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parse, type SFCDescriptor } from '@vue/compiler-sfc';
import { describe, expect, it } from 'vitest';

const buttonDemoDirectory = path.resolve(__dirname, '../../demos/components/Button');
const templateNodeType = {
  element: 1,
  attribute: 6,
} as const;

type TemplateAst = NonNullable<NonNullable<SFCDescriptor['template']>['ast']>;
type TemplateChildNode = TemplateAst['children'][number];
type ElementNode = Extract<TemplateChildNode, { type: typeof templateNodeType.element }>;

describe('Button demos', () => {
  it('gives each async guard choice an explicit Segmented value', () => {
    const filename = 'debounce-fn.vue';
    const source = readFileSync(path.join(buttonDemoDirectory, filename), 'utf8');
    const { descriptor, errors } = parse(source, { filename });
    const segmentedItems = collectElements(
      descriptor.template?.ast?.children ?? [],
      'h-segmented-item',
    );

    expect(errors).toEqual([]);
    expect(
      segmentedItems.map(item => ({
        label: getStaticAttribute(item, 'label'),
        value: getStaticAttribute(item, 'value'),
      })),
    ).toEqual([
      { label: 'disabled', value: 'disabled' },
      { label: 'loading', value: 'loading' },
      { label: 'none', value: 'none' },
    ]);
  });
});

function collectElements(children: TemplateChildNode[], tag: string): ElementNode[] {
  return children.flatMap(child => {
    if (child.type !== templateNodeType.element) return [];
    const nestedElements = collectElements(child.children, tag);
    return child.tag === tag ? [child, ...nestedElements] : nestedElements;
  });
}

function getStaticAttribute(element: ElementNode, name: string) {
  for (const prop of element.props) {
    if (prop.type === templateNodeType.attribute && prop.name === name) {
      return prop.value?.content;
    }
  }
  return undefined;
}
