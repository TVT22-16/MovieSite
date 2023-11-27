import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselBS = ({ movies, updateBackdrop }) => {
  const [slicedMovies, setSlicedMovies] = useState(movies.slice(0, 5));
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setCurrentSlideIndex(selectedIndex);
    // Update backdrop based on the current index
    const currentMovie = slicedMovies[selectedIndex];
    updateBackdrop(currentMovie.backdrop_path);
  };

  return (
    <Carousel fade={false} interval={null} onSelect={handleSelect}>
      {slicedMovies.map((movie, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Slide ${index}`}
          />

          <Carousel.Caption>
            {/* You can remove this line as the backdrop is now updated in handleSelect */}
            {/* {updateBackdrop(movie.backdrop_path)} */}

            <h3>{movie.title}</h3>
            <p>{/* Add additional movie information here if needed */}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselBS;
