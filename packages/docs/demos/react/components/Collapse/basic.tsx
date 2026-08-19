import { useState } from 'react';
import type { CollapseValue } from '@aurora/horizon-react';
import { Collapse, CollapseItem } from '@aurora/horizon-react';

export default function CollapseBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState<CollapseValue>(['shipping']);

  return (
    <section className="docs-demo">
      <Collapse onChange={setValue} value={value}>
        <CollapseItem name="shipping" title={en ? 'When will my order ship?' : '订单何时发货？'}>
          {en
            ? 'Orders usually leave the warehouse within two business days.'
            : '订单通常会在两个工作日内从仓库发出。'}
        </CollapseItem>
        <CollapseItem
          name="tracking"
          title={en ? 'Where is the tracking link?' : '在哪里查看物流？'}
        >
          {en
            ? 'The tracking link appears in the order details after dispatch.'
            : '发货后可在订单详情中查看物流链接。'}
        </CollapseItem>
        <CollapseItem disabled name="closed" title={en ? 'Archived question' : '已归档问题'}>
          {en ? 'This panel is unavailable.' : '此面板当前不可用。'}
        </CollapseItem>
      </Collapse>
    </section>
  );
}
