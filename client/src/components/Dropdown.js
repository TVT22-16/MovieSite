import React, {useState} from 'react';
import { Dropdown } from 'react-bootstrap';

// Create the DropdownComponent
const DropdownComponent = ({updateSort}) => {

    const [sortTag,setSortTag] = useState('Popularity')

    const handleSortChange = (sort,tag) => {

        updateSort(sort);
        setSortTag(tag);
    };



  return (
  <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
        {sortTag}
    </Dropdown.Toggle>

    <Dropdown.Menu>

    <Dropdown.Item onClick={() => handleSortChange('popularity.desc','Popularity')}>Popularity</Dropdown.Item>
    {/* <Dropdown.Item onClick={() => handleSortChange('popularity.asc')}>Popularity (ascending)</Dropdown.Item> */}

    <Dropdown.Item onClick={() => handleSortChange('vote_average.desc','Vote Average')}>Vote Average</Dropdown.Item>
    {/* <Dropdown.Item onClick={() => handleSortChange('vote_average.asc')}>Vote Average (ascending)</Dropdown.Item> */}

    <Dropdown.Item onClick={() => handleSortChange('vote_count.desc','Vote Count')}>Vote Count</Dropdown.Item>
    {/* <Dropdown.Item onClick={() => handleSortChange('vote_count.asc')}>Vote Count (ascending)</Dropdown.Item> */}

    <Dropdown.Item onClick={() => handleSortChange('revenue.desc','Revenue')}>Revenue</Dropdown.Item>
    {/* <Dropdown.Item onClick={() => handleSortChange('vote_average.asc')}>Vote Average (ascending)</Dropdown.Item> */}

    </Dropdown.Menu>
  </Dropdown>



    

    
  );
};

export default DropdownComponent;