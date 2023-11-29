import axios from 'axios';

const DeleteReview = (id) => {
  axios.delete(`http://localhost:3001/reviews/delete/${id}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error deleting review:', error);
    });

  return null;
}

export default DeleteReview;