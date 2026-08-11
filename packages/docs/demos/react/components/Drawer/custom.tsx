import { useRef, useState } from 'react';
import { Button, Drawer, type DrawerHandle } from '@aurora/horizon-web-react';

export default function DrawerCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const drawerRef = useRef<DrawerHandle>(null);
  const [saved, setSaved] = useState(false);
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Drag the panel edge to resize it, then use the custom actions to finish.'
          : '拖动面板边缘可以调整尺寸，然后使用自定义操作完成流程。'}
      </p>
      <div className="docs-demo__actions">
        <Button onClick={() => drawerRef.current?.open()}>
          {isEnglish ? 'Configure export' : '配置导出'}
        </Button>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {saved
          ? isEnglish
            ? 'Export settings saved'
            : '导出设置已保存'
          : isEnglish
            ? 'Settings unchanged'
            : '设置尚未更改'}
      </span>
      <Drawer
        ariaLabel={isEnglish ? 'Export configuration' : '导出配置'}
        footer={
          <div className="docs-demo__actions">
            <Button onClick={() => drawerRef.current?.close()} plain variant="normal">
              {isEnglish ? 'Cancel' : '取消'}
            </Button>
            <Button
              onClick={() => {
                setSaved(true);
                drawerRef.current?.close();
              }}
              variant="primary"
            >
              {isEnglish ? 'Save settings' : '保存设置'}
            </Button>
          </div>
        }
        header={
          <div>
            <strong>{isEnglish ? 'Export configuration' : '导出配置'}</strong>
            <span> · CSV</span>
          </div>
        }
        placement="left"
        ref={drawerRef}
        size={360}
        sizeDraggable
      >
        <p>
          {isEnglish
            ? 'Select the columns and date range included in the exported file.'
            : '选择导出文件中包含的字段和日期范围。'}
        </p>
      </Drawer>
    </section>
  );
}
