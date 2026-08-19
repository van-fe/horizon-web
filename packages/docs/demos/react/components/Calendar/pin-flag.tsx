import type { ReactNode } from 'react';
import { useState } from 'react';
import { Calendar, type CalendarPinFlag } from '@aurora/horizon-react';

export default function Demo() {
  const now = new Date();
  const [flags, setFlags] = useState<readonly CalendarPinFlag<ReactNode>[]>([
    {
      id: 'release',
      title: 'Release window',
      type: 'primary',
      startAt: now,
      endAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
      clickable: true,
    },
  ]);
  return (
    <Calendar
      defaultValue={now}
      pinFlags={flags}
      onPinFlagsChange={setFlags}
      onPinFlagClick={flag => alert(String(flag.title))}
      pinFlagsShowTime
    />
  );
}
