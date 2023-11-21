import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

// Create the SearchBar component
const SearchBar = (props) => {
  // Handler for handling search
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    // You can perform additional actions here if needed
    props.updateSearchTerm(searchTerm);
  };

  return (
    <Form className='searchForm'>
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        onChange={handleSearch}
      />
      {/* <Button variant="outline-success" onClick={()=>handleSearch}>Search</Button> */}
    </Form>
  );
};

export default SearchBar;