import type { ReactNode } from 'react';
import { useState } from 'react';
import { Calendar, type CalendarPinFlag } from '@aurora/horizon-react';

export default function Demo() {
  const now = new Date();
  const [flags, setFlags] = useState<readonly CalendarPinFlag<ReactNode>[]>([
    {
      id: 'review',
      title: 'Design review',
      type: 'success',
      startAt: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10),
      endAt: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11),
      clickable: true,
    },
  ]);
  return (
    <Calendar
      defaultMode="week"
      defaultValue={now}
      modeSwitchable
      modeSwitchableList={['week', 'day']}
      pinFlags={flags}
      onPinFlagsChange={setFlags}
      enableCreatePinFlags
      onCreatePinFlag={flag => ({ ...flag, title: 'New schedule' })}
      disabledHours={date => [
        [
          new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12),
          new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14),
        ],
      ]}
    />
  );
}
