import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";

function Login(props) {

  const [formEntry, setFormEntry] = useState({})

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormEntry({ ...formEntry, [name]: value })
  };

  const history = useHistory();

  function handleSubmit(event){
    event.preventDefault()
    props.setAuth(formEntry)
  }

  return (

    <>
      <div className="container containerStyle loginForm">
        <div className="row">
          <div className="col-12">
            { props.isAuth ? (
                          <div>
                          You are logged in silly
                        </div>
            ):(
              <form>
              <h2>Sign In</h2>

              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" value={formEntry.email} onChange={handleInputChange} name="email" />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={formEntry.password} onChange={handleInputChange} name="password"/>
              </div>

              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </form>
            )}
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;