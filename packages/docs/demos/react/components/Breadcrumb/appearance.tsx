import { useState } from 'react';
import type { BreadcrumbSize } from '@aurora/horizon-react';
import { Breadcrumb, Segmented, SegmentedItem } from '@aurora/horizon-react';

export default function BreadcrumbAppearanceDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [size, setSize] = useState<BreadcrumbSize>('medium');
  const [separator, setSeparator] = useState('/');
  const items = [
    { text: en ? 'Library' : '组件库' },
    { text: en ? 'Navigation' : '导航' },
    { text: en ? 'Breadcrumb' : '面包屑', title: true },
  ];

  return (
    <section className="docs-demo">
      <div className="docs-demo__controls">
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Size' : '尺寸'}</span>
          <Segmented
            block
            onChange={value => setSize(value as BreadcrumbSize)}
            size="small"
            value={size}
          >
            <SegmentedItem value="small">Small</SegmentedItem>
            <SegmentedItem value="medium">Medium</SegmentedItem>
          </Segmented>
        </div>

        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Separator' : '分隔符'}</span>
          <Segmented
            block
            onChange={value => setSeparator(String(value))}
            size="small"
            value={separator}
          >
            <SegmentedItem value="/">/</SegmentedItem>
            <SegmentedItem value="→">→</SegmentedItem>
            <SegmentedItem value="·">·</SegmentedItem>
          </Segmented>
        </div>
      </div>

      <div className="docs-demo__stage">
        <Breadcrumb items={items} separator={separator} size={size} />
      </div>
    </section>
  );
}
