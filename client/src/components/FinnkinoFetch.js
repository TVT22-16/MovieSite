import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import './Finnkino.css'

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
          console.log(result.News.NewsArticle);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div style={{width:'80%', marginRight:'20%'}}>
      {news ? (
        <div>
          {/* Render the extracted data */}
          {news.map((article, index) => (
            article.Title.includes("Leffauutiset") && (
              <div key={index}>
                <a href={article.ArticleURL} style={{color:'black'}}><h4>{article.Title}</h4></a>
                <p>{article.HTMLLead}</p>
              </div>
            )
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
};

export default FinnkinoFetch;
