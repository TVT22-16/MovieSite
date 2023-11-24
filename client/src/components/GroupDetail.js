import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function GroupDetail() {
  const { group_name } = useParams();

  const fetchGroups = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/users_groups/${group_name}`); //
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching groups:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <div>
      <h2>Group Detail Page</h2>
      <p>Group Name: {group_name}</p>
      <p>This is the GroupDetail component. It's working!</p>   
      <button onClick={fetchGroups}>Fetch Groups</button>   
    </div>
  );
}
export default GroupDetail;

