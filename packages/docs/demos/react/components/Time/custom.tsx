import { Time } from '@aurora/horizon-react';

export default function TimeCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Time calculative time={1_000_000_000_000} endTime={1_000_090_061_000}>
      {({ dd = 0, hh = 0, mm = 0, ss }) => (
        <strong>
          {isEnglish
            ? `${dd} days ${hh} hours ${mm} minutes ${ss} seconds`
            : `${dd} 天 ${hh} 小时 ${mm} 分 ${ss} 秒`}
        </strong>
      )}
    </Time>
  );
}
