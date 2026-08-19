import { useState } from 'react';
import { FloatButton, FloatButtonGroup } from '@aurora/horizon-react';

export default function FloatButtonGroupDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [expanded, setExpanded] = useState(false);
  const [lastAction, setLastAction] = useState('—');
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo" style={{ minHeight: 280, position: 'relative' }}>
      <p className="docs-demo__description">
        {isEnglish
          ? 'The application owns expansion while the group reports every requested change.'
          : '应用持有展开状态，按钮组负责报告每一次状态变更请求。'}
      </p>
      <p aria-live="polite">
        {isEnglish ? 'Last action' : '最近操作'}: {lastAction}
      </p>
      <FloatButtonGroup
        expanded={expanded}
        foldTooltip={isEnglish ? 'Hide actions' : '收起操作'}
        onExpandedChange={setExpanded}
        shape="square"
        useCollapse
      >
        <FloatButton
          ariaLabel={isEnglish ? 'Favorite' : '收藏'}
          icon={<span aria-hidden="true">★</span>}
          onClick={() => setLastAction(isEnglish ? 'Favorite' : '收藏')}
        />
        <FloatButton
          ariaLabel={isEnglish ? 'Share' : '分享'}
          icon={<span aria-hidden="true">↗</span>}
          onClick={() => setLastAction(isEnglish ? 'Share' : '分享')}
        />
      </FloatButtonGroup>
    </section>
  );
}
