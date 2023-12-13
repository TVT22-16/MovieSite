const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const { getReviewsUpgraded, deleteReview, addReview } = require('../../models/reviews_model');

// chai.use(chaiHttp);

let addedReviewID = '';

describe('Reviews API models', () => {


  before(async () => {
    // Perform any setup before running the tests, e.g., creating a test database or adding test data
  });

  after(async () => {
    // Perform cleanup after running the tests, e.g., removing test data or closing connections
  });

  //todo add 'done' here
  describe('getReviewsUpgraded', () => {

    it('should get reviews for a user and movie', async () => {
      const response = await getReviewsUpgraded('testuser', '566810');
      
      expect(response).to.be.an('array');
      expect(response).to.have.length.greaterThan(0);

    });

    it('should handle empty input', async () => {
      const response = await getReviewsUpgraded();
      
      expect(response).to.be.an('array');

    });
  });



  describe('addReview', () => {
    it('Should not allow undefined user to make a review', async () =>{
      const response = await addReview('nonexistentuser69', 'nonexistent user! (automated test review)', 1, '466420');
      expect(response.message).to.equal("User does not exist");

    });

    it('should add a review and return the review_id', async () => {
      const response = await addReview('testuser', 'Great movie! (automated test review)', 9, '466420');

      //Get reviewid to test deleting it
      addedReviewID = response.review.review_id;

      expect(response).to.be.an('object');
      // expect(response).to.have.property('status', 'success');
      expect(response.status).to.equal(200);
      expect(response).to.have.property('message', 'Review added successfully');
      expect(response).to.have.property('review').that.is.an('object');
      expect(response.review).to.have.property('review_id').that.is.a('number');
    });
  
    it('should handle user already having a review', async () => {
      const response = await addReview('testuser', 'Great DOUBLE REVIEW', 8, '466420');
      
      expect(response).to.be.an('object');
      expect(response.status).to.equal(403);
      expect(response).to.have.property('message', 'User already has a review for this movie!');
    });
  });


  describe('deleteReview', () => {
    it('should delete a review', async () => {

      const response = await deleteReview(addedReviewID);
      
      expect(response).to.equal(`Review with id=${addedReviewID} was deleted`);
    });

    it('should handle non-existing review', async () => {
      const response = await deleteReview('0');
      
      expect(response).to.be.a('string').and.include('Review with id=0 not found');
    });
  });
});