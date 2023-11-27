import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';

function MinimWidget({content}) {
  const [showToast, setShowToast] = useState(true);

  const toggleToast = () => {
    setShowToast(!showToast);
  };

  return (
    <>
      <Button onClick={toggleToast} size="sm">
        Popular Movies
      </Button>
      <Toast show={showToast} onClose={toggleToast} style={{width:'50%'}}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Popular Movies</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>{content}</Toast.Body>
      </Toast>
    </>
  );
}

export default MinimWidget;
