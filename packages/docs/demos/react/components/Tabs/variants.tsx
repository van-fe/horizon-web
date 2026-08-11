import { useState } from 'react';
import type { TabsKey, TabsSize, TabsVariant } from '@aurora/horizon-web-react';
import { Segmented, SegmentedItem, Tab, Tabs } from '@aurora/horizon-web-react';

export default function TabsVariantsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [activeKey, setActiveKey] = useState<TabsKey>('build');
  const [variant, setVariant] = useState<TabsVariant>('line');
  const [size, setSize] = useState<TabsSize>('medium');

  return (
    <section className="docs-demo">
      <div className="docs-demo__controls">
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Variant' : '外观'}</span>
          <Segmented
            onChange={value => setVariant(value as TabsVariant)}
            size="small"
            value={variant}
          >
            <SegmentedItem value="line">Line</SegmentedItem>
            <SegmentedItem value="card">Card</SegmentedItem>
            <SegmentedItem value="page">Page</SegmentedItem>
          </Segmented>
        </div>
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Size' : '尺寸'}</span>
          <Segmented onChange={value => setSize(value as TabsSize)} size="small" value={size}>
            <SegmentedItem value="small">S</SegmentedItem>
            <SegmentedItem value="medium">M</SegmentedItem>
            <SegmentedItem value="large">L</SegmentedItem>
            <SegmentedItem value="huge">XL</SegmentedItem>
          </Segmented>
        </div>
      </div>
      <Tabs onChange={setActiveKey} size={size} value={activeKey} variant={variant}>
        <Tab label={en ? 'Brief' : '需求'} value="brief" />
        <Tab label={en ? 'Build' : '开发'} value="build" />
        <Tab label={en ? 'Launch' : '发布'} value="launch" />
      </Tabs>
    </section>
  );
}
