

import React, { useState, useEffect } from "react"
import * as RBS from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import { FaPlus } from "react-icons/fa";
import API from "../../utils/API";

function Modal2(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [formEntry, setFormEntry] = useState({})
  const [query, setQuery] = useState("")
  const [items, setItems] = useState([]);
  const [addSeries, setAddSeries] = useState({image: [{medium_url: ""}]})

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

  function handleSeriesAdd(item){
    console.log(item)
    setAddSeries(item)
    document.getElementById("seriesSearch").style.display = "none"
    document.getElementById("seriesConfirm").style.display = "inline"
  }

  async function handleSeriesConfirm(){
    console.log(addSeries.id)
    const url = "https://lit-badlands-08756.herokuapp.com/https://comicvine.gamespot.com/api/issues/?api_key=2c56cda4910051c1882de0fb411ba569ca71598b&format=json&filter=volume:" + addSeries.id + "&sort=cover_date:asc"

    await fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          props.addSeriesToDB(addSeries.id, addSeries.name, addSeries.publisher.name, result.results, result.number_of_total_results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    props.onHide()
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
        <div className="seriesSearch" id="seriesSearch">
          {/* Search Form */}
          <div className="searchForm seriesSearchForm">
            <RBS.FormControl type="text" placeholder="Uncanny Xmen" className="mr-sm-2" value={formEntry.query} onChange={handleInputChange} name="query" />
            <RBS.Button className="searchBtn" onClick={handleSubmit}>Search</RBS.Button>
          </div>
          {/* Results */}
          {isLoaded ? (
            <div className="row">
                <div className="col-12 col-sm-6 col-lg-3">
                  <RBS.Table className="issuesTable" striped bordered hover>
                    <tr>
                      <th></th>
                      <th>id</th>
                      <th>Series Name</th>
                      <th>Publisher</th>
                      <th>Start Year</th>
                      <th>Details</th>
                    </tr>
                    <tbody>
                      {items.map(item => (
                        <tr>
                          <td><FaPlus onClick={ () =>{handleSeriesAdd(item)}}/></td>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.publisher.name}</td>
                          <td>{item.start_year}</td>
                          <td>{item.deck}</td>
                        </tr>
                      ))}
                    </tbody>
                  </RBS.Table>
                </div>
            </div>
          ) : (
              <div className="loading">
                <PulseLoader />
              </div>
            )}
        </div>
        <div className="seriesConfirm" id="seriesConfirm">
          <p>are you sure you would like to add {addSeries.name}?</p>
          <img src={addSeries.image.medium_url} />
          <p>Details:</p>
          <ul>
            <li>id: {addSeries.id}</li>
            <li>Start Year: {addSeries.start_year}</li>
            <li>Descrtiption: {addSeries.deck}</li>
            <li>{addSeries.count_of_issues} total issues</li>
          </ul>
          <RBS.Button className="searchBtn" onClick={()=>{handleSeriesConfirm()}}>Add</RBS.Button>
        </div>
      </RBS.Modal.Body >
      <RBS.Modal.Footer>
        <RBS.Button className="searchBtn" onClick={props.onHide}>Close</RBS.Button>
      </RBS.Modal.Footer>
    </RBS.Modal >
  );
}

export default Modal2;
