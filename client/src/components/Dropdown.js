import React from 'react';
import { Dropdown } from 'react-bootstrap';

// Create the DropdownComponent
const DropdownComponent = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Popular</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Top Rated</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Upcoming</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;