import { QRCode, Space } from '@aurora/horizon-web-react';

const icon =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Crect width="32" height="32" rx="8" fill="%231b64f2"/%3E%3Cpath d="M9 10h5v12H9zm9 0h5v12h-5z" fill="white"/%3E%3C/svg%3E';

export default function QRCodeCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {en
          ? 'High correction levels are useful when a small center icon covers part of the code.'
          : '中央图标覆盖部分码点时，可以使用较高的纠错等级。'}
      </p>
      <div className="docs-demo__stage">
        <Space align="center" size="large">
          <QRCode
            ariaLabel={en ? 'Branded product code' : '品牌产品二维码'}
            background="#eef5ff"
            color="#174ea6"
            icon={icon}
            iconSize={28}
            level="H"
            size={152}
            value="https://horizon.example/products/core"
          />
          <QRCode
            ariaLabel={en ? 'Compact support code' : '紧凑的支持二维码'}
            level="Q"
            margin={2}
            size={112}
            value="https://horizon.example/support"
          />
        </Space>
      </div>
    </section>
  );
}
