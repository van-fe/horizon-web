import { useRef, useState } from 'react';
import { Button, Drawer, type DrawerHandle } from '@aurora/horizon-web-react';

type Result = 'idle' | 'applied' | 'cancelled';

export default function DrawerBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const drawerRef = useRef<DrawerHandle>(null);
  const [result, setResult] = useState<Result>('idle');
  const isEnglish = locale === 'en';
  const messages: Record<Result, string> = {
    idle: isEnglish ? 'No action yet' : '尚未执行操作',
    applied: isEnglish ? 'Filter changes applied' : '筛选条件已应用',
    cancelled: isEnglish ? 'Changes discarded' : '已放弃本次修改',
  };

  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Open a focused side panel without leaving the current workspace.'
          : '无需离开当前工作区，即可打开聚焦的侧边面板。'}
      </p>
      <div className="docs-demo__actions">
        <Button onClick={() => drawerRef.current?.open()} variant="primary">
          {isEnglish ? 'Edit filters' : '编辑筛选条件'}
        </Button>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {messages[result]}
      </span>
      <Drawer
        cancelButtonText={isEnglish ? 'Discard' : '放弃'}
        okButtonText={isEnglish ? 'Apply filters' : '应用筛选'}
        onCancel={() => setResult('cancelled')}
        onOk={() => {
          setResult('applied');
          drawerRef.current?.close();
        }}
        ref={drawerRef}
        title={isEnglish ? 'Project filters' : '项目筛选条件'}
      >
        <p>
          {isEnglish
            ? 'Choose the owners, milestones, and status groups included in this view.'
            : '选择要包含在当前视图中的负责人、里程碑和状态分组。'}
        </p>
      </Drawer>
    </section>
  );
}
