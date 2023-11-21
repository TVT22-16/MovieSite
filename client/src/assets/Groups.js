
// Groups.js
import React, { useState } from 'react';
import { GroupModal } from '../components/Groupcreate.js';
import axios from 'axios';

function Groups() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
    const username = sessionStorage.getItem('username');
    let admin = true;

  const handleModalSubmit = async ({ group_name, group_description}) => {
    try {
          // Step 2: Create the group and get its ID
          const groupResponse = await axios.post('http://localhost:3001/groups', {
            group_name,
            group_description,
          });
          // Step 3: Insert a record into the users_groups table
          await axios.post('http://localhost:3001/users_groups', {
            username,
            group_name,
            admin,
          });
      
        console.log('Group name:', group_name);
    console.log('Group description', group_description);
    console.log('Admin value:', admin);
    }
    catch (error){
        console.error('Error during group creation:', error.response ? error.response.data : error.message);
    }

    // Close the modal
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Create a Group</button>
      <GroupModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default Groups;