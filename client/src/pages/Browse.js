import React, { useState, useEffect } from "react";
import * as RBS from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";

function Browse(props) {
  // Setting our component's initial state
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Load all comics using setItems
  useEffect(() => {
    getSeriesList()
  }, [])

  useEffect(() => {
    getQuery()
  }, [props.query])

  async function getSeriesList() {

    await fetch("https://lit-badlands-08756.herokuapp.com/https://comicvine.gamespot.com/api/volumes/?api_key=2c56cda4910051c1882de0fb411ba569ca71598b&format=json&limit=2000")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  async function getQuery() {
    const url = 'https://lit-badlands-08756.herokuapp.com/https://comicvine.gamespot.com/api/search/?api_key=2c56cda4910051c1882de0fb411ba569ca71598b&query=' + props.query + '&format=json&resources=volume&limit=2000'
    await fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  return (
    <>
      <div className="container-fluid containerStyle">
        <div className="row">
          <div className="col-12">
            {isLoaded ? (
              <div className="row">
                {items.map(item => (
                  <div className="col-3">
                    <RBS.Card className="browseCard">
                      <RBS.Card.Img variant="top" src={item.image.small_url} />
                      <RBS.Card.Body>
                        <RBS.Card.Title>{item.name}</RBS.Card.Title>
                        <RBS.Card.Text>
                          <p>{item.deck}</p>
                          <p>{item.count_of_issues} issues</p>
                          {item.publisher ? (
                            <p>Publisher: {item.publisher.name}</p>
                          ) : (
                              <></>
                            )}

                          {item.start_year ? (
                            <p>{item.start_year}</p>
                          ) : (
                              <></>
                            )}

                        </RBS.Card.Text>
                        <RBS.Button className="searchBtn">details</RBS.Button>
                      </RBS.Card.Body>
                    </RBS.Card>
                  </div>
                ))}
              </div>
            ) : (
                <div className="loading">
                  <PulseLoader />
                </div>
              )}
          </div>
        </div>
      </div>
    </>

  );
}


export default Browse;

// API FOR SEARCH
// https://comicvine.gamespot.com/api/search/?api_key=2c56cda4910051c1882de0fb411ba569ca71598b&query=Uncanny Xmen&format=json

// API FOR BROWSE
// https://comicvine.gamespot.com/api/series_list/?api_key=2c56cda4910051c1882de0fb411ba569ca71598b&format=json