import { QRCode } from '@aurora/horizon-web-react';

export default function QRCodeBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {en ? 'Open the release preview on another device.' : '使用另一台设备打开版本预览页面。'}
      </p>
      <div className="docs-demo__stage">
        <QRCode
          ariaLabel={en ? 'Release preview QR code' : '版本预览二维码'}
          value="https://horizon.example/releases/3.8-preview"
        />
      </div>
    </section>
  );
}
