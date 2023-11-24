import React from 'react';
import { Dropdown } from 'react-bootstrap';

// Create the DropdownComponent
const DropdownComponent = ({updateSort}) => {


    const handleSortChange = (sort) => {

        updateSort(sort);
    };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>

      <Dropdown.Menu>

        <Dropdown.Item onClick={() => handleSortChange('popularity.desc')}>popularity.desc</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('popularity.asc')}>popularity.asc</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;