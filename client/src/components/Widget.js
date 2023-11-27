import React from 'react';
import { Card } from 'react-bootstrap';

function BootstrapCard({ img, title, voteaverage, release }) {
  const titleStyle = {
    height: '3rem', // Set a fixed height for the title
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Display ellipsis (...) for overflowed text
    whiteSpace: 'normal', // Allow text to wrap and expand vertically
    fontWeight: '600',
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${img}`} />
      <Card.Body className="text-center">
        <Card.Title style={titleStyle}>{title}</Card.Title>
        {/* <CardSubtitle>{voteaverage}</CardSubtitle> */}
        <Card.Subtitle>{release}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default BootstrapCard;
