

import React, { useState, useEffect } from "react"
import * as RBS from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";

function Modal(props) {

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getIssues()
    console.log(items)
  }, [props.modalVolume])

  async function getIssues() {

    const url = "https://comicvine.gamespot.com/api/issues/?api_key=2c56cda4910051c1882de0fb411ba569ca71598b&format=json&limit=2000&filter=volume:" + props.modalVolume.id + "&sort=cover_date:asc"

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
          <h2>{props.modalVolume.name}</h2>
          {props.modalVolume.start_year}
        </RBS.Modal.Title>
      </RBS.Modal.Header>
      {isLoaded ? (
      <RBS.Modal.Body>
        <div className="modalBody2">
          <div className="modalBody3">
        {/* <h4>{items.length} total issues</h4> */}
          <RBS.Table className="issuesTable" striped bordered hover>
            <tr>
              <th></th>
              <th>Issue #</th>
              <th>Image</th>
              <th>Cover Date</th>
              <th>Details</th>
            </tr>
            <tbody>
              {items.map(item => (
                <tr>
                  <td><FaPlus /></td>
                  <td>{item.issue_number}</td>
                  <td><img src={item.image.thumb_url}/></td>
                  <td>{item.cover_date}</td>
                  <td><a href={item.site_detail_url}>visit here</a></td>
                </tr>
              ))}
            </tbody>
          </RBS.Table>
          </div>
        </div>
      </RBS.Modal.Body>
      ) : (
                <div className="loading">
                  <PulseLoader />
                </div>
              )}
      <RBS.Modal.Footer>
        <RBS.Button className="searchBtn" onClick={props.onHide}>Close</RBS.Button>
      </RBS.Modal.Footer>
    </RBS.Modal>
  );
}

export default Modal;
