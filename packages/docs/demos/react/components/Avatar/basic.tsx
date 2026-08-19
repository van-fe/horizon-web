import { Avatar, Space } from '@aurora/horizon-react';

const portrait =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%235b62f4"/%3E%3Ccircle cx="40" cy="30" r="16" fill="%23fff"/%3E%3Cpath d="M14 78c2-20 13-30 26-30s24 10 26 30" fill="%23fff"/%3E%3C/svg%3E';

export default function AvatarDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';

  return (
    <div className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Use images, initials, custom content, and several preset sizes to identify people or teams.'
          : '使用图片、文字缩写、自定义内容和预设尺寸表示人物或团队。'}
      </p>
      <Space align="center" size="large" wrap>
        <Avatar alt={isEnglish ? 'Product designer' : '产品设计师'} src={portrait} />
        <Avatar size="small" src="Ada Lovelace" type="work" />
        <Avatar size="large" src="Aurora Team" type="work" />
        <Avatar size={48}>
          <span aria-label={isEnglish ? 'Guest' : '访客'}>G</span>
        </Avatar>
      </Space>
    </div>
  );
}
