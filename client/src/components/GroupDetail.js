import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Crown from './images/crown.png';
import './GroupDetail.css';
import FinnkinoFetch from './FinnkinoFetch';
import { Dropdown } from 'react-bootstrap';

//In GroupDetail you can see group members, news, reviews and join requests.
//If you are Admin of the group you can also accept or deny join requests and delete members from your group.
//You can also hide news and reviews from the page.

function GroupDetail() {
  const { group_name } = useParams();
  const [usernames, setUsernames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isNewsToggled, setIsNewsToggled] = useState(true);
  const [isReviewsToggled, setIsReviewsToggled] = useState(true);
  const [joinRequests, setJoinRequests] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const loggedInUsername = sessionStorage.getItem('username');

  const fetchGroupMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users_groups/${group_name}`);
      setUsernames(response.data.map(user => ({ username: user.username, admin: user.admin })));
    } catch (error) {
      console.error('Error fetching group members:', error.response ? error.response.data : error.message);
    }
  };

  const fetchGroupReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users_groups/reviewforgroup/${group_name}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching group reviews:', error.response ? error.response.data : error.message);
    }
  };

  const fetchMoviesForReviews = async () => {
    try {
      if (reviews.length > 0) {
        const movieIds = reviews.map((review) => review.moviedb_movieid);

        const responses = await Promise.all(
          movieIds.map(async (movieId) => {
            try {
              const response = await axios.get(`http://localhost:3001/movies/id/${movieId}`);
              return response.data;
            } catch (error) {
              console.error(`Error fetching movie with ID ${movieId}:`, error.response ? error.response.data : error.message);
              return null;
            }
          })
        );

        const movieDatas = responses.filter((response) => response !== null);
        setMovies(movieDatas);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const fetchJoinRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/joinrequest/${group_name}`);
      console.log(response);  // Log the response
      setJoinRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching join requests:', error.response ? error.response.data : error.message);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      // Send a request to your backend to accept the join request
      await axios.post(`http://localhost:3001/joinrequest/accept/${requestId}`);

      // Fetch the updated join requests
      fetchJoinRequests();

      // Optionally, you can fetch other data or perform additional actions after accepting the request
      // For example, you might want to refresh the list of group members
      fetchGroupMembers();
    } catch (error) {
      console.error('Error accepting join request:', error.response ? error.response.data : error.message);
    }
  };


  const handleDeny = async (requestId) => {
    try {
      await axios.put(`http://localhost:3001/joinrequest/deny/${requestId}`);
      // Refresh the join requests after denying
      fetchJoinRequests();
    } catch (error) {
      console.error('Error denying join request:', error.response ? error.response.data : error.message);
    }
  };
  const handleDeleteUser = async (username, isAdminToDelete) => {
    try {
      if (isAdmin && !isAdminToDelete) {
        const response = await axios.delete(`http://localhost:3001/users_groups/${group_name}/${username}`, {
          headers: {
            Authorization: localStorage.getItem('token'), // Include the JWT token in the headers
          },
        });
        window.location.reload();
        console.log('User deleted:', response.data);
      } else {
        console.log('Cannot delete admins or yourself. Only admins can delete members.');
      }
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users_groups/${group_name}`);
        const groupMembers = response.data.map(user => ({ username: user.username, admin: user.admin }));
        setUsernames(groupMembers);

        // Check if the logged-in user is an admin
        const loggedInUser = groupMembers.find(user => user.username === loggedInUsername);
        setIsAdmin(loggedInUser && loggedInUser.admin);
      } catch (error) {
        console.error('Error fetching group members:', error.response ? error.response.data : error.message);
      }
    };

    fetchGroupMembers();
  }, [loggedInUsername, group_name]);

  useEffect(() => {
    fetchGroupReviews();
    fetchJoinRequests();
  }, []);

  useEffect(() => {
    fetchMoviesForReviews();
  }, [reviews]);

  const handleNewsToggle = () => {
    setIsNewsToggled(!isNewsToggled);
  };
  const handleReviewsToggle = () => {
    setIsReviewsToggled(!isReviewsToggled);
  };
  const toggleButton = (
    <Dropdown onSelect={(eventKey, e) => e.preventDefault()} className="ms-auto">
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {/* Three dots icon (ellipsis) */}
        <span>&#8285;</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="custom-dropdown-menu" style={{ minWidth: 'auto', padding: '5px' }}>
        <Dropdown.Item
          className="custom-dropdown-item"
          style={{
            borderRadius: '5px',
            ...(isNewsToggled && { backgroundColor: 'red' }), // Step 3
          }}
          onClick={handleNewsToggle}
        >
          {isNewsToggled ? 'Hide News' : 'Show News'}
        </Dropdown.Item>
        <Dropdown.Item
          className="custom-dropdown-item"
          style={{
            borderRadius: '5px',
            ...(isReviewsToggled && { backgroundColor: 'red' }), // Step 3
          }}
          onClick={handleReviewsToggle}
        >
          {isReviewsToggled ? 'Hide Reviews' : 'Show Reviews'}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  const newsComponent = isNewsToggled && (
  <div style={{ width: '45%', border: '1px solid #ccc', padding: '10px', marginTop: '10px', border: '5px solid #ddd', display: 'flex', flexDirection: 'column' }}>
  <div className='news-container' style={{
    width: '100%',
    height: '300px',
    overflowY: 'scroll',
    backgroundColor: 'white',
    opacity: '0.75',
    margin: 'auto auto',
    gap: '30px',
    padding: '5px',
    borderRadius: '10px',
    marginBottom: '10px',
  }}>
    <FinnkinoFetch />
  </div>
  </div>
  );

  const truncateReview = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
      return text.substring(0, lastSpaceIndex) + '...';
    }
  };
  
  
  const reviewsComponent = isReviewsToggled && (
<div style={{ width: '45%', border: '1px solid #ccc', padding: '10px', marginTop: '10px', border: '5px solid #ddd' }}>
  {/* Display group reviews on the left side */}
  <h3>Group Reviews</h3>
  <ul>
    {reviews.map((review, index) => (
      <li key={index}>
        <strong>{review.username}</strong> - <strong>{movies[index]?.original_title}</strong> - {truncateReview(review.review, 120)}
      </li>
    ))}
  </ul>
</div>
);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Display group reviews on the left side */}
        {reviewsComponent}

        <div style={{ width: '45%', border: '1px solid #ccc', padding: '10px', marginTop: '10px', border: '5px solid #ddd' }}>
          <h3>Group Members</h3>
          <ul>
            {usernames.map((user, index) => (
          <li key={index}>
            <strong>{user.username}</strong> - {user.admin ? 'Admin' : 'Member'}
            {user.admin && <img src={Crown} alt="Crown" style={{ width: '25px', height: '25px', marginLeft: '2px', marginTop: '-6px' }} />}
            {!user.admin && isAdmin && (
              <button
                className="btn btn-danger"
                style={{ marginLeft: '10px', display: isAdmin ? 'inline-block' : 'none' }}
                onClick={() => handleDeleteUser(user.username, user.admin)}
              >
                Delete
              </button>
            )}
          </li>
            ))}
          </ul>

        </div>
        {toggleButton}

      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {newsComponent}

  <div style={{ width: '45%', border: '1px solid #ccc', padding: '10px', marginTop: '10px', border: '5px solid #ddd' }}>
    {/* Display join requests on the right side */}
    <h3>Join Requests</h3>
    <ul>
      {joinRequests
        .filter((request) => request.status === 'pending')
        .map((request) => (
          <li key={request.request_id}>
            {request.sender_username} - {request.created_at} - {request.status}
            <button className="btn btn-success mx-2" onClick={() => handleAccept(request.request_id)}>+</button>
            <button className="btn btn-danger" onClick={() => handleDeny(request.request_id)}>-</button>
          </li>
        ))}
    </ul>
  </div>
</div>
</div>    
  );
}

export default GroupDetail;
