import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Navbar = () => {
  const history = useNavigate();
const handleLogut = ()=>{
  localStorage.removeItem('token');
  history("/logout");
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            PlayinstaTask
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/userdetails"
                >
                 User details 
                </Link>
              </li>
            </ul>
            <Buttons>
              {localStorage.getItem('token')?  (<Link onClick={handleLogut} className="btn btn-outline-light" to="/login  ">
                Log Out
                
              </Link>):
           ( <form className="d-flex">

              <Link className="btn btn-outline-light" to="/login">
                Log In
              </Link>
              <Link className="btn btn-outline-light" to="/signup">
                Sign Up
              </Link>
            </form>)}
            </Buttons>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

const Buttons = styled.div` 
      .btn{
        margin-left:20px;
        padding:5px 20px;
      }   
`; 

