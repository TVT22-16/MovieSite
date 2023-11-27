import { CardFooter, CardSubtitle } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BootstrapCard({img,title,voteaverage,release}) {
  return (
    <Card>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${img}`} />
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        {/* <CardSubtitle>{voteaverage}</CardSubtitle> */}
        <CardSubtitle>{release}</CardSubtitle>
      </Card.Body>
    </Card>
  );
}

export default BootstrapCard;