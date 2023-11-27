import React from 'react';
import { Card } from 'react-bootstrap';

//source: https://react-bootstrap.netlify.app/docs/components/cards


function BootstrapCard({ movie }) {
  const titleStyle = {
    height: '3rem', // Set a fixed height for the title
    overflow: 'hidden',
    textOverflow: 'ellipsis', // (...) for overflowed text
    whiteSpace: 'normal', 
    fontWeight: '600',
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <Card.Body className="text-center">
        <Card.Title style={titleStyle}>{movie.title}</Card.Title>
        {/* <CardSubtitle>{voteaverage}</CardSubtitle> */}
        <Card.Subtitle>{movie.release_date}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default BootstrapCard;
