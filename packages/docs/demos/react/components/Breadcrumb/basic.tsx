import { useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from '@aurora/horizon-react';

export default function BreadcrumbBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [lastAction, setLastAction] = useState(en ? 'No item selected' : '尚未选择条目');
  const items = [
    { text: en ? 'Workspace' : '工作区', clickable: true },
    { text: en ? 'Design system' : '设计系统', clickable: true },
    { text: en ? 'Accessibility review' : '无障碍评审', title: true },
  ];

  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {en
          ? 'Use items for data-driven paths, or compose items when a level needs richer content.'
          : '使用 items 构建数据驱动路径；当某一层需要更丰富的内容时，可组合条目。'}
      </p>

      <div className="docs-demo__stack">
        <Breadcrumb
          items={items}
          onItemClick={item => setLastAction(item.text ?? (en ? 'Custom item' : '自定义条目'))}
        />

        <Breadcrumb separator={<span aria-hidden="true">→</span>}>
          <BreadcrumbItem
            clickable
            onClick={() => setLastAction(en ? 'Product workspace' : '产品工作区')}
          >
            {en ? 'Product workspace' : '产品工作区'}
          </BreadcrumbItem>
          <BreadcrumbItem separator={<span aria-hidden="true">·</span>}>
            <span>
              {en ? 'Release candidate ' : '候选版本 '}
              <strong>RC 3</strong>
            </span>
          </BreadcrumbItem>
          <BreadcrumbItem title>{en ? 'Verification' : '发布验证'}</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <span aria-live="polite" className="docs-demo__status">
        {en ? `Last selection: ${lastAction}` : `最近选择：${lastAction}`}
      </span>
    </section>
  );
}
