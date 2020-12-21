import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Nav from "../components/Nav"

function ComicMain() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
  
  }, [])


    return (
      <>
      <div className="container-fluid containerStyle">
        <div className="row">
          <div className="col-12">
            this is where things go
          </div>
        </div>
      </div>
      </>
    
    );
  }


export default ComicMain;