import { Button, PopContent, Popover } from '@aurora/horizon-react';

export default function PopoverTriggersDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  const content = (label: string) => <PopContent>{label}</PopContent>;

  return (
    <div className="docs-demo__actions">
      <Popover
        content={content(
          isEnglish ? 'Available while the pointer stays nearby.' : '指针停留时持续显示。',
        )}
        placement="top"
        showDelay={120}
        trigger="hover"
      >
        <Button>{isEnglish ? 'Hover' : '悬停'}</Button>
      </Popover>
      <Popover
        content={content(
          isEnglish ? 'Keyboard focus opens this content.' : '键盘聚焦后显示此内容。',
        )}
        placement="bottom"
        trigger="focus"
      >
        <Button>{isEnglish ? 'Focus' : '聚焦'}</Button>
      </Popover>
      <Popover
        content={content(
          isEnglish ? 'Click outside or press Escape to close.' : '点击外部或按 Escape 关闭。',
        )}
        placement="right"
        trigger="click"
      >
        <Button>{isEnglish ? 'Click' : '点击'}</Button>
      </Popover>
    </div>
  );
}
