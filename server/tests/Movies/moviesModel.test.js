const {expect} = require('chai');
// const request = require('supertest');
const { searchMovies, getMovieByID, getMovieTrailer, getMoviesUpgraded } = require('../../models/movies_model');


describe('Movies API model', () => {

    describe('Get Movies', () => {
      it('Should get a certain movie with given id', async () => {

        const response = await getMovieByID(466420);
        expect(response.title).to.equal('Killers of the Flower Moon');

      });

    describe('Get trailer', () =>{
        it('Should get trailer links with given id', async () =>{

            const response = await getMovieTrailer(466420);
            expect(response).to.be.an('array');

        })
    })
      
    


    });
  });