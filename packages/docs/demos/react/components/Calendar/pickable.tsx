import { useState } from 'react';
import { Calendar } from '@aurora/horizon-react';

export default function Demo() {
  const [value, setValue] = useState(new Date());
  return (
    <section>
      <p>Selected: {value.toLocaleDateString()}</p>
      <Calendar
        value={value}
        onValueChange={setValue}
        pickable
        disabledDate={date => date.getDay() === 0 || date.getDay() === 6}
      />
    </section>
  );
}
