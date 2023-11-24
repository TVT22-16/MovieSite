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

    <Dropdown.Item onClick={() => handleSortChange('popularity.desc')}>Popularity</Dropdown.Item>
    {/* <Dropdown.Item onClick={() => handleSortChange('popularity.asc')}>Popularity (ascending)</Dropdown.Item> */}

    <Dropdown.Item onClick={() => handleSortChange('vote_average.desc')}>Vote Average</Dropdown.Item>
    {/* <Dropdown.Item onClick={() => handleSortChange('vote_average.asc')}>Vote Average (ascending)</Dropdown.Item> */}

    <Dropdown.Item onClick={() => handleSortChange('vote_count.desc')}>Vote Count</Dropdown.Item>
    {/* <Dropdown.Item onClick={() => handleSortChange('vote_count.asc')}>Vote Count (ascending)</Dropdown.Item> */}

    <Dropdown.Item onClick={() => handleSortChange('revenue.desc')}>Revenue</Dropdown.Item>
    {/* <Dropdown.Item onClick={() => handleSortChange('vote_average.asc')}>Vote Average (ascending)</Dropdown.Item> */}

    </Dropdown.Menu>
  </Dropdown>



    

    
  );
};

export default DropdownComponent;