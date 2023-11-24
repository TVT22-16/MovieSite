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

        <Dropdown.Item onClick={() => handleSortChange('popularity.desc')}>Popularity (descending)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('popularity.asc')}>Popularity (ascending)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('vote_average.desc')}>Vote Average (descending)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('vote_average.asc')}>Vote Average (ascending)</Dropdown.Item>


      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;