import { useState } from 'react';
import {
  Button,
  Dialog,
  type DialogProps,
  Segmented,
  SegmentedItem,
} from '@aurora/horizon-web-react';

type DialogSize = NonNullable<DialogProps['size']>;

function ReviewIcon() {
  return (
    <svg aria-hidden="true" height="24" viewBox="0 0 24 24" width="24">
      <path d="M4 4h16v16H4V4Zm3 4v2h10V8H7Zm0 4v2h7v-2H7Z" fill="currentColor" />
    </svg>
  );
}

export default function DialogCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DialogSize>('medium');
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo">
      <div className="docs-demo__controls">
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">
            {isEnglish ? 'Dialog size' : '对话框尺寸'}
          </span>
          <Segmented onChange={value => setSize(value as DialogSize)} size="small" value={size}>
            {(['small', 'medium', 'large', 'huge'] as const).map(value => (
              <SegmentedItem key={value} value={value}>
                {value}
              </SegmentedItem>
            ))}
          </Segmented>
        </div>
      </div>
      <div className="docs-demo__actions">
        <Button onClick={() => setOpen(true)}>{isEnglish ? 'Review release' : '评审发布'}</Button>
      </div>
      <Dialog
        footer={
          <div className="docs-demo__actions">
            <Button onClick={() => setOpen(false)} plain variant="normal">
              {isEnglish ? 'Continue editing' : '继续编辑'}
            </Button>
            <Button onClick={() => setOpen(false)} variant="primary">
              {isEnglish ? 'Approve release' : '批准发布'}
            </Button>
          </div>
        }
        icon={<ReviewIcon />}
        onOpenChange={setOpen}
        open={open}
        size={size}
        title={
          <span>
            {isEnglish ? 'Release 2.4 review' : '2.4 版本发布评审'}
            <small> · {isEnglish ? '2 checks remaining' : '剩余 2 项检查'}</small>
          </span>
        }
      >
        <p>
          {isEnglish
            ? 'Security review and localization approval must finish before deployment.'
            : '部署前还需要完成安全评审和本地化验收。'}
        </p>
      </Dialog>
    </section>
  );
}
