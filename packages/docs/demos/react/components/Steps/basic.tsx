import { useState } from 'react';
import { Button, Step, Steps } from '@aurora/horizon-web-react';

export default function StepsBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [current, setCurrent] = useState(1);
  const items = en
    ? [
        ['Project details', 'Saved'],
        ['Member access', 'In progress'],
        ['Review', 'Waiting'],
        ['Complete', 'Waiting'],
      ]
    : [
        ['项目信息', '已保存'],
        ['成员权限', '进行中'],
        ['检查确认', '等待中'],
        ['完成创建', '等待中'],
      ];

  return (
    <section className="docs-demo">
      <div className="docs-demo__stage" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 560 }}>
          <Steps clickable onChange={setCurrent} value={current}>
            {items.map(([title, subtitle]) => (
              <Step key={title} subtitle={subtitle} title={title} />
            ))}
          </Steps>
        </div>
      </div>

      <div className="docs-demo__actions">
        <Button disabled={current === 0} onClick={() => setCurrent(value => value - 1)}>
          {en ? 'Previous' : '上一步'}
        </Button>
        <Button
          disabled={current === items.length - 1}
          onClick={() => setCurrent(value => value + 1)}
          variant="primary"
        >
          {en ? 'Next' : '下一步'}
        </Button>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {en ? `Current: ${items[current]?.[0]}` : `当前步骤：${items[current]?.[0]}`}
      </span>
    </section>
  );
}
