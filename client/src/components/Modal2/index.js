

import React, { useState, useEffect } from "react"
import * as RBS from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";

function Modal(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [formEntry, setFormEntry] = useState({})
  const [query, setQuery] = useState("")
  const [items, setItems] = useState([]);

  useEffect(() => {
    getQuery()
  }, [query])

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormEntry({ ...formEntry, [name]: value })
  };

  function handleSubmit(event) {
    event.preventDefault()
    setQuery(formEntry.query)
  }

  async function getQuery() {
    const url = 'https://lit-badlands-08756.herokuapp.com/https://comicvine.gamespot.com/api/search/?api_key=2c56cda4910051c1882de0fb411ba569ca71598b&query=' + query + '&format=json&resources=volume&limit=2000'
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
    <RBS.Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <RBS.Modal.Header closeButton>
        <RBS.Modal.Title id="contained-modal-title-vcenter">
          <h2>Add a new series</h2>
        </RBS.Modal.Title>
      </RBS.Modal.Header>
      <RBS.Modal.Body>
        <div className="seriesSearch">
          {/* Search Form */}
          <div className="searchForm seriesSearchForm">
            <RBS.FormControl type="text" placeholder="Uncanny Xmen" className="mr-sm-2" value={formEntry.query} onChange={handleInputChange} name="query" />
            <RBS.Button className="searchBtn" onClick={handleSubmit}>Search</RBS.Button>
          </div>
          {/* Results */}
          {isLoaded ? (
            <div className="row">

              {items.map(item => (
                <div className="col-12 col-sm-6 col-lg-3">
                 <p>{item.name}</p>
                 </div>
              ))}
            </div>
          ) : (
            <div className="loading">
              <PulseLoader />
            </div>
          )}
        </div>
      </RBS.Modal.Body >
      <RBS.Modal.Footer>
        <RBS.Button className="searchBtn" onClick={props.onHide}>Close</RBS.Button>
      </RBS.Modal.Footer>
    </RBS.Modal >
  );
}

export default Modal;
