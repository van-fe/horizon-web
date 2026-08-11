import { useState } from 'react';
import {
  Button,
  Drawer,
  type DrawerProps,
  Segmented,
  SegmentedItem,
} from '@aurora/horizon-web-react';

type Placement = NonNullable<DrawerProps['placement']>;
type DrawerSize = NonNullable<DrawerProps['size']>;

export default function DrawerPlacementsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>('right');
  const [size, setSize] = useState<DrawerSize>('medium');
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo">
      <div className="docs-demo__controls">
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{isEnglish ? 'Placement' : '展开方向'}</span>
          <Segmented
            onChange={value => setPlacement(value as Placement)}
            size="small"
            value={placement}
          >
            {(['left', 'right', 'top', 'bottom'] as const).map(value => (
              <SegmentedItem key={value} value={value}>
                {value}
              </SegmentedItem>
            ))}
          </Segmented>
        </div>
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{isEnglish ? 'Size' : '尺寸'}</span>
          <Segmented
            onChange={value => setSize(value as DrawerSize)}
            size="small"
            value={String(size)}
          >
            {(['small', 'medium', 'large', '45%'] as const).map(value => (
              <SegmentedItem key={value} value={value}>
                {value}
              </SegmentedItem>
            ))}
          </Segmented>
        </div>
      </div>
      <div className="docs-demo__actions">
        <Button onClick={() => setOpen(true)}>{isEnglish ? 'Preview drawer' : '预览抽屉'}</Button>
      </div>
      <Drawer
        cancelButtonText={isEnglish ? 'Close' : '关闭'}
        okButton={false}
        onOpenChange={setOpen}
        open={open}
        placement={placement}
        size={size}
        title={isEnglish ? `${placement} drawer` : `${placement} 方向抽屉`}
      >
        <p>
          {isEnglish
            ? 'Preset sizes respond to the viewport; custom strings and numbers are used directly.'
            : '预设尺寸会响应视口变化；自定义字符串和数字会直接作为尺寸使用。'}
        </p>
      </Drawer>
    </section>
  );
}
