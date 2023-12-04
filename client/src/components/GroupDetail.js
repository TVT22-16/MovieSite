import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Crown from './images/crown.png';
import './GroupDetail.css';
import FinnkinoFetch from './FinnkinoFetch';

function GroupDetail() {
  const { group_name } = useParams();
  const [usernames, setUsernames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isNewsToggled, setIsNewsToggled] = useState(true);

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

  useEffect(() => {
    fetchGroupMembers();
    fetchGroupReviews();
  }, []);

  useEffect(() => {
    fetchMoviesForReviews();
  }, [reviews]);

  const handleToggle = () => {
    setIsNewsToggled(!isNewsToggled);
  };

  const toggleButton = (
    <button onClick={handleToggle}>
      {isNewsToggled ? 'Hide News' : 'Show News'}
    </button>
  );

  const newsComponent = isNewsToggled && <FinnkinoFetch />;

  return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Display group reviews on the left side */}
          <div style={{ width: '45%', border: '1px solid #ccc', padding: '10px', marginTop: '10px', border: '5px solid #ddd' }}>
            <h3>Group Reviews</h3>
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <strong>{review.username}</strong> - <strong>{movies[index]?.original_title}</strong> - {review.review}
                </li>
              ))}
            </ul>
          </div>

          {/* Display group members on the right side */}
          <div style={{ width: '45%', border: '1px solid #ccc', padding: '10px', marginTop: '10px', border: '5px solid #ddd' }}>
            <h3>Group Members</h3>
            <ul>
              {usernames.map((user, index) => (
                <li key={index}>
                  <strong>{user.username}</strong> - {user.admin ? 'Admin' : 'Member'}
                  {user.admin && <img src={Crown} alt="Crown" style={{ width: '25px', height: '25px', marginLeft: '2px', marginTop: '-6px' }} />}
                </li>
              ))}
            </ul>
          </div>
        </div>
    <div className='news-container' style={{
      display: 'flex',
      width: '45%',
      height: '400px',
      overflowY: 'scroll',
      float: 'left',
      border: '5px solid #ddd',
      marginTop: '5px',
      backgroundColor: 'white',
      borderRadius: '10px',
      marginBottom: '50px'
    }}>
      {toggleButton}
      {newsComponent}
    </div>
    </div>
  );
}

export default GroupDetail;
