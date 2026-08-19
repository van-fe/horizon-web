import { DescriptionItem, Descriptions } from '@aurora/horizon-react';

export default function DescriptionsResponsiveDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <Descriptions
      border
      column={3}
      md={2}
      sm={1}
      type="vertical"
      title={en ? 'Responsive details' : '响应式详情'}
    >
      <DescriptionItem label={en ? 'Project' : '项目'} value="Aurora" />
      <DescriptionItem label={en ? 'Status' : '状态'} value={en ? 'Active' : '运行中'} />
      <DescriptionItem
        label={en ? 'Description' : '说明'}
        spanCol={3}
        md={2}
        sm={1}
        value={en ? 'The item span follows the container width.' : '条目跨度会跟随容器宽度。'}
      />
    </Descriptions>
  );
}
