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

  const updateMovies = (movies) => {
    setSlicedMovies(movies.slice(0, 10));
  }
  
  useEffect(() => {
    updateMovies(movies);
  }, [movies]);


  const openInfo = (id) => {

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
      interval={8000}
      onSelect={handleSelect}
      style={{width:'100%',opacity: fadeIn ? 1 : 0, transition: 'opacity 0.5s ease', margin: 'auto auto',
      flexGrow:'1', marginTop:'10px', marginBottom: '10px'}} 
    >
      {slicedMovies.map((movie, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 carousel-image"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={`Slide ${index}`}
            style={{
              maxWidth: '100%',
              objectFit: 'cover',
              height:'400px',
              borderRadius:'5px',
              width:'auto'
             }}
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
