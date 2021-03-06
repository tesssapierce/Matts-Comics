import React, { useState, useEffect } from "react";
import * as RBS from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import Modal from "../components/Modal"

function Browse(props) {
  // Setting our component's initial state
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [formEntry, setFormEntry] = useState({})
  const [modalShow, setModalShow] = useState(false);
  const [modalVolume, setModalVolume] =useState([])
  const [queryHistory, setQueryHistory] = useState([])
  const [query, setQuery] = useState(queryHistory[0])

  useEffect(()=>{
    const localHistory = localStorage.getItem("localHistory")
    if (localHistory) {
      setQueryHistory(JSON.parse(localHistory))
    }
  }, [])

  useEffect(() => {

    if (query){
      if (!queryHistory.includes(query)){
        queryHistory.push(query)
        console.log(queryHistory)
        saveToLocalStorage();
      }
    }
  }, [query])

  function saveToLocalStorage() {
    localStorage.setItem("localHistory", JSON.stringify(queryHistory))
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormEntry({ ...formEntry, [name]: value })
  };

  function handleSubmit(event){
    event.preventDefault()
    setQuery(formEntry.query)
  }

  // Load all comics using setItems
  useEffect(() => {
    if (query){
      getQuery()
    } else {
      getSeriesList()
    }
  }, [])
  
  useEffect(() => {
      getQuery()
      setIsLoaded(false)
  }, [query])

  async function getSeriesList() {

    await fetch("https://lit-badlands-08756.herokuapp.com/https://comicvine.gamespot.com/api/volumes/?api_key=2c56cda4910051c1882de0fb411ba569ca71598b&format=json&limit=2000&sort=date_added:desc")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result.results);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  async function getQuery() {
    const url = 'https://lit-badlands-08756.herokuapp.com/https://comicvine.gamespot.com/api/search/?api_key=2c56cda4910051c1882de0fb411ba569ca71598b&query=' + query + '&format=json&resources=volume&limit=2000'
    await fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result.results);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }

  function handleDetails(item){
    setModalShow(true)
    setModalVolume(item)
  }

  function handlePastQuery(query){ 
    console.log(query)
    setQuery(query)
  }

  function handleClearSearhHistory(){
    localStorage.removeItem("localHistory")
    setQueryHistory([])
  }

  return (
    <>
      <div className="container-fluid containerStyle">
        <div className="row centered">
          <div className="col-12 col-md-2">
          <RBS.Form inline className="browseHeader">
            { query ? (
              <p className="centered">results for {query}</p>
            ):(
              <p className="centered">search here</p>
            )}
            <div className="searchForm">
            <RBS.FormControl type="text" placeholder="Uncanny Xmen" className="mr-sm-2" value={formEntry.query}  onChange={handleInputChange} name="query"/>
            <RBS.Button className="searchBtn" onClick={handleSubmit}>Search</RBS.Button>
            </div>
          </RBS.Form>
          <div className="row">
            {queryHistory.map(query => (
              <div className="col-12">
              <button className="searchHistoryBtn btn" onClick={() => handlePastQuery(query)}>{query}</button>
              </div>
            ))}

            { queryHistory.length > 0 ? (
            <div className="col-12">
              <button className="searchHistoryBn btn" onClick={() => handleClearSearhHistory()}>Clear Search History</button>
            </div>

            ):(
              <div className="col-12">
              {/* <button className="searchHistoryBn btn" onClick={() => handleClearSearhHistory()}>Clear Search History</button> */}
            </div>
            )}
          </div>

          </div>
          <div className="col-12 col-md-10">
            {isLoaded ? (
              <>
              <div className="row">
                {items.map(item => (
                  <div className="col-12 col-sm-6 col-lg-3">
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
                        <RBS.Button className="searchBtn" onClick={() => handleDetails(item)}>details</RBS.Button>
                      </RBS.Card.Body>
                    </RBS.Card>
                  </div>
                ))}
              </div>
                    <Modal show={modalShow} onHide={() => setModalShow(false)} modalVolume={modalVolume} />
                  </>
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