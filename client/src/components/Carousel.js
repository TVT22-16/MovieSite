import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselBS = ({ movies }) => {
  console.log('Movies index 0: ', movies[0]);

  const [slicedMovies, setSlicedMovies] = useState(movies.slice(0, 5));

  return (
    <Carousel fade={false} interval={null}>
      {slicedMovies.map((movie, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Slide ${index}`}
          />

          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <p>{/* Add additional movie information here if needed */}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselBS;
