import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'


const MovieInfo = (id) => {

  const [searchParams, setSearchParams] = useSearchParams()

  return (
      <div>Movieid: {searchParams.get('id')}</div>
  )
};

export default MovieInfo;