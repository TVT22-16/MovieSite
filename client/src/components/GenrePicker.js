import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap';

const GenrePicker = ({updateGenres}) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((selectedGenre) => selectedGenre !== genreId)
        : [...prevGenres, genreId]
    );
  };

  useEffect(() => {
    
    updateGenres(selectedGenres);
  },[selectedGenres])

  // Your genre list
  const genreList = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    ScienceFiction: 878,
    TVMovie: 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
    // ... (add other genres as needed)
  };

  const genresInRows = Object.keys(genreList).reduce((acc, genreName, index) => {
    if (index % 3 === 0) {
      // Start a new row for every 3rd genre
      acc.push([{ name: genreName, id: genreList[genreName] }]);
    } else {
      // Add to the existing row
      acc[acc.length - 1].push({ name: genreName, id: genreList[genreName] });
    }
    return acc;
  }, []);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Genres
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {genresInRows.map((row, rowIndex) => (
            <div className='dropRow' key={rowIndex} style={{ display: 'flex', flexDirection: 'row', flexGrow:'1'}}>
              {row.map((genre) => (
                <Button
                  key={genre.id}
                  variant={selectedGenres.includes(genre.id) ? 'primary' : 'secondary'}
                  onClick={() => handleGenreToggle(genre.id)}
                  style={{ margin: '5px' ,flexGrow:'1'}}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default GenrePicker;
