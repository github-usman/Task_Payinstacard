import React from "react";
import { styled } from "styled-components";

function Footer() {
  return (
    <Container>
    <footer className="Footer bg-dark text-center text-white">
      <div className="container p-3">
        <div className="d-flex justify-content-center">
          <a href="https://github.com/github-usman/">
            <i className="bi bi-github"></i> GitHub
          </a>
          &nbsp;&nbsp;
          <a href="https://www.linkedin.com/in/u-s-m-a-n/">
            <i className="bi bi-linkedin"></i> LinkedIn
          </a>
          &nbsp;&nbsp;
          <a href="/">
            <i className="bi bi-file-earmark-code-fill"></i> LeetCode
          </a>
          &nbsp;&nbsp;
          <a href="/">
            <i className="bi bi-person-check"></i> Portfolio
          </a>
          &nbsp;&nbsp;
          <a href="mailto:usman.placement@gmail.com">
            <i className="bi bi-envelope"></i> Contact
          </a>
        </div>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © {new Date().getFullYear()} Copyright&nbsp;
        <a className="text-white" href="https://github.com/github-usman/">
          PlayinstaTask Dev by <span>USMAN ALI ANSARI</span>
        </a>
      </div>
    </footer>
    </Container>
  );
}

export default Footer;

const Container = styled.div`

margin-top:25%;

 a{
    text-decoration: none;
    color: aqua;
}
a:hover{
    text-decoration: none;
    color: rgb(13, 84, 165);
}
@media screen and (max-width:993px) {
  
        margin-top: 25%;
    
}

  
`;
