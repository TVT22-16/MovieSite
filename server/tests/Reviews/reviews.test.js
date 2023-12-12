const { expect } = require('chai');
// const chaiHttp = require('chai-http');
const { describe, it, before, after } = require('mocha');
const { getReviewsUpgraded, deleteReview, addReview } = require('../../models/reviews_model');

// chai.use(chaiHttp);

describe('Reviews API', () => {
  before(async () => {
    // Perform any setup before running the tests, e.g., creating a test database or adding test data
  });

  after(async () => {
    // Perform cleanup after running the tests, e.g., removing test data or closing connections
  });

  describe('getReviewsUpgraded', () => {
    it('should get reviews for a user and movie', async () => {
      const response = await getReviewsUpgraded('testuser', '566810');
      
      expect(response).to.be.an('array');
      expect(response).to.have.length.greaterThan(0);
      // Add more specific assertions based on the structure of the response
    });

    it('should handle empty input', async () => {
      const response = await getReviewsUpgraded();
      
      expect(response).to.be.an('array');
      // Add more assertions based on the expected behavior
    });
  });

  describe('addReview', () => {
    it('should add a review and return the review_id', async () => {
      const response = await addReview('testuser', 'Great movie! (automated test review)', 9, '466420');
      
      expect(response).to.be.an('object');
      expect(response).to.have.property('status', 'success');
      expect(response).to.have.property('message', 'Review added successfully');
      expect(response).to.have.property('review').that.is.an('object');
      expect(response.review).to.have.property('review_id').that.is.a('number');
    });
  
    it('should handle user already having a review', async () => {
      const response = await addReview('testuser', 'Great DOUBLE REVIEW', 8, '466420');
      
      expect(response).to.be.an('object');
      expect(response).to.have.property('status', 'error');
      expect(response).to.have.property('message', 'User already has a review for this movie!');
    });
  });


//   describe('deleteReview', () => {
//     it('should delete a review', async () => {
//       // Assuming you have a review ID that exists in your test database
//       const response = await deleteReview('466420');
      
//       expect(response).to.equal('Review with id=466420 was deleted');
//     });

//     it('should handle non-existing review', async () => {
//       const response = await deleteReview('nonExistingReviewId');
      
//       expect(response).to.be.a('string').and.include('Review with id=nonExistingReviewId not found');
//     });
//   });
});