const {expect} = require('chai');
// const request = require('supertest');
const { searchMovies, getMovieByID, getMovieTrailer, getMoviesUpgraded } = require('../../models/movies_model');


describe('Movies API model', () => {

    describe('Get Movies', () => {
      it('Should get a certain movie with given id', async () => {
        const response = await getMovieByID(466420);
        expect(response.title).to.equal('Killers of the Flower Moon');
      });
  
      it('Should return 1. page of popular movies and page number without arguments', async () => {
        const response = await getMoviesUpgraded();
        expect(response.page).to.be.an('number');
        expect(response.results).to.be.an('array');
      });

      it('Should return movies based on search', async()=>{

        const response = await searchMovies('cars',1);
        expect(response.page).to.be.an('number');
        expect(response.results).to.be.an('array');
        expect(response.results[0].title.toLowerCase()).to.include('cars');

      })
  
      it('Should get trailer links with given id', async () => {
        const response = await getMovieTrailer(466420);
        expect(response).to.be.an('array');
      });
  
      it('Should get upgraded movies with provided filters', async () => {
        const response = await getMoviesUpgraded('popularity.desc', 7, '28', '2022-01-01', 1, 100);
        expect(response.page).to.be.an('number');
        expect(response.results).to.be.an('array');
      });
  
    });
  });