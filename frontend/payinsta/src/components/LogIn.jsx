import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogIn = () => {
  const host = process.env.REACT_APP_API_URL;
  const [credentials, setCredentials] = useState({ user_email: "", password: "" });
  const [loading, setLoading] = useState(false);
  
  const history = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(`${host}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.user_email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token',json.authToken);
      history("/userdetails");
      setLoading(false);
    }else{
      alert("invalid credentials,Please enter Valid Details");
      setLoading(false);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container>

      {loading?<h1 className="loader">...Loading</h1>:<form onSubmit={handleSubmit} method="POST">
        <h3>Login to continue</h3>

        <Row>
          <Label>
            <label htmlFor="user_email">User Email : </label>
          </Label>
          <Input>
            <input
              onChange={onChange}
              type="text"
              id="user_email"
              name="user_email"
              placeholder="Enter your Email"
              value={credentials.email}
            />
          </Input>
          <br />
        </Row>

        <Row>
          <Label>
            <label htmlFor="password">Password : </label>
          </Label>
          <Input>
            <input
              onChange={onChange}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
            />
          </Input>
          <br />
        </Row>
        <Buttons>
          <input className="btn btn-success" type="submit" value="Log In" />
          <Link className="btn btn-primary" to="/signup">
            Sign Up
          </Link>
        </Buttons>
      </form>}
    </Container>
  );
};

export default LogIn;
const Container = styled.div`
  
  padding-top: 2rem;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 600px) {
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
    margin: 0;
    text-align: left;
    margin-bottom: 50px;
  }

  h3 {
    color: blue;
    letter-spacing: 0.5px;
    padding-bottom: 40px;
    text-align: center;
  }

  margin-bottom: 100px;
  .loader{
    align-items:center;
    text-align:center;
    margin-top:10%;
  }
`;

const Row = styled.div`
  .calenderDate {
    input {
      width: 20rem;

      border-radius: 8px;
      border: none;
      background-color: #2b5a89;
      color: white;
      padding: 8px;
      @media (max-width: 600px) {
        width: 70%;
      }
    }
  }
`;

const Label = styled.div`
  @media (min-width: 600px) {
    float: left;
    width: 25%;
    margin-top: 6px;
  }

  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
  }
`;

const Input = styled.div`
  @media (min-width: 600px) {
    float: left;
    width: 75%;
    margin-top: 6px;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="tel"],
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #796b6b;
    border-radius: 4px;
    resize: vertical;
    font-size: 18px;
    color: blue;
  }

  input[type="date"] {
    width: 10px;
  }
`;

const Buttons = styled.div`
  float: right;
  margin-top: 2rem;

  .btn {
    margin-left: 50px;
    padding: 5px 20px;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    float: right;
    .btn-primary {
      margin-top: 1.5rem;
    }
  }
`;
