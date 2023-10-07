import { Button } from 'react-bootstrap';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundError = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='text-center d-block position-relative w-80 mx-100 xy-auto'>
        <div className='_404'>404</div>
        <hr />
        <div>THE PAGE</div>
        <div>WAS NOT FOUND</div>
        <Button variant='dark' onClick={() => navigate(-1)}>GO BACK</Button>
      </div>
    </div>
  )
};

export default NotFoundError;