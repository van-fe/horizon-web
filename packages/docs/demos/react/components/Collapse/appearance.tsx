import { useState } from 'react';
import type { CollapseIconPosition, CollapseSize, CollapseValue } from '@aurora/horizon-web-react';
import { Collapse, CollapseItem, Segmented, SegmentedItem } from '@aurora/horizon-web-react';

export default function CollapseAppearanceDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState<CollapseValue>(['overview']);
  const [size, setSize] = useState<CollapseSize>('medium');
  const [position, setPosition] = useState<CollapseIconPosition>('left');

  return (
    <section className="docs-demo">
      <div className="docs-demo__controls">
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Size' : '尺寸'}</span>
          <Segmented onChange={item => setSize(item as CollapseSize)} size="small" value={size}>
            <SegmentedItem value="small">Small</SegmentedItem>
            <SegmentedItem value="medium">Medium</SegmentedItem>
            <SegmentedItem value="large">Large</SegmentedItem>
          </Segmented>
        </div>
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Icon' : '图标'}</span>
          <Segmented
            onChange={item => setPosition(item as CollapseIconPosition)}
            size="small"
            value={position}
          >
            <SegmentedItem value="left">Left</SegmentedItem>
            <SegmentedItem value="right">Right</SegmentedItem>
          </Segmented>
        </div>
      </div>
      <Collapse expandIconPosition={position} filled onChange={setValue} size={size} value={value}>
        <CollapseItem
          expandIcon={<span aria-hidden="true">＋</span>}
          name="overview"
          title={en ? 'Project overview' : '项目概览'}
        >
          {en ? 'A concise summary of the current milestone.' : '当前里程碑的简要说明。'}
        </CollapseItem>
        <CollapseItem directive="if" name="details" title={en ? 'Details' : '详细信息'}>
          {en ? 'This body mounts only while the panel is expanded.' : '此正文仅在面板展开时挂载。'}
        </CollapseItem>
      </Collapse>
    </section>
  );
}
