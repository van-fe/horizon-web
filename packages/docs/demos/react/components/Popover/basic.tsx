import { useState } from 'react';
import { Button, PopContent, Popover } from '@aurora/horizon-react';

export default function PopoverBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [reason, setReason] = useState('');
  const isEnglish = locale === 'en';

  return (
    <div className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Click the action to inspect contextual project details.'
          : '点击操作按钮查看当前项目的上下文详情。'}
      </p>
      <div className="docs-demo__actions">
        <Popover
          content={
            <PopContent>
              <strong>{isEnglish ? 'Release readiness' : '发布准备度'}</strong>
              <p>
                {isEnglish
                  ? '12 checks passed; 2 reviews remain.'
                  : '12 项检查已通过，还有 2 项待评审。'}
              </p>
            </PopContent>
          }
          onOpenChange={(open, details) => open && setReason(details.reason)}
          placement="bottom-start"
          trigger="click"
        >
          <Button variant="primary">{isEnglish ? 'View summary' : '查看摘要'}</Button>
        </Popover>
      </div>
      {reason ? (
        <span className="docs-demo__status">
          {isEnglish ? `Opened by: ${reason}` : `打开方式：${reason}`}
        </span>
      ) : null}
    </div>
  );
}
