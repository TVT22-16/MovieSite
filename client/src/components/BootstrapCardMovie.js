import React from 'react';
import { Card } from 'react-bootstrap';

function BootstrapCard({ movie, cardWidth = '16rem', cTitle= true, cRelease=true}) {
  const titleStyle = {
    height: '3rem', // Set a fixed height for the title 
    overflow: 'hidden',
    textOverflow: 'ellipsis', // (...) for overflowed text
    whiteSpace: 'normal',
    fontWeight: '600',
    fontSize: '0.75rem', // Adjust the font size as needed
  };

  return (
    <Card style={{ width: cardWidth }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <Card.Body className="text-center">
        
        <Card.Title style={titleStyle}>{cTitle === true && (<>{movie.title}</>)}</Card.Title>
        <Card.Subtitle>{movie.release_date}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default BootstrapCard;
