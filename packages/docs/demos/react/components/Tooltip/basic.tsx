import { useState } from 'react';
import { Button, Tooltip } from '@aurora/horizon-react';

export default function TooltipDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [lastReason, setLastReason] = useState('');
  const isEnglish = locale === 'en';

  return (
    <div className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Hover, focus, or use the keyboard to reveal concise contextual help.'
          : '通过悬停、聚焦或键盘操作显示简短的上下文说明。'}
      </p>
      <div className="docs-demo__actions">
        <Tooltip
          content={isEnglish ? 'Create a project from the current template' : '基于当前模板创建项目'}
          onOpenChange={(open, details) => open && setLastReason(details.reason)}
          placement="top"
          showAfter={100}
        >
          <Button variant="primary">{isEnglish ? 'Create project' : '创建项目'}</Button>
        </Tooltip>
        <Tooltip
          content={isEnglish ? 'This help remains available to keyboard users' : '键盘用户也可以访问此帮助信息'}
          placement="bottom"
          trigger="focus"
        >
          <Button variant="normal">{isEnglish ? 'Focus for help' : '聚焦查看帮助'}</Button>
        </Tooltip>
      </div>
      {lastReason && (
        <span className="docs-demo__status">
          {isEnglish ? `Opened by: ${lastReason}` : `打开方式：${lastReason}`}
        </span>
      )}
    </div>
  );
}
