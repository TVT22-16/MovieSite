import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';

const FinnkinoFetch = () => {
  const url = 'https://www.finnkino.fi/xml/News/';
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios
      .get(url, {
        params: { format: 'xml' },
        responseType: 'text', // Set the responseType to 'text'
      })
      .then(function (response) {
        // Parse XML to JavaScript object
        parseString(response.data, { explicitArray: false }, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }

          // Extract and set the relevant data
          setNews(result.News.NewsArticle);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {news ? (
        <div>
          {/* Render the extracted data */}
          {news.map((article, index) => (
            <div key={index}>
              <h3>{article.Title}</h3>
              <p>{article.HTMLLead}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FinnkinoFetch;
