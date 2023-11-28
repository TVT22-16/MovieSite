import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselBS = ({ movies, updateBackdrop }) => {
  const [slicedMovies, setSlicedMovies] = useState(movies.slice(0, 10));
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  const handleSelect = (selectedIndex, e) => {
    setCurrentSlideIndex(selectedIndex);
    // Update backdrop based on the current index
    const currentMovie = slicedMovies[selectedIndex];
    updateBackdrop(currentMovie.backdrop_path);
  };


  const openInfo = (id) => {
    console.log(`Movie with id ${id}`);

    window.location.href = `/movieinfo/?id=${id}`;
  };
  
  useEffect(() => {
    // Set a short timeout to trigger the fade-in effect after the initial render
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <Carousel
      fade={false}
      interval={null}
      onSelect={handleSelect}
      style={{opacity: fadeIn ? 1 : 0, transition: 'opacity 0.5s ease' }} // Adjust the max-width and margin
    >
      {slicedMovies.map((movie, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 carousel-image"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} // Adjust the width of the image
            alt={`Slide ${index}`}
            style={{
              maxHeight: '300px',
              objectFit: 'cover', }}
            onClick={() => openInfo(movie.id)}
          />

          <Carousel.Caption>
            <h3>{movie.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselBS;
