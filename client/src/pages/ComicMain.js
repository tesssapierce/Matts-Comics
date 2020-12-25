import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Switch from "react-switch";
import { ImStarFull, ImStarEmpty } from "react-icons/im";
import * as RBS from "react-bootstrap";
import Modal2 from "../components/Modal2"
import { FaWindowClose } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { FaPlus } from "react-icons/fa";

// ImCheckmark
// ImCross

// ImStarFull
// ImStarEmpty

// ImEye
// ImEyeBlocked

function ComicMain() {
  // Setting our component's initial state
  const [mattsComics, setMattsComics] = useState([])
  const [formEntry, setFormEntry] = useState({})
  const [toggleStatus, setToggleStatus] = useState(true)
  const [modalShow, setModalShow] = useState(false);
  const [newIssue, setNewIssue] = useState();


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

  function addSeriesToDB(seriesId, seriesName, seriesPublisher, issues, totalIssues){
    console.log(issues)
    console.log(totalIssues)
    const finalIssues = []

    issues.forEach(issue =>{
      let thisIssue = {
        number: issue.issue_number,
        owned: false
      }
      finalIssues.push(thisIssue)
    })
    const series = {
      volume: seriesName,
      id: seriesId,
      publisher: seriesPublisher,
      issues: finalIssues
    }

    API.addSeries(series)
    .then(res => getMattsComics())
    .catch(err => console.log(err));
  }

  function  handleDeleteSeries(seriesName, seriesId){
    console.log(seriesId)
    const options = {
      childrenElement: () => <div />,
      customUI: ({ onClose }) =>
        <div className='custom-ui'>
          <h1 className="confirmHeader">Are you sure?</h1>
          <p>Are you sure you would like to delete {seriesName}?</p>
          <RBS.Button variant="outline-secondary" onClick={onClose}>No</RBS.Button>
          <RBS.Button variant="outline-secondary" onClick={() => {
            confirmDelete(seriesId)
            onClose()
          }}>Yes, Delete it!</RBS.Button>
        </div>,
      closeOnEscape: true,
      closeOnClickOutside: true,
      willUnmount: () => { },
      afterClose: () => { },
      onClickOutside: () => { },
      onKeypressEscape: () => { }
    };
    confirmAlert(options)
  }

  function confirmDelete(id){
    API.deleteSeries(id)
    .then(res => getMattsComics())
    .catch(err => console.log(err));
  }

  function handleShowAddIssue(){
    document.getElementById("addIssue").style.display = "inline"
  }

  function handleAddIssue(id){
    API.addIssue(id, formEntry.newIssue)
      .then(res =>{
        getMattsComics();
        setFormEntry({ ...formEntry, newIssue: "" })
      })
      .catch(err => console.log(err));
  }

  function handleInputChange(event){
    const { name, value } = event.target;
    setFormEntry({ ...formEntry, [name]: value })
  }

  function getProgress(id){
    let issuesOwned = 0;
    const thisSeries = mattsComics.filter(series => id === series.id)

    if (toggleStatus){
      thisSeries[0].issues.forEach(issue =>{
        switch(issue.owned){
          case true: issuesOwned++;
            break;
          default: break; 
        }
      })
    } else {
      thisSeries[0].issues.forEach(issue =>{
        switch(issue.owned){
          case false: issuesOwned++;
            break;
          default: break; 
        }
      }) 
    }
    return (parseInt((issuesOwned/thisSeries[0].issues.length) * 100))
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
                <h2>{series.volume} <FaWindowClose className="deleteBtn" onClick={()=>{handleDeleteSeries(series.volume, series._id)}}/> <RBS.ProgressBar onClick={ ()=> {getProgress(series.id)}} now={getProgress(series.id)} /></h2>
                <div>
                  <RBS.Form>
                    <RBS.FormControl type="text" placeholder="i.e. '11'" className="mr-sm-2" onChange={handleInputChange} name="newIssue"/>
                    <RBS.Button className="searchBtn" onClick={ ()=>{handleAddIssue(series._id)}}>add issue</RBS.Button>
                  </RBS.Form>
                </div>
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
            <Modal2 addSeriesToDB={addSeriesToDB} show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </div>
      </div>
    </>

  );
}


export default ComicMain;