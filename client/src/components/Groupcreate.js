import React, { useState } from 'react';
import Modal from 'react-modal';

//This is the modal that is used to create a group
//It is called from Groups.js

export const GroupModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [group_name, setGroupname] = useState('');
  const [group_description, setGroupdescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ group_name, group_description });
  };

  // Custom styles for the modal
  const customStyles = {
    content: {
      width: '600px',
      height: '400px',
      margin: 'auto',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '35px',
      backgroundColor: 'lightblue',
    },
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal"
        style={customStyles}
      >
        <button onClick={onRequestClose} className="btn btn-primary" style={{ float: 'right', cursor: 'pointer', backgroundColor: 'red', borderColor: 'red' }}>
          Exit
        </button>
        <h2>Give your group name and description</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="groupname">Group name:</label>
          <input
            type="text"
            id="groupname"
            value={group_name}
            onChange={(e) => setGroupname(e.target.value)}
          />
          <br />
          <label htmlFor="groupdescription">Group description:</label>
          <textarea
            id="text"
            value={group_description}
            onChange={(e) => setGroupdescription(e.target.value)}
          />
          <br />
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'green', borderColor: 'green' }}>
            Create group
          </button>
        </form>
      </Modal>
    </div>
  );
};
