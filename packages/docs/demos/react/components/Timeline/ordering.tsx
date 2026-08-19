import { useState } from 'react';
import type { TimelineSort } from '@aurora/horizon-react';
import { Segmented, SegmentedItem, Timeline, TimelineItem } from '@aurora/horizon-react';

export default function TimelineOrderingDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [sort, setSort] = useState<TimelineSort>('order');

  return (
    <section className="docs-demo">
      <div className="docs-demo__controls">
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Order' : '排序'}</span>
          <Segmented
            block
            onChange={value => setSort(value as TimelineSort)}
            size="small"
            value={sort}
          >
            <SegmentedItem value="order">{en ? 'Oldest first' : '正序'}</SegmentedItem>
            <SegmentedItem value="reverse">{en ? 'Newest first' : '倒序'}</SegmentedItem>
          </Segmented>
        </div>
      </div>

      <div className="docs-demo__stage">
        <Timeline
          first={{ color: 'var(--h-bg-brand-default)', size: 'large' }}
          last={{ type: 'circle' }}
          sort={sort}
        >
          <TimelineItem
            description={en ? 'Automated checks started.' : '自动检查已开始。'}
            name={en ? 'Build ready' : '构建就绪'}
            timestamp="2026-08-12 09:12"
          />
          <TimelineItem
            description={en ? 'Ten percent of traffic is stable.' : '10% 流量运行稳定。'}
            name={en ? 'Canary rollout' : '灰度发布'}
            timestamp="2026-08-13 10:05"
          />
          <TimelineItem
            description={en ? 'The release window has opened.' : '发布窗口已开启。'}
            name={en ? 'Production' : '全量发布'}
            tail={false}
            timestamp="2026-08-14 18:30"
          />
        </Timeline>
      </div>
    </section>
  );
}
