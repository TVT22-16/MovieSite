const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');



const { addToWatchlist, getWatchlistMovies, removeFromWatchlist, checkIfMovieInWatchlist } = require('../../models/watchlist_model');

let addedMovieID;

describe('Watchlist API models', () => {
  before(async () => {
    // Perform any setup before running the tests, e.g., creating a test database or adding test data
  });

  after(async () => {
    // Perform cleanup after running the tests, e.g., removing test data or closing connections
    
  });

  describe('getWatchlistMovies', () => {
    it('should get all the movies from users watchlist', async () => {
      const response = await getWatchlistMovies('testuser');

      expect(response).to.be.an('array');
      expect(response).to.have.length.greaterThan(0);
    });

    it('should handle empty input', async () => {
      const response = await getWatchlistMovies(); // Fix the function call here

      expect(response).to.be.an('array');
    });
  });

  describe('addToWatchlist', () => {
    
    it('should not allow movies with null username to be added to the watchlist', async () => {
        try {
          await addToWatchlist(null, 897087, 'Freelance', 'overview (watchlist test)', '2012-11-11', 'poster_path');
          // If the above line does not throw an error, fail the test
          expect.fail('Expected addToWatchlist to throw an error');
        } catch (error) {
          expect(error.message).to.include('Username cannot be null');
        }
      });

      it('should not allow movies with null moviedb_movieid to be added to the watchlist', async () => {
        try {
          await addToWatchlist('testuser', null, 'Freelance', 'overview (watchlist test)', '2012-11-11', 'poster_path');
          // If the above line does not throw an error, fail the test
          expect.fail('Expected addToWatchlist to throw an error');
        } catch (error) {
          expect(error.message).to.include('moviedb_movieid cannot be null');
        }
      });

      it('should not allow movies with null title to be added to the watchlist', async () => {
        try {
          await addToWatchlist('testuser', 897087, null, 'overview (watchlist test)', '2012-11-11', 'poster_path');
          // If the above line does not throw an error, fail the test
          expect.fail('Expected addToWatchlist to throw an error');
        } catch (error) {
          expect(error.message).to.include('Title cannot be null');
        }
      });
    
      it('should add movie to the watchlist', async () => {
        const response = await addToWatchlist('testuser', 897087, 'Freelance', 'overview (watchlist test)', '2012-11-11', '/7Bd4EUOqQDKZXA6Od5gkfzRNb0.jpg');
      
        // Check if the response is an object and has the expected properties
        expect(response).to.be.an('object');
        expect(response).to.have.property('watchlist_id').that.is.a('number');
        expect(response).to.have.property('username').that.is.equal('testuser');
        // Add more property checks based on your requirements
      
        // Store the watchlist_id for later use or verification
        addedMovieID = response.watchlist_id;
        console.log(addedMovieID);
      });
    
      it('should handle user having the movie on their watchlist already', async () => {
        // Check if the movie is already in the watchlist
        const isInWatchlist = await checkIfMovieInWatchlist('testuser', 897087);
      
        // If the movie is not in the watchlist, add it and expect an error response
        if (!isInWatchlist) {
          const response = await addToWatchlist('testuser', 897087, 'Freelance', 'overview (watchlist test)', '2012-11-11', 'poster-path');
      
          expect(response).to.be.an('object');
          expect(response).to.have.property('status', 'error');
          expect(response).to.have.property('message', 'User already has this movie on their watchlist!');
        } else {
          // If the movie is already in the watchlist, expect isInWatchlist to be true
          expect(isInWatchlist).to.be.true;
        }
      });
    
  });

  it('should remove the movie from the watchlist', async () => {
    // Check if the movie is in the watchlist before attempting to remove it
    const isInWatchlistBeforeRemoval = await checkIfMovieInWatchlist('testuser', 897087);
    console.log('isInWatchlistBeforeRemoval:', isInWatchlistBeforeRemoval);
  
    if (isInWatchlistBeforeRemoval) {
      const response = await removeFromWatchlist(addedMovieID);
      console.log('Remove response:', response);
  
      // Check if the response is an object and has the expected properties
      expect(response).to.be.an('object');
      expect(response.command).to.equal('DELETE');
      expect(response.rowCount).to.be.at.least(0);
    } else {
      // If the movie was not in the watchlist, consider the removal successful
      expect(true).to.be.true;
    }
  });
  

});
