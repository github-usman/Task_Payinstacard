import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const host = process.env.REACT_APP_API_URL;
  const [credentials, setCredentials] = useState({
    full_name: "",
    user_name: "",
    email: "",
    phone:"",
    password: "",
    cpassword: "",
    gender: "",
    age: "",
    address:""
  });
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
   const {full_name,user_name,email,password,gender,age,phone,address} = credentials;
    const response = await fetch(`${host}auth/createuser`, {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name,user_name,email,password,gender,age,phone,address
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history("/userdetails");
    } else {
      // alert("invalid credentials")
      alert(json.error);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} method="POST">
        <h3>Sign Up : Create an account</h3>

        <Row>
          <Label>
            <label htmlFor="full_name">Full Name* : </label>
          </Label>
          <Input>
            <input
              type="text"
              id="full_name"
              name="full_name"
              placeholder="Enter your full name"
              required
              onChange={onChange}
            />
          </Input>
          <br />
        </Row>

        <Row>
          <Label>
            <label htmlFor="user_name">User ID* : </label>
          </Label>
          <Input>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="Enter a user ID it should be Unique"
              required
              onChange={onChange}
            />
          </Input>
          <br />
        </Row>

        <Row>
          <Label>
            <label htmlFor="email">Email* : </label>
          </Label>
          <Input>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your E-mail address it should be Unique"
              required
              onChange={onChange}
            />
          </Input>
          <br />
        </Row>

        <Row>
          <Label>
            <label htmlFor="phone">Phone Number : </label>
          </Label>
          <Input>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone/mobile number"
              onChange={onChange}
            />
          </Input>
          <br />
        </Row>

        <Row>
          <Label>
            <label htmlFor="password">Password* : </label>
          </Label>
          <Input>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a new password"
              required
              onChange={onChange}
            />
          </Input>
          <br />
        </Row>

        <Row>
          <Label>
            <label htmlFor="cpassword">Confirm Password* : </label>
          </Label>
          <Input>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm your password"
              required
              onChange={onChange}
            />
          </Input>
          <br />
        </Row>

        <Row>
  <Label>
    <label> Choose your Gender* : </label>
  </Label>
  <RadioBtn>
    <label htmlFor="female">
      <input
        type="radio"
        name="gender"
        id="female"
        value="female"
        checked={credentials.gender === "female"}
        onChange={onChange}
        
      />
      &nbsp;&nbsp; Female
    </label>

    <label htmlFor="male">
      <input
        type="radio"
        name="gender"
        id="male"
        value="male"
        checked={credentials.gender === "male"}
        onChange={onChange}
      />
      &nbsp;&nbsp;Male
    </label>

    <label htmlFor="other">
      <input
        type="radio"
        name="gender"
        id="other"
        value="other"
        checked={credentials.gender === "other"}
        onChange={onChange}
      />
      &nbsp;&nbsp; Other
    </label>
  </RadioBtn>
  <br />
</Row>


        <Row>
          <Label>
            <label htmlFor="age">Date of Birth* : </label>
          </Label>
          <div className="calenderDate">
            <input
              type="date"
              name="age"
              id="age"
              required
              onChange={onChange}
            />
          </div>

          <br />
        </Row>

        <Row>
          <Label>
            <label htmlFor="address">Address : </label>
          </Label>
          <Input>
            <textarea
              type="text"
              rows={5}
              name="address"
              id="address"
              placeholder="Enter your address"
              onChange={onChange}
            />
          </Input>
        </Row>

        <Buttons>
          <input className="btn btn-success" type="submit" value="Sign Up" />
        </Buttons>
      </form>
    </Container>
  );
};

export default SignUp;

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

  margin-bottom: 300px;
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
  @media (min-width: 1000px) {
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

const RadioBtn = styled.div`
  width: 40%;

  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-self: center;
  text-align: center;
  label {
    text-align: left;
  }

  @media (max-width: 850px) {
    width: 60%;
  }
  @media (max-width: 700px) {
    width: 80%;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
  }

  input {
    height: 20px;
    width: 20px;
    margin-top: 1rem;
    align-self: center;
  }
`;

const Buttons = styled.div`
  float: right;
  margin-top: 2rem;

  .btn {
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
