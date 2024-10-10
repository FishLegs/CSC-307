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

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index;
          });
          setCharacters(updated);
    }

    function updateList(person) { 
      postUser(person)
        .then((newUser) => {
          if (newUser) {
            setCharacters([...characters, newUser]);
          }
        })  
        .catch((error) => {
          console.error("Error in submission", error);
        });
    }
  

    

    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
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
