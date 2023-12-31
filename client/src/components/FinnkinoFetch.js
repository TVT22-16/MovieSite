import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Card } from 'react-bootstrap';

const FinnkinoFetch = () => {
  const url = 'https://www.finnkino.fi/xml/News/';
  const [news, setNews] = useState(null);
  const [lead,setLead] = useState('');

  const updateLead = (l) => {
    setLead(l);
  }

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
    <>
      {news ? (
        <>
          {news.map((article, index) => (
            article.Title.includes("Leffauutiset") && article.HTMLLead.length > 0 &&(

                    <Card key={index} id={index} style={{}}>
                      <Card.Title style={{margin:'auto auto '}}>
                      <a href={article.ArticleURL} style={{color:'black'}}><h4 style={{fontWeight:'700'}}>{article.Title.slice(13)}</h4></a>
                      </Card.Title>

                      <Card.Footer>
                      <p>{article.HTMLLead}</p>
                      </Card.Footer>
                    </Card>
            )
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
  </>
  );
  
};

export default FinnkinoFetch;
