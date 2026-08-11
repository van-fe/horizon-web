import { useState } from 'react';
import { Button, Popconfirm } from '@aurora/horizon-web-react';

type Action = 'idle' | 'confirmed' | 'cancelled';

export default function PopconfirmBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [action, setAction] = useState<Action>('idle');
  const isEnglish = locale === 'en';
  const status = {
    idle: isEnglish ? 'No decision yet' : '尚未作出选择',
    confirmed: isEnglish ? 'Draft deleted' : '草稿已删除',
    cancelled: isEnglish ? 'Draft kept' : '已保留草稿',
  }[action];

  return (
    <div className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Ask for confirmation before deleting an unfinished draft.'
          : '删除未完成的草稿前，先让用户确认操作。'}
      </p>
      <div className="docs-demo__actions">
        <Popconfirm
          cancelText={isEnglish ? 'Keep draft' : '保留草稿'}
          confirmButtonProps={{ variant: 'danger' }}
          confirmText={isEnglish ? 'Delete' : '删除'}
          onCancel={() => setAction('cancelled')}
          onConfirm={() => setAction('confirmed')}
          placement="bottom-start"
          title={isEnglish ? 'Delete this draft?' : '确定删除这份草稿吗？'}
        >
          <Button variant="danger">{isEnglish ? 'Delete draft' : '删除草稿'}</Button>
        </Popconfirm>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {status}
      </span>
    </div>
  );
}
