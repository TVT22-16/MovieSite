import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Profile() {
    const [mygroups, setMyGroups] = useState([]);

    const username = sessionStorage.getItem('username');
    // Function to fetch all groups
    const fetchGroups = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/groups/user/${username}`);
            setMyGroups(response.data);
        }
        catch (error) {
            console.error('Error fetching My Groups:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        // Fetch groups when the component mounts
        fetchGroups();
    }, []);

return (
    <div>
    <Container>
      <Row>
        <Col md={6}>
          {/* My Groups */}
          <div className="group-container" style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
            {mygroups.map((group) => (
         <Link to={`/groups/${group.group_name}`} key={group.group_name} className="mb-3" style={{ textDecoration: 'none', color: 'black' }}>
            <div className="group-box p-3 border">
            <h3>{group.group_name}</h3>
            <p style={{ maxHeight: '80px', overflow: 'hidden' }}>{group.group_description}</p>
            {/* Add more details or actions as needed */}
        </div>
    </Link>
  ))}
</div>
        </Col>
      </Row>
    </Container>
  </div>
    );
}   

export default Profile