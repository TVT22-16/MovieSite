import axios from 'axios';
import baseUrl from './baseUrl';

const DeleteReview = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/reviews/delete/${id}`);
    console.log(`DELETE REVIEW!½!!!!!: ${baseUrl}/reviews/delete/${id}`)
    console.log(response.data);
    // You can return the response data or handle it as needed
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

export default DeleteReview;