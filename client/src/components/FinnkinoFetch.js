import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FinnkinoFetch = () => {
  const url = 'https://www.finnkino.fi/xml/News/';
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(url, {
        params: { format: 'xml' },
        responseType: 'document',
      })
      .then(function (response) {
        // Extract and set the XML data
        setNews(response.data);
        console.log(response.data); // Make sure the data looks as expected
      })
      .catch(function (error) {
        console.error(error);
      });}, []);

  return (
    <div>
      {/* Render the XML data in a readable format or extract relevant information */}
      <pre>{JSON.stringify(news, null, 2)}</pre>
      <p>pööpöö</p>
    </div>
  );
};

export default FinnkinoFetch;
