import { useState } from 'react';
import type { StepsDirection, StepsSize } from '@aurora/horizon-react';
import { Segmented, SegmentedItem, Step, Steps, Switch } from '@aurora/horizon-react';

export default function StepsAppearanceDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [direction, setDirection] = useState<StepsDirection>('horizontal');
  const [size, setSize] = useState<StepsSize>('medium');
  const [progressDot, setProgressDot] = useState(false);

  return (
    <section className="docs-demo">
      <div className="docs-demo__controls">
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Direction' : '方向'}</span>
          <Segmented
            block
            onChange={value => setDirection(value as StepsDirection)}
            size="small"
            value={direction}
          >
            <SegmentedItem value="horizontal">Horizontal</SegmentedItem>
            <SegmentedItem value="vertical">Vertical</SegmentedItem>
          </Segmented>
        </div>
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Size' : '尺寸'}</span>
          <Segmented
            block
            onChange={value => setSize(value as StepsSize)}
            size="small"
            value={size}
          >
            <SegmentedItem value="small">Small</SegmentedItem>
            <SegmentedItem value="medium">Medium</SegmentedItem>
          </Segmented>
        </div>
        <label className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Dot nodes' : '点状节点'}</span>
          <Switch onChange={setProgressDot} value={progressDot} />
        </label>
      </div>

      <div
        className="docs-demo__stage"
        style={{ minHeight: direction === 'vertical' ? 320 : undefined, overflowX: 'auto' }}
      >
        <div style={{ minWidth: direction === 'horizontal' ? 520 : undefined }}>
          <Steps
            direction={direction}
            labelPlacement={progressDot ? 'vertical' : 'horizontal'}
            progressDot={progressDot}
            size={size}
            value={1}
          >
            <Step description={en ? 'Approved' : '已通过'} title={en ? 'Plan' : '计划'} />
            <Step description={en ? 'Running checks' : '正在检查'} title={en ? 'Verify' : '验证'} />
            <Step description={en ? 'Waiting' : '等待中'} title={en ? 'Publish' : '发布'} />
          </Steps>
        </div>
      </div>
    </section>
  );
}
