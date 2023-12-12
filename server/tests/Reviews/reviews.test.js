const { expect } = require('chai');
const { getReviewsUpgraded } = require('../models/reviews_model');

describe('Get reviews', () => {
  it('Should get reviews json object array', async () => {
    // Replace 'your-app-url' with the actual URL where your application is running
    const response = await getReviewsUpgraded('testUser', 'testMovieId');

    // Add assertions based on the expected behavior of your getReviewsUpgraded function
    expect(response).to.be.an('array');
    expect(response).to.have.length.greaterThan(0);

    // Add more specific assertions based on the structure of the response
    // For example, if each review object should have certain properties
    expect(response[0]).to.have.property('username');
    expect(response[0]).to.have.property('review');
    expect(response[0]).to.have.property('rating');
    expect(response[0]).to.have.property('moviedb_movieid');
    expect(response[0]).to.have.property('created_at');
  });
});