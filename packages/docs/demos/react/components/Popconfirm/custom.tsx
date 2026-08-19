import { useState } from 'react';
import { Button, HorizonWebProvider, Popconfirm } from '@aurora/horizon-react';

function ArchiveIcon() {
  return (
    <svg aria-hidden="true" height="20" viewBox="0 0 20 20" width="20">
      <path d="M3 3.5h14v3H3v-3Zm1 4.5h12v8.5H4V8Zm3 2v1.5h6V10H7Z" fill="currentColor" />
    </svg>
  );
}

export default function PopconfirmCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [archived, setArchived] = useState(false);
  const isEnglish = locale === 'en';

  return (
    <HorizonWebProvider
      popconfirmLabels={{
        cancel: isEnglish ? 'Review later' : '稍后检查',
        confirm: isEnglish ? 'Archive' : '归档',
      }}
    >
      <div className="docs-demo">
        <p className="docs-demo__description">
          {isEnglish
            ? 'Rich content and an icon can be paired with application-wide action labels.'
            : '富内容和自定义图标可以配合应用级操作文案使用。'}
        </p>
        <div className="docs-demo__actions">
          <Popconfirm
            confirmButtonProps={{ variant: 'danger' }}
            content={
              <span>
                <strong>
                  {isEnglish ? 'Archive “Q3 launch plan”?' : '归档“第三季度发布计划”？'}
                </strong>
                <br />
                {isEnglish
                  ? 'Editors will lose access until the plan is restored.'
                  : '恢复计划之前，协作者将无法继续访问。'}
              </span>
            }
            icon={<ArchiveIcon />}
            onConfirm={() => setArchived(true)}
            placement="right"
          >
            <Button>{isEnglish ? 'Archive plan' : '归档计划'}</Button>
          </Popconfirm>
        </div>
        <span aria-live="polite" className="docs-demo__status">
          {archived
            ? isEnglish
              ? 'Plan archived'
              : '计划已归档'
            : isEnglish
              ? 'Plan is active'
              : '计划仍在使用'}
        </span>
      </div>
    </HorizonWebProvider>
  );
}
