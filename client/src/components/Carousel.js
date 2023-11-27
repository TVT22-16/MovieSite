import React, { useState } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';

const CarouselExample = ({ movies }) => {

  const [slicedMovies, setSlicedMovies] = useState(movies.slice(0, 5));

  return (
    <Carousel>
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

export default CarouselExample;
