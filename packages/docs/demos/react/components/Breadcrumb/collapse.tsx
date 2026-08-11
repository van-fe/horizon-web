import { useState } from 'react';
import type { BreadcrumbDisplayType } from '@aurora/horizon-web-react';
import {
  Breadcrumb,
  HorizonWebProvider,
  Segmented,
  SegmentedItem,
  Slider,
} from '@aurora/horizon-web-react';

export default function BreadcrumbCollapseDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [displayType, setDisplayType] = useState<BreadcrumbDisplayType>('ellipsis');
  const [width, setWidth] = useState(300);
  const items = [
    { text: en ? 'Workspace' : '工作区' },
    { text: en ? 'Customer research' : '客户研究' },
    { text: en ? 'Interview programme' : '访谈计划' },
    { text: en ? 'Accessibility findings' : '无障碍研究结论' },
    { text: en ? 'Current report' : '当前报告', title: true },
  ];

  return (
    <HorizonWebProvider
      breadcrumbLabels={{ collapsed: en ? 'Show hidden levels' : '显示隐藏层级' }}
    >
      <section className="docs-demo">
        <div className="docs-demo__controls">
          <div className="docs-demo__control">
            <span className="docs-demo__control-label">{en ? 'Display' : '显示方式'}</span>
            <Segmented
              block
              onChange={value => setDisplayType(value as BreadcrumbDisplayType)}
              size="small"
              value={displayType}
            >
              <SegmentedItem value="full">Full</SegmentedItem>
              <SegmentedItem value="ellipsis">Ellipsis</SegmentedItem>
            </Segmented>
          </div>

          <label className="docs-demo__control docs-demo__control--grow">
            <span className="docs-demo__control-label">
              {en ? `Available width: ${width}px` : `可用宽度：${width}px`}
            </span>
            <Slider
              aria-label={en ? 'Available breadcrumb width' : '面包屑可用宽度'}
              max={640}
              min={180}
              onChange={value => setWidth(value as number)}
              step={20}
              value={width}
            />
          </label>
        </div>

        <div
          style={{
            boxSizing: 'border-box',
            maxWidth: width,
            padding: 'var(--h-spacing-4)',
            borderRadius: 'var(--h-radius-l)',
            background: 'var(--h-bg-secondary)',
            transition: 'max-width 160ms ease',
            width: '100%',
          }}
        >
          <Breadcrumb displayType={displayType} items={items} />
        </div>
      </section>
    </HorizonWebProvider>
  );
}
