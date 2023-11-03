import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  return (
    <AxiosTest/>
  );
}



function AxiosTest() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //http://localhost:5000/test (whole endpoint)
    axios.get('/test')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  return (
    <div>
      {/* if empty show Loading... */}
      {users.length === 0 ? (
        <p>Loading...</p>
        
        // else show array
      ) : (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.user}</li>))}
        </ul>
      )}
    </div>
  );
}


export default App;