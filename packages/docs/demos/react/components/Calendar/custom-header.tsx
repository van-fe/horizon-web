import { useRef } from 'react';
import { Calendar, type CalendarHandle } from '@aurora/horizon-react';

export default function Demo() {
  const calendar = useRef<CalendarHandle>(null);
  return (
    <Calendar
      ref={calendar}
      renderHeader={() => (
        <button type="button" onClick={() => calendar.current?.today()}>
          Jump to today
        </button>
      )}
    />
  );
}
