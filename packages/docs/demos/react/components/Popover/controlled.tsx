import { useState } from 'react';
import { Button, PopContent, Popover } from '@aurora/horizon-web-react';

export default function PopoverControlledDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [open, setOpen] = useState(false);
  const isEnglish = locale === 'en';

  return (
    <div className="docs-demo">
      <div className="docs-demo__actions">
        <Button onClick={() => setOpen(value => !value)} variant="primary">
          {open ? (isEnglish ? 'Hide review' : '收起评审') : isEnglish ? 'Show review' : '显示评审'}
        </Button>
        <Popover
          content={
            <PopContent>
              <p>
                {isEnglish
                  ? 'The release owner has approved this change.'
                  : '发布负责人已批准本次变更。'}
              </p>
              <Button onClick={() => setOpen(false)} size="small">
                {isEnglish ? 'Close' : '关闭'}
              </Button>
            </PopContent>
          }
          mask={{ enable: true }}
          onOpenChange={setOpen}
          open={open}
          placement="auto-end"
          trigger="manual"
        >
          <Button>{isEnglish ? 'Position anchor' : '定位锚点'}</Button>
        </Popover>
      </div>
      <span className="docs-demo__status">
        {isEnglish ? `State: ${open ? 'open' : 'closed'}` : `状态：${open ? '已打开' : '已关闭'}`}
      </span>
    </div>
  );
}
