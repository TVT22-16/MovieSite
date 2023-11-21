// Groupcreate.js
import React, { useState } from 'react';
import Modal from 'react-modal';

export const GroupModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [group_name, setGroupname] = useState('');
  const [group_description, setGroupdescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ group_name, group_description });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
    >
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
        <button type="submit">Create group</button>
      </form>
    </Modal>
  );
};