import axios from 'axios';
import baseUrl from './baseUrl';

const DeleteReview = (id) => {
  axios.delete(`${baseUrl}/reviews/delete/${id}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error deleting review:', error);
    });

  return null;
}

export default DeleteReview;