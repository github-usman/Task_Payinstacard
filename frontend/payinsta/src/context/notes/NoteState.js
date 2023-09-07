import React, { useState } from "react";
import NoteContext from "./noteContext";



const NoteState = (props)=>{
  const host = process.env.REACT_APP_API_URL;
  const userDetails = async()=>{
    const response = await fetch(`${host}auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')

      }

    });
      const jsonArray = await response.json();
    console.log(jsonArray,"find values from backend");
    setUserData(jsonArray);
  };
  
    const [userData, setUserData] = useState([]);
    
    return(
        <NoteContext.Provider value={{userData,setUserData,userDetails}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;