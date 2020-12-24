import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Switch from "react-switch";
import { ImStarFull, ImStarEmpty } from "react-icons/im";
import * as RBS from "react-bootstrap";
import Modal2 from "../components/Modal2"

// ImCheckmark
// ImCross

// ImStarFull
// ImStarEmpty

// ImEye
// ImEyeBlocked

function ComicMain() {
  // Setting our component's initial state
  const [mattsComics, setMattsComics] = useState([])
  const [formObject, setFormObject] = useState({})
  const [toggleStatus, setToggleStatus] = useState(true)
  const [modalShow, setModalShow] = useState(false);


  // Load all books and store them with setBooks
  useEffect(() => {
    getMattsComics()
  }, [])

  function getMattsComics() {
    API.getMattsComics()
      .then(res =>
        setMattsComics(res.data)
      )
      .catch(err => console.log(err));
  }

  function handleToggleChange() {

    if (toggleStatus) {
      setToggleStatus(false)
    } else {
      setToggleStatus(true)
    }

  }

  function toggleWords() {
    if (toggleStatus) {
      return ("own")
    } else {
      return ("need")
    }
  }

  function handleNewSeries() {
    setModalShow(true)
  }


  return (
    <>
      <div className="container-fluid containerStyle">
        <div className="row">
          <div className="col-12">
            {/* State Toggle */}

            <label htmlFor="material-switch" className="toggleSwitch">

              <span>comics that you {toggleWords()}</span>
              <br />
              <Switch
                checked={toggleStatus}
                onChange={() => { handleToggleChange() }}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
              />
            </label>
            <RBS.Button className="searchBtn" onClick={() => handleNewSeries()}>add series</RBS.Button>
            {mattsComics.map(series => (
              <div className="seriesContainer">
                <h2>{series.volume}</h2>
                {toggleStatus ? (
                  series.issues.map(issue => (
                    issue.owned ? (
                      <p>{issue.number}</p>
                    ) : (
                        <></>
                      )
                  ))
                ) : (
                    series.issues.map(issue => (
                      !issue.owned ? (
                        <p>{issue.number}</p>
                      ) : (
                          <></>
                        )
                    ))
                  )}
              </div>
            ))}
            <Modal2 show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </div>
      </div>
    </>

  );
}


export default ComicMain;