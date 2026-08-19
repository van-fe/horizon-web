import { useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu } from '@aurora/horizon-react';

export default function BasicDropdownDemo() {
  const [command, setCommand] = useState('none');
  return (
    <div>
      <Dropdown
        menu={
          <DropdownMenu>
            <DropdownItem command="edit">Edit profile</DropdownItem>
            <DropdownItem command="duplicate">Duplicate</DropdownItem>
            <DropdownItem command="remove" divided>
              Remove
            </DropdownItem>
          </DropdownMenu>
        }
        onCommand={value => setCommand(String(value))}
        trigger="click"
      >
        <Button>Actions</Button>
      </Dropdown>
      <p>Last command: {command}</p>
    </div>
  );
}
