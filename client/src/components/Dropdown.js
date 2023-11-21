import React from 'react';
import { Dropdown } from 'react-bootstrap';

// Create the DropdownComponent
const DropdownComponent = (props) => {


    const handleFilterChange = (filter) => {


        //change the filterState in parent
        props.updateFilter(filter);
    };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleFilterChange('popular')}>Popular</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterChange('top_rated')}>Top Rated</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterChange('upcoming')}>Upcoming</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;