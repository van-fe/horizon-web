import { Avatar, Badge, Space } from '@aurora/horizon-react';

export default function BadgeDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';

  return (
    <div className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Badges add a compact status or count while the target remains independently readable.'
          : '徽标用于补充紧凑的状态或数量，目标内容本身仍保持可读。'}
      </p>
      <Space align="center" size="large" wrap>
        <Badge badgeLabel={isEnglish ? '3 unread messages' : '3 条未读消息'} content={3} type="num">
          <Avatar src="Ada Lovelace" type="work" />
        </Badge>
        <Badge
          badgeLabel={isEnglish ? '99 or more notifications' : '99 条以上通知'}
          content={120}
          numMax={99}
          type="num"
        >
          <span>{isEnglish ? 'Notifications' : '通知中心'}</span>
        </Badge>
        <Badge badgeLabel={isEnglish ? 'Online' : '在线'} bottom>
          <Avatar src="Aurora User" type="work" />
        </Badge>
        <Badge
          badgeLabel={isEnglish ? 'Priority' : '优先'}
          icon={<span aria-hidden>★</span>}
          type="icon"
        >
          <span>{isEnglish ? 'Important' : '重要项目'}</span>
        </Badge>
      </Space>
    </div>
  );
}
