import { useState } from 'react';
import { Panel, Panels, Segmented, SegmentedItem } from '@aurora/horizon-web-react';

export default function PanelsVerticalDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState('draft');

  return (
    <section className="docs-demo">
      <Segmented onChange={next => setValue(String(next))} value={value}>
        <SegmentedItem value="draft">{en ? 'Draft' : '草稿'}</SegmentedItem>
        <SegmentedItem value="review">{en ? 'Review' : '评审'}</SegmentedItem>
        <SegmentedItem value="approved">{en ? 'Approved' : '已通过'}</SegmentedItem>
      </Segmented>
      <Panels animated vertical value={value}>
        <Panel name="draft">{en ? 'Shape the proposal.' : '完善方案内容。'}</Panel>
        <Panel name="review">{en ? 'Collect team feedback.' : '收集团队反馈。'}</Panel>
        <Panel name="approved">{en ? 'Prepare the rollout.' : '准备发布计划。'}</Panel>
      </Panels>
    </section>
  );
}
