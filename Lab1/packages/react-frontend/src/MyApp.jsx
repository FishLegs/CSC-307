// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, []);

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise
        .then((response) => {
          if(response.status === 201){
            console.log("User successfully created with status 201.");
            return response.json();
          } else {
            console.log("Unexpected status code:", response.status);
            throw new Error("Failed to create user");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

  
    // Make DELETE request to backend
    function removeCharacter(_id) {
  
      const promise = fetch(`http://localhost:8000/users/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      promise
        .then((response) => {
          if (response.status === 204) {
            const updated = characters.filter((character) => character._id !== _id);
            setCharacters(updated);
            console.log(`User ${_id} deleted successfully.`);
          } else if (response.status === 404) {
            console.error("User not found");
          } else {
            console.error("Failed to delete");
          }
        })
        .catch((error) => console.error("Error:", error));
    }

    function updateList(person) { 
      postUser(person)
        .then((newUser) => {
          if (newUser) {
            console.log("New user received from backend:", newUser); 
            setCharacters([...characters, newUser]);
          }
        })  
        .catch((error) => {
          console.error("Error in submission", error);
        })
    }
  

    

    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeCharacter}
          />
          <Form
            handleSubmit={updateList}
          />
        </div>
    );
}

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

export default MyApp;
