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
    <div className='wutwut' style={{width:'90%', margin: '5px auto'}}>
      {news ? (
        <div>

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
