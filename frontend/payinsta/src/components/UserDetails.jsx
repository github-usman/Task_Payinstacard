import React,{useContext, useEffect,} from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import { styled } from "styled-components";
import female from "./images/female.png";
import male from "./images/male.png";
const UserDetails = () => {
    const data = useContext(noteContext);
    const {userData,userDetails} = data;
    const history = useNavigate();
    
    // userDetails();
   
    useEffect(() => {
      if(localStorage.getItem('token')){
        userDetails();
      }else{
        history("/login");
      }

    }, []);
    
  

  return (
    <Container>
      {
         <div className="card mb-3" >
        <div className="row g-0">
            <div className="col-md-4" style={{alignSelf:"center"}}>
            <img style={{maxWidth:"10rem",maxHeight:"10rem"}} src={(userData.gender === 'female'?female:male)} className="img-fluid rounded-start" alt="profile"/>
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h4 className="card-title">Name : {userData.full_name}</h4>
                <h6>E-mail : {userData.email}</h6>
                <h6>User Name : {userData.user_name}</h6>
                 <h6>Phone Number : {userData.phone}</h6>
                <p>Gender : {userData.gender}</p>
                <p>DOB : {new Date(userData.age).toDateString() }</p>
                <p className="card-text">Address : {userData.address}</p>

                <p className="card-text"><small className="text-muted">Account create on {new Date().toDateString()}</small></p>
            </div>
            </div>
        </div>
        </div>
          }
    </Container>
  );
};

export default UserDetails;


const Container = styled.div`
  margin:0 auto;
  margin-top:100px;
  /* text-transform: capitalize; */
`